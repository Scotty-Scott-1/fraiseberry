import { io } from "socket.io-client";

// In development, Socket.IO will be proxied through Vite dev server
// In production, connect directly to the server
const socketURL = import.meta.env.DEV ? "/" : "http://localhost:3000";

export const socket = io(socketURL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

socket.on("connect", () => {
  console.log("✅ Socket.IO connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket.IO connection error:", error);
});

socket.on("disconnect", () => {
  console.log("❌ Socket.IO disconnected");
});

socket.on("connect", () => {
  console.log("✅ Socket.IO connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket.IO connection error:", error);
});

socket.on("disconnect", () => {
  console.log("❌ Socket.IO disconnected");
});
