const Order = require("../models/order.model");
const User = require("../models/user.model");

async function createOrder(req, res) {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { orderType, items, totalAmount, tableNumber, address,mobilenumber, rewardUsed } = req.body;

    if (!orderType || !items || !totalAmount) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const newOrder = await Order.create({
      user: req.user._id,
      orderType,
      items,
      totalAmount,
      tableNumber,
      address,
      mobilenumber,
      rewardUsed
    });
    if (rewardUsed) {
      const user = await User.findById(req.user._id);
      if (user) {
        // ✅ enforce your rule
        if (user.loyaltyPoints < 40) {
          user.rewardavailable = false;
        } else {
          user.rewardavailable = true;
        }

        await user.save();
      }
    }

    res.status(201).json({
      message: "Order created",
      order: newOrder
    });

  } catch (error) {
    console.error("🔥 ORDER ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.food", "name price") // 🔥 IMPORTANT
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.food").populate("user", "name username");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    // ✅ ADD LOYALTY POINTS HERE
    if (status === "Completed" || status === "Delivered") {
      const user = await User.findById(order.user);

      if (user) {
        user.loyaltyPoints += 10;
        await user.save();

        order.pointsAdded = true;
        await order.save();
      }
    }

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
}
async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "username")
      .populate("items.food", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}
async function getOrdersByStatus(req, res) {
  try {
    const { status } = req.params;

    const orders = await Order.find({ status })
      .populate("user", "name username")
      .populate("items.food");

    res.status(200).json({
      message: `Orders with status ${status}`,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch filtered orders",
      error: error.message,
    });
  }
}
async function deleteorder (req, res){
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  getOrdersByStatus,
  deleteorder
};