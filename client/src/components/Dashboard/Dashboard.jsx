import { useAuth } from "../Security/authContext";
import styles from "./Dashboard.module.css";
import { BellIcon } from "@heroicons/react/24/solid";
import BackButton from "../Utils/BackButton/BackButton"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { accessToken, logout } = useAuth();
  const matches = [
    { name: "Alice", age: 26, img: "/profiles/alice.jpg" },
    { name: "John", age: 28, img: "/profiles/john.jpg" },
    { name: "Sophie", age: 24, img: "/profiles/sophie.jpg" },
    { name: "Mike", age: 30, img: "/profiles/mike.jpg" },
  ];
    const navigate = useNavigate();
      const goBack = () => {
    navigate(-1); // go back
  };


  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
                <p>Your token: {accessToken}</p>
      <button onClick={logout}>Logout</button>
          <div className={styles.backBox}>
            <BackButton onClick={goBack} />
          </div>
          <h1 className={styles.headerTitle}>Welcome Back!</h1>
          <button className={styles.notificationBtn}>
            <BellIcon className={styles.notificationIcon} />
          </button>
        </div>
        <p className={styles.subTitle}>Check your matches and updates</p>
        {/* Quick Actions */}
        <div className={styles.headerActions}>
          <button className={`${styles.actionBtn} ${styles.primaryAction}`}>Discover</button>
          <button className={`${styles.actionBtn} ${styles.secondaryAction}`}>Messages</button>
          <button className={`${styles.actionBtn} ${styles.secondaryAction}`}>Profile</button>
          <button className={`${styles.actionBtn} ${styles.primaryAction}`}>Matches</button>
        </div>
      </header>

      {/* Matches Grid */}
      <section className={styles.cardsGrid}>
        {matches.map((match, idx) => (
          <div key={idx} className={styles.card}>
            <img
              src={match.img}
              alt={match.name}
              className={styles.matchImg}
            />
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>{match.name}, {match.age}</span>
              <button className={styles.quickLinkBtn}>View Profile</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
