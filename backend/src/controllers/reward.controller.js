const User = require("../models/user.model");

async function getMyPoints(req, res) {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      loyaltyPoints: user.loyaltyPoints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch points",
      error: error.message,
    });
  }
}

async function redeemReward(req, res) {
  try {
    const user = await User.findById(req.user._id);

    if (user.loyaltyPoints < 40) {
      return res.status(400).json({ message: "Not enough points" });
    }

    user.loyaltyPoints -= 40;
    user.rewardavailable = true;

    await user.save();

    res.status(200).json({
      message: "Reward activated",
      points: user.loyaltyPoints,
      rewardavailable: user.rewardavailable
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to redeem reward",
      error: error.message,
    });
  }
}

module.exports = {
  getMyPoints,
  redeemReward,
};