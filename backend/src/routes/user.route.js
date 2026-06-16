const express = require("express");
const userrouter = express.Router();
const authmiddleware = require("../middlewares/auth.middleware");
const {getUserProfile} = require("../controllers/user.controller");

userrouter.get("/profile", authmiddleware, getUserProfile);

module.exports = userrouter;