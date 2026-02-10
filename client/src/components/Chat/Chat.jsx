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
  const [currentUserId, setCurrentUserId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Single bootstrap fetch
  useEffect(() => {
    const loadChat = async () => {
      const res = await fetch(`/api/chat/bootstrap/${otherUserId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      setConversationId(data.conversationId);
      setCurrentUserId(data.currentUserId);
      setOtherUser(data.otherUser);
      setMessages(data.messages);

      scrollToBottom();
    };

    if (accessToken) loadChat();
  }, [accessToken, otherUserId]);

  // WebSocket join + listen
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
    socket.emit("send_message", msg);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        {otherUser && (
          <>
            {otherUser.avatar && (
              <img src={otherUser.avatar} className={styles.avatar} />
            )}
            <h2>{otherUser.name}</h2>
          </>
        )}
      </div>

      <ChatMessages
        messages={messages}
        bottomRef={bottomRef}
        currentUserId={currentUserId}
      />

      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default Chat;
