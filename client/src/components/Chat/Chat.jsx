import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Security/authContext";
import { useApiCall } from "../../services/useApiCall";
import { socket } from "../Utils/socket.js";
import Header2 from "../Utils/Header copy/Header.jsx";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import styles from "./Chat.module.css";

const Chat = () => {
  const { otherUserId } = useParams();
  const { accessToken } = useAuth();
  const { apiCall } = useApiCall();

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadChat = async () => {
      const res = await apiCall(`/api/chat/bootstrap/${otherUserId}`, {});

      const data = await res.json();
      console.log(data);

      setConversationId(data.conversationId);
      setCurrentUserId(data.currentUserId);
      setOtherUser(data.otherUser);
      setMessages(data.messages);

      scrollToBottom();
    };

    if (accessToken) loadChat();
  }, [accessToken, otherUserId]);

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
    const res = await apiCall(`/api/messages`, {
      method: "POST",
      body: JSON.stringify({ conversationId, content }),
    });

    const msg = await res.json();
    socket.emit("send_message", msg);
  };

  return (
    <div className={styles.chatContainer}>
<Header2
  title={otherUser?.name}
  avatar={otherUser?.avatar}
/>

      <div className={styles.messagesWrapper}>
        <ChatMessages
          messages={messages}
          bottomRef={bottomRef}
          currentUserId={currentUserId}
        />
      </div>

      <div className={styles.chatInputWrapper}>
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
