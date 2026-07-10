const express = require("express");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Channel = require("../models/Channel");
const Workspace = require("../models/Workspace");
const authMiddleware = require("../middleware/authMiddleware");
const { createChannelMessageNotifications } = require("../utils/notificationService");

const router = express.Router();

const ensureChannelMemberAccess = async (userId, channelId) => {
  const channel = await Channel.findById(channelId);

  if (!channel) {
    const error = new Error("Channel not found.");
    error.statusCode = 404;
    throw error;
  }

  const workspace = await Workspace.findById(channel.workspace);

  if (!workspace) {
    const error = new Error("Workspace not found.");
    error.statusCode = 404;
    throw error;
  }

  const userIdString = userId.toString();
  const isMember = workspace.members.some((memberId) => memberId.toString() === userIdString)
    || workspace.owner.toString() === userIdString;

  if (!isMember) {
    const error = new Error("You do not have access to this channel.");
    error.statusCode = 403;
    throw error;
  }

  return channel;
};

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

    if (message.channel) {
      const channel = await Channel.findById(message.channel);
      const channelViewers = req.app.get("channelViewers") || new Map();
      await createChannelMessageNotifications({
        app: req.app,
        senderId: req.user.id,
        workspaceId: channel?.workspace,
        channelId: message.channel,
        messageId: message._id,
        content,
        channelViewers,
      });
    }

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

// Mark a channel message as seen by the current user
router.patch('/:messageId/seen', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId).populate('sender', 'name email');

    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    if (message.isDeleted) {
      return res.status(200).json({ success: true, message });
    }

    const senderId = message.sender?._id?.toString() || message.sender?.toString();
    if (senderId === req.user.id) {
      return res.status(200).json({ success: true, message });
    }

    const alreadySeen = message.seenBy.some((userId) => userId.toString() === req.user.id);
    if (alreadySeen) {
      return res.status(200).json({ success: true, message });
    }

    let updatedMessage;
    const io = req.app.get('io');

    if (message.channel) {
      await ensureChannelMemberAccess(req.user.id, message.channel);
      updatedMessage = await Message.findByIdAndUpdate(
        message._id,
        {
          $addToSet: { seenBy: req.user.id },
          $set: { status: 'seen', seenAt: new Date() },
        },
        { new: true }
      ).populate('sender', 'name email');

      io.to(`channel:${updatedMessage.channel.toString()}`).emit('message-seen', updatedMessage);
    } else if (message.conversation) {
      const conversation = await Conversation.findById(message.conversation);
      if (!conversation || !conversation.participants.some((participantId) => participantId.toString() === req.user.id)) {
        const error = new Error('You do not have access to this conversation.');
        error.statusCode = 403;
        throw error;
      }

      updatedMessage = await Message.findByIdAndUpdate(
        message._id,
        {
          $addToSet: { seenBy: req.user.id },
          $set: { status: 'seen', seenAt: new Date() },
        },
        { new: true }
      ).populate('sender', 'name email');

      io.to(`conversation:${updatedMessage.conversation.toString()}`).emit('message-seen', updatedMessage);
    } else {
      return res.status(400).json({ message: 'Seen receipts are only supported for channel or conversation messages.' });
    }

    if (updatedMessage.sender?._id) {
      io.to(updatedMessage.sender._id.toString()).emit('message-seen', updatedMessage);
    }

    res.status(200).json({ success: true, message: updatedMessage });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
});

// Edit an existing message
router.patch('/:messageId', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const trimmedContent = (content || '').trim();

    if (!trimmedContent) {
      return res.status(400).json({ message: 'Message content cannot be empty.' });
    }

    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own messages.' });
    }

    if (message.isDeleted) {
      return res.status(400).json({ message: 'This message has already been deleted.' });
    }

    message.content = trimmedContent;
    message.edited = true;
    message.editedAt = new Date();
    message.isDeleted = false;
    message.deletedAt = null;
    await message.save();

    const populatedMessage = await Message.findById(message._id).populate('sender', 'name email');
    const io = req.app.get('io');

    if (message.channel) {
      io.to(`channel:${message.channel.toString()}`).emit('message-updated', populatedMessage);
    }

    if (message.conversation) {
      io.to(`conversation:${message.conversation.toString()}`).emit('message-updated', populatedMessage);
    }

    res.status(200).json({ success: true, message: populatedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Soft delete a message
router.delete('/:messageId', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own messages.' });
    }

    if (message.isDeleted) {
      const populatedMessage = await Message.findById(message._id).populate('sender', 'name email');
      return res.status(200).json({ success: true, message: populatedMessage });
    }

    message.content = 'This message was deleted';
    message.isDeleted = true;
    message.deletedAt = new Date();
    await message.save();

    const populatedMessage = await Message.findById(message._id).populate('sender', 'name email');
    const io = req.app.get('io');

    if (message.channel) {
      io.to(`channel:${message.channel.toString()}`).emit('message-deleted', populatedMessage);
    }

    if (message.conversation) {
      io.to(`conversation:${message.conversation.toString()}`).emit('message-deleted', populatedMessage);
    }

    res.status(200).json({ success: true, message: populatedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
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