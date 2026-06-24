const express = require("express");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Send Message
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { content, channelId } = req.body;

    const message = await Message.create({
      content,
      channel: channelId,
      sender: req.user.id,
    });

    res.status(201).json({
      success: true,
      message,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Messages By Channel
router.get("/:channelId", authMiddleware, async (req, res) => {
  try {

    const messages = await Message.find({
      channel: req.params.channelId,
    }).populate("sender", "name email");

    res.json(messages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;