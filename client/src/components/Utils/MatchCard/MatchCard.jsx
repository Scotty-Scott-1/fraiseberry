import styles from "./MatchCard.module.css";
import { ChatBubbleLeftRightIcon, MapPinIcon } from "@heroicons/react/24/solid";

const MatchCard = ({ match }) => {
  return (
    <div className={styles.card}>
      <img
        src={match.profilePic}
        alt={match.name}
        className={styles.matchImg}
      />

      <div className={styles.cardContent}>
        <span className={styles.cardLabel}>
          {match.name}, {match.age}
        </span>

        <div className={styles.distanceRow}>
          <MapPinIcon className={styles.distanceIcon} />
          <span className={styles.distanceText}>
            {match.distanceKm} km away
          </span>
        </div>

        <div className={styles.cardActions}>
          <button className={styles.quickLinkBtn}>View Profile</button>

          <button className={styles.messageBtn}>
            <ChatBubbleLeftRightIcon className={styles.messageIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
