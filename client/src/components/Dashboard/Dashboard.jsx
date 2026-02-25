import { useAuth } from "../Security/authContext";
import styles from "./Dashboard.module.css";
import DashboardHeader from "../Utils/DashboardHeader/DashboardHeader.jsx";
import { useNavigate } from "react-router-dom";
import { useUpdateLocation } from "./useUpdateLocation";
import { useGetMatches } from "./useGetMatches";
import MatchCard from "../Utils/MatchCard/MatchCard.jsx";

const Dashboard = () => {
  const { accessToken, logout } = useAuth();
  useUpdateLocation(accessToken);
  const navigate = useNavigate();
  const { matches, loading, name } = useGetMatches();

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
      case "4":
        navigate("/conversationlist");
        break;
      case "5":
        navigate("/mfa");
        break;
      default:
        break;
    }
  };

return (
  <div className={styles.container}>

    {/* Header full width */}
    <DashboardHeader
      title={`Welcome Back ${name || ""}!`}
      onLogout={logout}
    />

    {/* Inner centered dashboard content */}
    <div className={styles.contentWrapper}>

      <p className={styles.subTitle}>
        Check your matches and updates
      </p>

      <div className={styles.headerActions}>
        <button className={styles.actionBtn} onClick={() => handleClick("3")}>
          Discover
        </button>

        <button className={styles.actionBtn} onClick={() => handleClick("4")}>
          Messages
        </button>

        <button className={styles.actionBtn} onClick={() => handleClick("1")}>
          Profile
        </button>

        <button className={styles.actionBtn} onClick={() => handleClick("2")}>
          Preferences
        </button>

        <button className={styles.actionBtn} onClick={() => handleClick("5")}>
          MFA
        </button>
      </div>

      <section className={styles.cardsGrid}>
        {loading && <p>Loading matches…</p>}

        {!loading && matches.length === 0 && (
          <p>No matches yet — keep swiping!</p>
        )}

        {!loading &&
          matches.map((match, idx) => (
            <MatchCard key={idx} match={match} />
          ))}
      </section>

    </div>
  </div>
);
}
export default Dashboard;
