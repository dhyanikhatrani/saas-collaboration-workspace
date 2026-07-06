const express = require("express");
const mongoose = require("mongoose");
const Workspace = require("../models/Workspace");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const normalizeEmails = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === "string" ? entry.trim().toLowerCase() : ""))
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/[\n,;]+/)
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean);
  }
  return [];
};

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

// Invite one or more users to a workspace
router.post("/:workspaceId/invite", authMiddleware, async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { email, emails } = req.body;
    const requestedEmails = normalizeEmails(emails || email);

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID." });
    }

    if (!requestedEmails.length) {
      return res.status(400).json({ message: "At least one email is required." });
    }

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    if (workspace.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the workspace owner can invite members." });
    }

    const uniqueEmails = [...new Set(requestedEmails)];
    const invitedUserIds = [];
    const errors = [];

    for (const candidateEmail of uniqueEmails) {
      if (!isValidEmail(candidateEmail)) {
        errors.push(`${candidateEmail} is not a valid email address.`);
        continue;
      }

      const invitedUser = await User.findOne({ email: candidateEmail });

      if (!invitedUser) {
        errors.push(`${candidateEmail} was not found.`);
        continue;
      }

      if (invitedUser._id.toString() === workspace.owner.toString()) {
        errors.push("You cannot invite yourself as a member.");
        continue;
      }

      const isAlreadyMember = workspace.members.some(
        (memberId) => memberId.toString() === invitedUser._id.toString()
      );

      if (isAlreadyMember) {
        errors.push(`${candidateEmail} is already a member of this workspace.`);
        continue;
      }

      workspace.members.push(invitedUser._id);
      invitedUserIds.push(invitedUser._id.toString());
    }

    if (workspace.members.length) {
      await workspace.save();
    }

    const io = req.app.get("io");
    invitedUserIds.forEach((userId) => {
      io.to(userId).emit("workspace-invited", { workspace });
    });

    res.status(200).json({
      message: invitedUserIds.length > 0 ? "Invites processed successfully" : "No invitations were created",
      workspace,
      invitedUserIds,
      errors,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get workspace members
router.get("/:workspaceId/members", authMiddleware, async (req, res) => {
  try {
    const { workspaceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID." });
    }

    const workspace = await Workspace.findById(workspaceId)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    const isAuthorized = workspace.owner?._id?.toString() === req.user.id ||
      workspace.members.some((member) => member?._id?.toString() === req.user.id);

    if (!isAuthorized) {
      return res.status(403).json({ message: "You do not have access to this workspace." });
    }

    const ownerUser = workspace.owner
      ? {
          _id: workspace.owner._id,
          name: workspace.owner.name,
          email: workspace.owner.email,
          avatar: workspace.owner.avatar || null,
          role: "Owner",
        }
      : null;

    const memberUsers = (workspace.members || [])
      .filter((member) => member && member._id.toString() !== workspace.owner?._id?.toString())
      .map((member) => ({
        _id: member._id,
        name: member.name,
        email: member.email,
        avatar: member.avatar || null,
        role: "Member",
      }));

    const members = ownerUser ? [ownerUser, ...memberUsers] : memberUsers;

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rename a workspace
router.patch("/:workspaceId/rename", authMiddleware, async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID." });
    }

    const trimmedName = (name || "").trim();

    if (!trimmedName) {
      return res.status(400).json({ message: "Workspace name is required." });
    }

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    if (workspace.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the workspace owner can rename the workspace." });
    }

    workspace.name = trimmedName;
    await workspace.save();

    res.status(200).json({
      message: "Workspace renamed successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a member from a workspace
router.post("/:workspaceId/remove-member", authMiddleware, async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    if (workspace.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the workspace owner can remove members." });
    }

    if (userId === workspace.owner.toString()) {
      return res.status(400).json({ message: "The owner cannot be removed from the workspace." });
    }

    const isMember = workspace.members.some((memberId) => memberId.toString() === userId);

    if (!isMember) {
      return res.status(404).json({ message: "User is not a member of this workspace." });
    }

    workspace.members = workspace.members.filter((memberId) => memberId.toString() !== userId);
    await workspace.save();

    res.status(200).json({
      message: "Member removed successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a workspace
router.delete("/:workspaceId", authMiddleware, async (req, res) => {
  try {
    const { workspaceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID." });
    }

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    if (workspace.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the workspace owner can delete the workspace." });
    }

    await Promise.all([
      require("../models/Channel").deleteMany({ workspace: workspaceId }),
      require("../models/Message").deleteMany({ channel: { $in: await require("../models/Channel").find({ workspace: workspaceId }).distinct("_id") } }),
    ]);

    await workspace.deleteOne();

    const io = req.app.get("io");
    io.emit("workspace-deleted", { workspaceId });

    res.status(200).json({
      message: "Workspace deleted successfully",
      workspaceId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Leave a workspace
router.post("/:workspaceId/leave", authMiddleware, async (req, res) => {
  try {
    const { workspaceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: "Invalid workspace ID." });
    }

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    if (workspace.owner.toString() === req.user.id) {
      return res.status(403).json({ message: "The workspace owner cannot leave the workspace yet." });
    }

    const isMember = workspace.members.some((memberId) => memberId.toString() === req.user.id);

    if (!isMember) {
      return res.status(404).json({ message: "You are not a member of this workspace." });
    }

    workspace.members = workspace.members.filter((memberId) => memberId.toString() !== req.user.id);
    await workspace.save();

    res.status(200).json({
      message: "You left the workspace successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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