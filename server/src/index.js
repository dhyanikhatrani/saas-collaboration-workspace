const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const channelRoutes = require("./routes/channelRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");


const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
console.log("Socket Server Created");
app.set("io", io);

const onlineUsers = new Map();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);

app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("user-online", (userId) => {
    if (!userId) return;

    const userKey = userId.toString();
    onlineUsers.set(userKey, socket.id);
    socket.join(userKey);

    console.log(`User ${userKey} is online with socket ${socket.id}`);
    io.emit("user-online", userKey);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  socket.on("join-user-room", (userId) => {
    if (userId) {
      socket.join(userId.toString());
      console.log(`User ${userId} joined personal room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    const offlineEntry = Array.from(onlineUsers.entries()).find(
      ([, socketId]) => socketId === socket.id
    );

    if (offlineEntry) {
      const [userId] = offlineEntry;
      onlineUsers.delete(userId);
      console.log(`User ${userId} went offline`);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

