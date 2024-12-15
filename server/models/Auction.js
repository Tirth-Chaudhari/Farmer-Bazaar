const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true, // Example: Fruits, Vegetables, Grains, etc.
  },
  itemQuantity: {
    type: Number,
    required: true, // Quantity of items in units (e.g., kg, quintals)
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bidders: [
    {
      bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      bidAmount: { type: Number, required: true },
      name: {type: String},
      email: {type: String },
      contactInfo: {
        mobileNumber: {
          type: String,
        },
        address: {
          type: String,
        },
        state: {
          type: String,
        },
        district: {
          type: String,
        },
        subDistrict: {
          type: String,
        },
        village: {
          type: String,
        },
      },
    },
  ],
  winner: {
    bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bidAmount: { type: Number },
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
  image: {
    type: String, // URL or path to the image
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'expired'],
    default: 'open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  chat:[
    {
      name:{type:String,required:true},
      message:{type:String,required:true}
    }
  ]
  
});

module.exports = mongoose.model('Auction', auctionSchema);
