import { useAuth } from "../Security/authContext";
import styles from "./Dashboard.module.css";
import DashboardHeader from "../Utils/DashboardHeader/DashboardHeader.jsx";
import { useUpdateLocation } from "./useUpdateLocation";
import { useGetMatches } from "./useGetMatches";
import MatchCard from "../Utils/MatchCard/MatchCard.jsx";
import { PrimaryButton } from "../Utils/Buttons/primaryButton/primaryButton.jsx";
import Actions from "./Actions/Actions.jsx";
import MatchCardSection from "./MatchCards/MatchCardSection.jsx";

const Dashboard = () => {
  const { accessToken, logout } = useAuth();
  useUpdateLocation(accessToken);
  const { matches, loading, name } = useGetMatches();

  return (
    <div className={styles.container}>
      <DashboardHeader
        title={`Welcome Back ${name || ""}!`}
        onLogout={logout}
        buttonType = "logout"
      />
      <div className={styles.contentWrapper}>
        <p className={styles.text}>
          Check your matches and updates
        </p>
        <Actions/>
        <MatchCardSection loading={loading} matches={matches} />
      </div>
    </div>
  );
}

export default Dashboard;
