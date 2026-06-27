const express = require("express");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
});

router.get("/:conversationId/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name email");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:conversationId/messages", authMiddleware, async (req, res) => {
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

    res.status(201).json({ success: true, message: populatedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
