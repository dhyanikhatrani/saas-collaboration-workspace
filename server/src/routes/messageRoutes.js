const express = require("express");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
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
    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "name email"
    );

    const io = req.app.get("io");
    io.emit("new-message", populatedMessage);

    res.status(201).json({
      success: true,
      message: populatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all registered users (except current user)
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const User = require("../models/User");
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
      "_id name email"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create or get a conversation between two users
router.post("/conversations", authMiddleware, async (req, res) => {
  try {
    const { participantId } = req.body;

    if (!participantId) {
      return res.status(400).json({ message: "participantId is required" });
    }

    const participants = [req.user.id, participantId].sort();

    let conversation = await Conversation.findOne({
      participants: { $all: participants, $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({ participants });
    }

    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get messages for a conversation
router.get("/conversations/:conversationId/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email");

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Send a direct message to a conversation
router.post("/conversations/:conversationId/messages", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    const conversation = await Conversation.findById(req.params.conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const message = await Message.create({
      content,
      conversation: conversation._id,
      sender: req.user.id,
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "name email"
    );

    const io = req.app.get("io");

    conversation.participants.forEach((participantId) => {
      io.to(participantId.toString()).emit("new-direct-message", populatedMessage);
    });

    res.status(201).json({
      success: true,
      message: populatedMessage,
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