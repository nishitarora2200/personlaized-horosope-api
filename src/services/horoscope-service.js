const History = require('../models/history');
const horoscopes = require('../data/horoscopes.json');
const moment = require('moment');
async function getToday(user) {
  const zodiac = user.zodiac;
  const today = new Date();
  const dateOnly = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  let entry = await History.findOne({ userId: user._id, date: dateOnly });
  const horoscopeArray = horoscopes[zodiac];
  if (!entry) {
    const text = horoscopeArray && horoscopeArray.length > 0
    ? horoscopeArray[Math.floor(Math.random() * horoscopeArray.length)]
    : 'No horoscope available today.';    
    entry = await History.create({ userId: user.id, zodiac, date: dateOnly, text });
  }

  return {
    date: dateOnly.toISOString().slice(0, 10),
    zodiac,
    horoscope: entry.text
  };
}

async function getHistory(userId) {
  const today = moment().endOf('day');
  const sevenDaysAgo = moment().subtract(6, 'days').startOf('day');

  // Fetch last 7 days' records
  const items = await History.find({
    userId,
    date: { $gte: sevenDaysAgo.toDate(), $lte: today.toDate() }
  })
    .sort({ date: -1 })
    .lean();

  const uniqueByDate = {};
  for (const h of items) {
    const dateKey = moment(h.date).format('YYYY-MM-DD');
    if (!uniqueByDate[dateKey]) {
      uniqueByDate[dateKey] = {
        date: dateKey,
        zodiac: h.zodiac,
        horoscope: h.text
      };
    }
  }

  // Convert to array and sort by date desc
  return Object.values(uniqueByDate)
    .sort((a, b) => moment(b.date).diff(moment(a.date)))
    .slice(0, 7);
}

module.exports = { getToday, getHistory };
