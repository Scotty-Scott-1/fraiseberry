import styles from "./ChatMessages.module.css";

const ChatMessages = ({ messages, bottomRef, currentUserId }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((msg) => {
        const isMine = msg.senderId === currentUserId;
        const isBot = !!msg.isBot;

        const rowClass = isBot
          ? styles.botRow
          : isMine
          ? styles.messageSent
          : styles.messageReceived;

        return (
          <div key={msg.id} className={`${styles.messageRow} ${rowClass}`}>
            {isBot && <div className={styles.botAvatar}>🤖</div>}

            <div className={`${styles.bubble} ${isBot ? styles.botBubble : ""}`}>
              <p className={isBot ? styles.botText : ""}>{msg.content}</p>
              {msg.createdAt && (
                <span className={styles.timestamp}>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
