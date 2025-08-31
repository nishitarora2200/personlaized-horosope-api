const moment = require('moment');

function getZodiacSign(date) {
  const birthDate = moment(date, 'YYYY-MM-DD');
  const month = birthDate.month() + 1; // 1-12
  const day = birthDate.date();

  const zodiacSigns = [
    { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] }
  ];

  for (const zodiac of zodiacSigns) {
    const [startMonth, startDay] = zodiac.start;
    const [endMonth, endDay] = zodiac.end;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return zodiac.sign;
    }
  }

  return 'Unknown';
}

function successResponse(res, data = {}, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function errorResponse(res, message = 'Something went wrong', statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidBirthdate(date) {
  if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
    return false; // Invalid format
  }

  const birthDate = moment(date, 'YYYY-MM-DD');
  const today = moment();
  
  // Cannot be in the future
  if (birthDate.isAfter(today)) {
    return false;
  }

  return true;
}

module.exports = {
  successResponse,
  errorResponse,
  getZodiacSign,
  isValidEmail,
  isValidBirthdate
};

