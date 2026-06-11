import styles from "./ChatMessages.module.css";

const ChatMessages = ({ messages, bottomRef, currentUserId }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((msg) => {
        const isMine = msg.senderId === currentUserId;
        const isBot = !!msg.isBot;
        let rowClass;
        let bubbleClass;
        let textClass;
        let timestampClass;

        if (isBot) {
          rowClass = styles.botRow;
          bubbleClass = styles.botBubble;
          textClass = styles.botText;
          timestampClass = styles.botTimestamp;
        } else if (isMine) {
          rowClass = styles.sentRow;
          bubbleClass = styles.sentBubble;
          textClass = styles.sentText;
          timestampClass = styles.sentTimestamp;
        } else {
          rowClass = styles.receivedRow;
          bubbleClass = styles.receivedBubble;
          textClass = styles.receivedText;
          timestampClass = styles.receivedTimestamp;
        }


        const renderBotAvatar = () => {
          if (isBot) return <div className={styles.botAvatar}>🤖</div>;
        }

        const renderTimestamp = () => {
          if (msg.createdAt) {
            return (
              <span className={timestampClass}>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            );
          }
        }

        return (
          <div key={msg.id} className={rowClass}>
            {renderBotAvatar()}
            <div className={bubbleClass}>
              <div className={textClass}>{msg.content}</div>
              {renderTimestamp()}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
