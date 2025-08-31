const express = require('express');
const { getTodayHoroscope, getHistory } = require('../controllers/horoscope.controller');
const auth = require('../middleware/auth');
const limiter = require('../middleware/rateLimiter');

const router = express.Router();

router.use(auth);
router.use(limiter);

router.get('/today', getTodayHoroscope);
router.get('/history', getHistory);

module.exports = router;
