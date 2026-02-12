import express from "express";
import http from "http";
import { Server } from "socket.io";
import { initDB } from "./database/initDB.js";
import routes from "./api/routes/routes.js";
import cors from "cors";
import path from "path";
import { startNudgeScheduler } from "./api/services/nudgeScheduler.js";

let stopNudgeScheduler;
const app = express();

// Static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Create HTTP server + Socket.IO
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
  transports: ["websocket", "polling"],
  pingInterval: 25000,
  pingTimeout: 60000,
});

// WebSocket Events
io.on("connection", (socket) => {
  console.log("🔥 WebSocket connected:", socket.id);

  socket.on("join_conversation", (conversationId) => {
    socket.join(`convo_${conversationId}`);
    console.log(`User ${socket.id} joined convo_${conversationId}`);
  });

  socket.on("leave_conversation", (conversationId) => {
    socket.leave(`convo_${conversationId}`);
    console.log(`User ${socket.id} left convo_${conversationId}`);
  });

  socket.on("send_message", (msg) => {
    io.to(`convo_${msg.conversationId}`).emit("new_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ WebSocket disconnected:", socket.id);
  });
});


const startServer = async () => {
  try {
    await initDB();
    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
      console.log(`✅ [Server]: running at http://localhost:${PORT}`);
      // start nudge scheduler that will emit AI nudges via socket.io
      stopNudgeScheduler = startNudgeScheduler(io);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const shutdown = () => {
  console.log("Shutting down...");
  if (stopNudgeScheduler) stopNudgeScheduler();
  io.close();
  server.close(() => process.exit(0));
};

startServer();
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

