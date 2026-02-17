import { io } from "socket.io-client";

// In dev, Vite proxies "/" to backend
// In prod, Nginx proxies "/" and "/socket.io" to backend
const socket = io("/", {
  path: "/socket.io",
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

// Events
socket.on("connect", () => {
  console.log("✅ Socket.IO connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket.IO connection error:", error);
});

socket.on("disconnect", () => {
  console.log("❌ Socket.IO disconnected");
});

export { socket };
