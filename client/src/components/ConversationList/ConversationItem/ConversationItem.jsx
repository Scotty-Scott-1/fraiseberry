import styles from "./ConversationItem.module.css";
import { useNavigate } from "react-router-dom";


const ConversationItem = ({ c }) => {

  const navigate = useNavigate();
  const openChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div
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
          <p className={styles.name}>{c.otherUser.name}</p>
          <p className={styles.time}>
            {c.lastMessage
              ? new Date(c.lastMessage.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
        </div>

        <div className={styles.preview}>
          {c.lastMessage?.content || "No messages yet"}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
