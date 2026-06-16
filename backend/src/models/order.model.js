const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    orderType: {
      type: String,
      enum: ["Dine-In", "Take Away", "Home Delivery"],
      required: true,
    },
    tableNumber: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    mobilenumber:{
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Completed", "Delivered", "Cancelled"],
      default: "Pending",
    },
    rewardUsed: {
      type: Boolean,
      default: false,
    },
    rewardType: {
      type: String,
      default: "",
    },
    pointsAdded: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);