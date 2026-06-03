import styles from "./Name.module.css";

const Name = ({ match }) => {
  return (
  <div className={styles.name}>
      {match.name}, {match.age}
  </div>
  );
};

export default Name;
