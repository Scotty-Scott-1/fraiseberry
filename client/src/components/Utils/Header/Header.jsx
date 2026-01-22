import NotificationButton from "../NotificationButton/NotificationButton";
import BackButton from "../BackButton/BackButton";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerBack}>
        <BackButton />
      </div>
      <div className={styles.headerBell}>
        <NotificationButton />
      </div>
      </header>
  );
}
export default Header;
