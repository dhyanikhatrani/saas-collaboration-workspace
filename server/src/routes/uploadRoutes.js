const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const router = express.Router();

const uploadFolder = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-_]/g, "_");
    cb(null, `${timestamp}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter,
});

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { channelId, conversationId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/uploads/${file.filename}`;
    const messagePayload = {
      content: file.originalname,
      sender: req.user.id,
      fileName: file.originalname,
      fileUrl,
      fileType: file.mimetype,
    };

    if (channelId) {
      messagePayload.channel = channelId;
    }

    if (conversationId) {
      messagePayload.conversation = conversationId;
    }

    const message = await Message.create(messagePayload);
    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "name email"
    );

    const io = req.app.get("io");

    if (channelId) {
      io.emit("new-message", populatedMessage);
    }

    if (conversationId) {
      const conversation = await Conversation.findById(conversationId);
      if (conversation) {
        conversation.participants.forEach((participantId) => {
          io.to(participantId.toString()).emit("new-direct-message", populatedMessage);
        });
      }
    }

    res.status(201).json({ success: true, message: populatedMessage });
  } catch (error) {
    if (error.message === "Unsupported file type") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
