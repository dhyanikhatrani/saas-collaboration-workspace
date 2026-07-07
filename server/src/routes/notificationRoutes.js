const express = require("express");
const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const User = require("../models/User");
const Workspace = require("../models/Workspace");
const Channel = require("../models/Channel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const populateNotification = (query) =>
  query
    .populate("sender", "name email")
    .populate("workspace", "name")
    .populate("channel", "name")
    .populate("messageId", "_id content");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await populateNotification(
      Notification.find({ recipient: req.user.id }).sort({ createdAt: -1 })
    );

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:notificationId/read", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.notificationId)) {
      return res.status(400).json({ message: "Invalid notification ID." });
    }

    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot update this notification." });
    }

    notification.isRead = true;
    await notification.save();

    const updatedNotification = await populateNotification(Notification.findById(notification._id));

    const io = req.app.get("io");
    io.to(req.user.id).emit("notification-read", {
      notificationId: notification._id,
      notification: updatedNotification,
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/read-all", authMiddleware, async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );

    const io = req.app.get("io");
    io.to(req.user.id).emit("notification-read-all", {
      updatedCount: result.modifiedCount || 0,
    });

    res.status(200).json({ success: true, updatedCount: result.modifiedCount || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:notificationId", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.notificationId)) {
      return res.status(400).json({ message: "Invalid notification ID." });
    }

    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot delete this notification." });
    }

    await notification.deleteOne();

    const io = req.app.get("io");
    io.to(req.user.id).emit("notification-deleted", {
      notificationId: req.params.notificationId,
    });

    res.status(200).json({ success: true, notificationId: req.params.notificationId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
