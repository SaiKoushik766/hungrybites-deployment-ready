const User = require("../models/user.model");
const Order = require("../models/order.model");

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
}
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
}
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
}
async function getDashboardStats(req, res) {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.totalAmount;
    }, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today }
    });

    const todayRevenueData = await Order.aggregate([
      { $match: { createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const todayRevenue = todayRevenueData[0]?.total || 0;
    const activeOrders = await Order.countDocuments({
      status: { $in: ["Pending", "Preparing"] }
    });

    res.status(200).json({
      totalOrders,
      totalUsers,
      totalRevenue,
      todayOrders,
      todayRevenue,
      activeOrders
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stats",
      error: error.message,
    });
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  getDashboardStats
}