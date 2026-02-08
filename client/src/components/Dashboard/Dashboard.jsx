import { useAuth } from "../Security/authContext";
import styles from "./Dashboard.module.css";
import { BellIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useUpdateLocation } from "./useUpdateLocation";
import { useGetMatches } from "./useGetMatches";

const Dashboard = () => {
  const { logout } = useAuth();
  useUpdateLocation();
  const navigate = useNavigate();

  const { matches, loading } = useGetMatches();

  const handleClick = (button) => {
    switch (button) {
      case "1":
        navigate("/profile");
        break;
      case "2":
        navigate("/preferences");
        break;
      case "3":
        navigate("/discover");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLogout}>
          <button className={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
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
        <button className={styles.actionBtn} onClick={() => handleClick("3")}>
          Discover
        </button>
        <button className={styles.actionBtn}>Messages</button>
        <button className={styles.actionBtn} onClick={() => handleClick("1")}>
          Profile
        </button>
        <button className={styles.actionBtn} onClick={() => handleClick("2")}>
          Preferences
        </button>
      </div>

      <section className={styles.cardsGrid}>
        {loading && <p>Loading matches…</p>}

        {!loading && matches.length === 0 && (
          <p>No matches yet — keep swiping!</p>
        )}

        {!loading &&
          matches.map((match, idx) => (
            <div key={idx} className={styles.card}>
              <img
                src={match.profilePic}
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
