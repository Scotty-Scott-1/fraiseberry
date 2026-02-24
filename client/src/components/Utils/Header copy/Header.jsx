import BackButton from "../BackButton/BackButton";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header2 = ({
  title = "",
  avatar = null,
  showAvatar = true,
  backPath = "/dashboard"
}) => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backPath);
  };

  return (
    <header className={styles.header}>

      {/* Back Button */}
      <div className={styles.headerBack}>
        <BackButton onClick={handleBack} />
      </div>

      {/* User Name */}
      <div className={styles.headerTitle}>
        {title || "Chat"}
      </div>

      {/* Avatar replaces notification icon */}
      <div className={styles.headerBell}>
        {showAvatar && avatar && (
          <img
            src={avatar}
            alt={title}
            className={styles.chatAvatar}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
      </div>

    </header>
  );
};

export default Header2;
