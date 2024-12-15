const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true,
  },
  bidderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    required: true, // Expiration date for the bid record
  },
});

module.exports = mongoose.model('Bid', bidSchema);
