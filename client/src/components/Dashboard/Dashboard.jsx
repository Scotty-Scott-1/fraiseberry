import { useAuth } from "../Security/authContext";
import styles from "./Dashboard.module.css";
import { BellIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const matches = [
    { name: "Alice", age: 26, img: "/profiles/alice.jpg" },
    { name: "John", age: 28, img: "/profiles/john.jpg" },
    { name: "Sophie", age: 24, img: "/profiles/sophie.jpg" },
    { name: "Mike", age: 30, img: "/profiles/mike.jpg" },
  ];
  const handleClick = (button) => {
    switch (button) {
      case "1":
        navigate("/profile");
        break;
      default:
        break;
    }
  };


  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <div className={styles.headerLogout}>
            <button className={styles.logoutBtn} onClick={logout}>Logout</button>
          </div>
          <h1 className={styles.headerTitle}>Welcome Back!</h1>
          <div className={styles.headerBell}>
            <button className={styles.notificationBtn}>
              <BellIcon className={styles.notificationIcon} />
            </button>
          </div>
      </header>

        <p className={styles.subTitle}>Check your matches and updates</p>

        <div className={styles.headerActions}>
          <button className={styles.actionBtn} onClick={() => handleClick("1")}>
            Discover
          </button>
          <button className={styles.actionBtn}>
            Messages
          </button>
          <button className={styles.actionBtn}>
            Profile
          </button>
          <button className={styles.actionBtn}>
            Matches
          </button>
        </div>

      <section className={styles.cardsGrid}>
        {matches.map((match, idx) => (
          <div key={idx} className={styles.card}>
            <img
              src={match.img}
              alt={match.name}
              className={styles.matchImg}
            />
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>
                {match.name}, {match.age}
              </span>
              <button className={styles.quickLinkBtn}>View Profile</button>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Dashboard;
