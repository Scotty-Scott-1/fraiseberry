import styles from "./Actions.module.css";
import { useNavigate } from "react-router-dom";
import { ChatBubbleLeftRightIcon, MapPinIcon } from "@heroicons/react/24/solid";

const Actions = ({ match }) => {
  const navigate = useNavigate();
  const openChat = () => {
    navigate(`/chat/${match.userId}`);
  };
  const viewProfile = () => {
    navigate(`/view/${match.userId}`);
  };
  return (
    <div className={styles.actions}>
      <button className={styles.viewProfileButton} onClick={viewProfile}>
        View Profile
      </button>
      <button className={styles.messageButton} onClick={openChat}>
        <ChatBubbleLeftRightIcon className={styles.messageIcon} />
      </button>
    </div>
  );
}

export default Actions;
