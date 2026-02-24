import NotificationButton from "../NotificationButton/NotificationButton";
import BackButton from "../BackButton/BackButton";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ title = "Dashboard" }) => {

  const navigate = useNavigate();

  const handleBack = () => {
      navigate("/dashboard");
    };

  return (
<header className={styles.header}>
  <div className={styles.headerBack}>
    <BackButton onClick={handleBack} />
  </div>

  <div className={styles.headerTitle}>
    {title}
  </div>

  <div className={styles.headerBell}>
    <NotificationButton />
  </div>
</header>
  );
}
export default Header;
