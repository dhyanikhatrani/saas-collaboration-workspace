const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Dashboard Route
router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to Dashboard 🎉",
    user: req.user,
  });
});

module.exports = router;