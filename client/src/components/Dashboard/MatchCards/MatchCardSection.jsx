import styles from "./MatchCardSection.module.css";
import MatchCard from "../../Utils/MatchCard/MatchCard.jsx";

const MatchCardSection = ({ loading, matches }) => {
  const renderContent = () => {
    if (loading) return <p>Loading matches…</p>;
    if (!loading && matches.length === 0) return (
      <p className={styles.text}>No matches yet — keep swiping!</p>
    );
    if (!loading && matches.length > 0) return (
      matches.map((match, idx) => (
        <MatchCard key={idx} match={match} />
      ))
    );
  }
  return (
    <section className={styles.cardsGrid}>
      {renderContent()}
    </section>
  );
}

export default MatchCardSection;
