const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: true,
      validate: {
        validator: function (value) {
          return (
            Array.isArray(value) &&
            value.length === 2 &&
            new Set(value.map((item) => item.toString())).size === 2
          );
        },
        message: "Conversation must have exactly two unique participants",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
