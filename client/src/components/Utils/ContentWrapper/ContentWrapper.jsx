import styles from "./ContentWrapper.module.css";

const ContentWrapper = ({ children }) => {
  return <div className={styles.contentWrapper}>{children}</div>;
}

export default ContentWrapper;
