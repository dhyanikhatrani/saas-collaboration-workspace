const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const contactMessage = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Thank you! Your message has been submitted successfully.",
      contact: contactMessage,
    });
  } catch (error) {
    console.error("Contact creation error:", error);
    return res.status(500).json({ message: "Failed to submit contact form." });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (error) {
    console.error("Contact fetch error:", error);
    return res.status(500).json({ message: "Failed to fetch contact messages." });
  }
});

module.exports = router;
