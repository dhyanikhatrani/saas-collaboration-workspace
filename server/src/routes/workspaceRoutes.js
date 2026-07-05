const express = require("express");
const mongoose = require("mongoose");
const Workspace = require("../models/Workspace");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Create Workspace
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Workspace name is required." });
    }

    const workspace = await Workspace.create({
      name: name.trim(),
      owner: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json({
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Invite a user to a workspace
router.post("/:workspaceId/invite", authMiddleware, async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID." });
    }

    const trimmedEmail = (email || "").trim().toLowerCase();

    if (!trimmedEmail) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    if (workspace.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the workspace owner can invite members." });
    }

    const invitedUser = await User.findOne({ email: trimmedEmail });

    if (!invitedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (invitedUser._id.toString() === workspace.owner.toString()) {
      return res.status(400).json({ message: "You cannot invite yourself as a member." });
    }

    const isAlreadyMember = workspace.members.some(
      (memberId) => memberId.toString() === invitedUser._id.toString()
    );

    if (isAlreadyMember) {
      return res.status(409).json({ message: "User is already a member of this workspace." });
    }

    workspace.members.push(invitedUser._id);
    await workspace.save();

    const io = req.app.get("io");
    io.to(invitedUser._id.toString()).emit("workspace-invited", {
      workspace,
    });

    res.status(200).json({
      message: "User invited successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get User Workspaces
router.get("/", authMiddleware, async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }],
    }).sort({ createdAt: -1 });

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;