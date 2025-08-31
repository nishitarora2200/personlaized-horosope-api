const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  zodiac: { type: String, required: true },
  date: { type: Date, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Index for faster lookup by user and date
historySchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('History', historySchema);
