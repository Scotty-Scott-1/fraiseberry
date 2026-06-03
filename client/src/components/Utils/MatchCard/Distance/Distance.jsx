import styles from "./Distance.module.css";
import { ChatBubbleLeftRightIcon, MapPinIcon } from "@heroicons/react/24/solid";

const Distance = ({ match }) => {
  return (
    <div className={styles.row}>
      <MapPinIcon className={styles.icon} />
        <span className={styles.text}>
          {match.distanceKm} km away
        </span>
      </div>
  );
}

export default Distance;
