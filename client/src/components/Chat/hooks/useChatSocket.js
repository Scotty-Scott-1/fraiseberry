import { useEffect } from "react";
import { socket } from "../index.js";

const useChatSocket = (
  conversationId,
  setMessages,
  scrollToBottom
) => {
  useEffect(() => {
    if (!conversationId) return;

    socket.emit("join_conversation", conversationId);

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.emit("leave_conversation", conversationId);
    };
  }, [conversationId, setMessages, scrollToBottom]);
};

export default useChatSocket;
