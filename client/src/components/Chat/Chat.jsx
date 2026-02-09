import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Security/authContext";
import { socket } from "../Utils/socket.js";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import styles from "./Chat.module.css";

const Chat = () => {
  const { otherUserId } = useParams();
  const { accessToken } = useAuth();

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  // Auto-scroll
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Get or create conversation
  useEffect(() => {
    const fetchConversation = async () => {
      const res = await fetch(`/api/chat/${otherUserId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      setConversationId(data.conversationId);
    };

    if (accessToken) fetchConversation();
  }, [accessToken, otherUserId]);

  // 2. Fetch messages
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      const res = await fetch(`/api/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      setMessages(data);
      scrollToBottom();
    };

    fetchMessages();
  }, [conversationId]);

  // 3. WebSocket: join room + listen for new messages
  useEffect(() => {
    if (!conversationId) return;

    socket.emit("join_conversation", conversationId);

    socket.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    return () => {
      socket.off("new_message");
      socket.emit("leave_conversation", conversationId);
    };
  }, [conversationId]);

  // 4. Send message
  const sendMessage = async (content) => {
    const res = await fetch(`/api/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversationId, content }),
    });

    const msg = await res.json();

    // Emit to WebSocket
    socket.emit("send_message", msg);
  };

  return (
    <div className={styles.chatContainer}>
      <ChatMessages messages={messages} bottomRef={bottomRef} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default Chat;
