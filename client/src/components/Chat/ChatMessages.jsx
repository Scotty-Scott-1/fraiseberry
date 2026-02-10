import styles from "./ChatMessages.module.css";

const ChatMessages = ({ messages, bottomRef, currentUserId }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((msg) => {
        const isMine = msg.senderId === currentUserId;

        return (
<div
  key={msg.id}
  className={`${styles.messageRow} ${
    isMine ? styles.messageSent : styles.messageReceived
  }`}
>
  <div className={styles.bubble}>
    <p>{msg.content}</p>
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
