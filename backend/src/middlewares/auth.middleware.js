const usermodel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authmiddleware(req, res, next) {
  let token;

  // ✅ 1. Try Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // ✅ 2. Fallback to cookies (optional)
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized - No token",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      '6ec4dcf3f398bf3c4a0ad9c2c61ebe37e0e83cd1893697b8'
    );

    const user = await usermodel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = authmiddleware;