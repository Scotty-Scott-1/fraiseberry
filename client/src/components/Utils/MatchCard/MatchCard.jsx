import styles from "./MatchCard.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar/Avatar";
import Name from "./Name/Name";
import Distance from "./Distance/Distance";
import Actions from "./Actions/Actions";

const MatchCard = ({ match }) => {

  return (
    <div className={styles.card}>
      <Avatar match={match} />
      <div className={styles.cardContent}>
        <Name match={match} />
        <Distance match={match} />
        <Actions match={match} />
      </div>
    </div>
  );
};

export default MatchCard;
