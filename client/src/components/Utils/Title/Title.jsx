import styles from "./Title.module.css";

export const Title = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export const Subtitle = ({ children }) => {
  return <h2 className={styles.subtitle}>{children}</h2>;
};

export const Subtitle2 = ({ children }) => {
  return <h2 className={styles.subtitle2}>{children}</h2>;
};
