import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Security/authContext";
import styles from "./ConversationList.module.css";

const ConversationList = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch("/api/conversations", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      console.log(data);
      setConversations(data);
    };

    if (accessToken) fetchConversations();
  }, [accessToken]);

  const openChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className={styles.listContainer}>
      {conversations.map((c) => (
        <div
          key={c.conversationId}
          className={styles.conversationItem}
          onClick={() => openChat(c.otherUser.id)}
        >
          <img
            src={c.otherUser.avatar}
            alt={c.otherUser.name}
            className={styles.avatar}
          />

          <div className={styles.textBlock}>
            <div className={styles.topRow}>
              <span className={styles.name}>{c.otherUser.name}</span>
              <span className={styles.time}>
                {c.lastMessage
                  ? new Date(c.lastMessage.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>

            <div className={styles.preview}>
              {c.lastMessage?.content || "No messages yet"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
