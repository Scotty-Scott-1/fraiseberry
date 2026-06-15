import styles from './MessageContainer.module.css';

const MessageContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
}

export default MessageContainer;
