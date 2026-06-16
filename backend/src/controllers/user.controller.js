const usermodel = require('../models/user.model');

async function getUserProfile(req, res) {
  try {
    const user = await usermodel.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user: {
        name: user.name,
        username: user.username,
        role: user.role,
        loyaltyPoints: user.loyaltyPoints,
        rewardavailable: user.rewardavailable
      }
    });

  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = {
  getUserProfile
};