import { useState } from "react";
import styles from "./ChatInput.module.css";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />

      <button className={styles.sendBtn} onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
