import styles from "./Actions.module.css";
import { PrimaryButton } from "../../Utils/Buttons/primaryButton/primaryButton";
import { useNavigate } from "react-router-dom";


const Actions = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    switch (id) {
      case "1":
        navigate("/profile");
        break;
      case "2":
        navigate("/preferences");
        break;
      case "3":
        navigate("/discover");
        break;
      case "4":
        navigate("/conversationlist");
        break;
      case "5":
        navigate("/mfa");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.actions}>
      <div className={styles.actionBtn}>
        <PrimaryButton onClick={() => handleClick("3")}>
          Discover
        </PrimaryButton>
      </div>

      <div className={styles.actionBtn}>
        <PrimaryButton onClick={() => handleClick("4")}>
          Messages
        </PrimaryButton>
      </div>

      <div className={styles.actionBtn}>
        <PrimaryButton onClick={() => handleClick("1")}>
          Profile
        </PrimaryButton>
      </div>

      <div className={styles.actionBtn}>
        <PrimaryButton onClick={() => handleClick("2")}>
          Preferences
        </PrimaryButton>
      </div>

      <div className={styles.actionBtn}>
        <PrimaryButton onClick={() => handleClick("5")}>
          MFA
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Actions;
