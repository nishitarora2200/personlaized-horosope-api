const horoscopeService = require('../services/horoscope-service');
const {successResponse,errorResponse} = require('../utils/utils');

const getTodayHoroscope = async (req, res) => {
  try {
    const result = await horoscopeService.getToday(req.user);
    successResponse(res,result,200);
  } catch (err) {
    console.error(err);
    errorResponse(res,err.message || 'Server error',err.status || 500);
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await horoscopeService.getHistory(req.user.id);
    successResponse(res,history,200);
  } catch (err) {
    errorResponse(res,err.message || 'Server error',err.status || 500);
  }
};

module.exports = { getTodayHoroscope, getHistory };
