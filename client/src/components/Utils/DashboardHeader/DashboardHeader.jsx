import NotificationButton from "../NotificationButton/NotificationButton";
import BackButton from "../Buttons/BackButton/BackButton";
import styles from "./DashboardHeader.module.css";
import { useNavigate } from "react-router-dom";



const DashboardHeader = ({ title = "Dashboard", onLogout, buttonType = "back", navTo = "/" }) => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(navTo);
  };
  const renderContent = () => {
    if (buttonType === "back") {
      return (
        <BackButton onClick={handleBack} />
      );
    }
    return (
      <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
    );
  }
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>{renderContent()}</div>
      <div className={styles.headerTitle}>{title}</div>
      <div className={styles.headerRight}>
        <div className={styles.nb}><NotificationButton /></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
