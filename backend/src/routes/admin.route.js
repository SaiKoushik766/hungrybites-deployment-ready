const express = require("express");
const adminrouter = express.Router();
const authmiddleware = require('../middlewares/auth.middleware')
const {isAdmin} = require('../middlewares/admin.middleware')
const admincontroller = require('../controllers/admin.controller')
adminrouter.get("/users", authmiddleware,isAdmin, admincontroller.getAllUsers);
adminrouter.get("/users/:id", authmiddleware,isAdmin, admincontroller.getUserById);
adminrouter.delete("/users/:id", authmiddleware,isAdmin, admincontroller.deleteUser);
adminrouter.get("/dashboard-stats", authmiddleware,isAdmin, admincontroller.getDashboardStats);
module.exports = adminrouter;