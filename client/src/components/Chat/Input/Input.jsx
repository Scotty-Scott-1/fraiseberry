import { useState } from "react";
import styles from "./Input.module.css";

const Input = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className={styles.inputContainer}>
      <textarea
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        rows={1}
      />

      <button className={styles.sendBtn} onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default Input;
