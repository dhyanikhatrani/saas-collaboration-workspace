const express = require("express");
const Channel = require("../models/Channel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Create Channel
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, workspaceId, description } = req.body;
    const trimmedName = (name || "").trim();
    const trimmedDescription = (description || "").trim();

    if (!workspaceId) {
      return res.status(400).json({ message: "Workspace is required." });
    }

    if (!trimmedName) {
      return res.status(400).json({ message: "Channel name is required." });
    }

    const existingChannel = await Channel.findOne({
      workspace: workspaceId,
      name: { $regex: new RegExp(`^${escapeRegExp(trimmedName)}$`, "i") },
    });

    if (existingChannel) {
      return res.status(409).json({ message: "A channel with that name already exists in this workspace." });
    }

    const channel = await Channel.create({
      name: trimmedName,
      description: trimmedDescription,
      workspace: workspaceId,
      createdBy: req.user.id,
    });

    const io = req.app.get("io");
    io.to(`workspace:${workspaceId}`).emit("new-channel", {
      workspaceId,
      channel,
    });

    res.status(201).json({
      success: true,
      channel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Channels By Workspace
router.get("/:workspaceId", authMiddleware, async (req, res) => {
  try {
    const channels = await Channel.find({
      workspace: req.params.workspaceId,
    }).sort({ createdAt: 1 });

    res.json(channels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;