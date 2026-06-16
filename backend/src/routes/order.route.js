const express = require('express');
const orderrouter = express.Router();
const authmiddleware = require('../middlewares/auth.middleware')
const {isAdmin} = require('../middlewares/admin.middleware')
const ordercontroller = require('../controllers/order.controller')
orderrouter.post("/createorder", authmiddleware, ordercontroller.createOrder);
orderrouter.get("/my-orders", authmiddleware, ordercontroller.getMyOrders);
orderrouter.get("/all", authmiddleware,isAdmin, ordercontroller.getAllOrders);
orderrouter.get("/status/:status", authmiddleware,isAdmin, ordercontroller.getOrdersByStatus);
orderrouter.get("/:id", authmiddleware, ordercontroller.getOrderById);
orderrouter.put("/:id/status", authmiddleware,isAdmin, ordercontroller.updateOrderStatus);
orderrouter.delete("/:id", authmiddleware, ordercontroller.deleteorder);
module.exports = orderrouter;