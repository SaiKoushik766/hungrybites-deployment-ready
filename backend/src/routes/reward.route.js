const express = require('express');
const rewardrouter = express.Router();
const authmiddleware = require('../middlewares/auth.middleware')
const rewardcontroller = require('../controllers/reward.controller')
rewardrouter.get("/my-points", authmiddleware, rewardcontroller.getMyPoints);
rewardrouter.post("/redeem", authmiddleware, rewardcontroller.redeemReward);
module.exports = rewardrouter;