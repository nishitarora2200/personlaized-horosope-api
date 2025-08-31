const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const horoscopeRoutes = require('./src/routes/horoscope');

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/horoscope', horoscopeRoutes);


// Health Check
app.get('/', (req, res) => res.json({ ok: true, msg: 'Horoscope API is running' }));

module.exports = app;
