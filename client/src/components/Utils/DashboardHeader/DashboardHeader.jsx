import NotificationButton from "../NotificationButton/NotificationButton";
import styles from "./DashboardHeader.module.css";

const DashboardHeader = ({ title = "Dashboard", onLogout }) => {
  return (
    <header className={styles.header}>
      {/* Logout Button (Left) */}
      <div className={styles.headerLeft}>
        <button className={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Title (Center) */}
      <div className={styles.headerTitle}>{title}</div>

      {/* Notification (Right) */}
      <div className={styles.headerRight}>
        <div className={styles.nb}><NotificationButton /></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
