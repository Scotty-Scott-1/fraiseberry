import styles from "./ChatMessages.module.css";

const ChatMessages = ({ messages, bottomRef }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={
            msg.senderId === msg.currentUserId
              ? styles.messageSent
              : styles.messageReceived
          }
        >
          <p>{msg.content}</p>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
