import styles from "./Avatar.module.css";

const Avatar = ({ match }) => {
  return (
    <img
      src={match.profilePic}
      alt={match.name}
      className={styles.avatar}
    />
  );
}

export default Avatar;
