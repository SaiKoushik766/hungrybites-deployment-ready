const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true
    },
    description: {
      required: true,
      type: String,
      trim: true
    },
    category: {
      required: true,
      type: String,
      trim: true
    },
    price: {
      required: true,
      type: Number
    },
    image: {
      required: true,
      type: String
    },
    isAvailable: {
      required: true,
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);