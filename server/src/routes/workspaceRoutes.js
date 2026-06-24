const express = require("express");
const Workspace = require("../models/Workspace");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Workspace
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const workspace = await Workspace.create({
      name,
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

// Get User Workspaces
router.get("/", authMiddleware, async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      members: req.user.id,
    });

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;