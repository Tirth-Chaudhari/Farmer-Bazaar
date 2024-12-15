const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validate email format
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  EmailOtp:{
    type:String,
    
  },
  password: {
    type: String,
    required: true,
  },
  contactInfo: {
    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validate Indian mobile number (10 digits)
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    subDistrict: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
  },
  wonAuctions: [
    {
      auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
      productName: { type: String },
      winningAmount: { type: Number },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
