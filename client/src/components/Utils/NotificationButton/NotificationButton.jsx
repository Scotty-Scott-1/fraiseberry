import { BellIcon } from "@heroicons/react/24/solid";
import styles from "./NotificationButton.module.css";

const NotificationButton = ({ onClick }) => {
  return (
    <button className={styles.notificationBtn}>
      <BellIcon className={styles.notificationIcon} />
    </button>
  );
};
export default NotificationButton;
