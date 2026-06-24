const express = require("express");
const Channel = require("../models/Channel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Channel
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, workspaceId } = req.body;

    const channel = await Channel.create({
      name,
      workspace: workspaceId,
      createdBy: req.user.id,
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
    });

    res.json(channels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;