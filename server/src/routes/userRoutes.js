const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
      "_id name email"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
