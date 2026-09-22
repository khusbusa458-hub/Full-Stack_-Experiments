const jwt = require("jsonwebtoken");

const JWT_SECRET = "my_jwt_secret_key";


// ========================================
// AUTHENTICATE JWT TOKEN
// ========================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access token required",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid or expired token",
      });
    }

    req.user = user;

    next();
  });
}


// ========================================
// ROLE AUTHORIZATION
// ========================================

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission.",
      });
    }

    next();
  };
}


module.exports = {
  authenticateToken,
  authorizeRoles,
  JWT_SECRET,
};