import { useState } from "react";
import { useGetProfiles } from "./useGetProfiles";
import { useLike } from "./useLike";
import styles from "./Discover.module.css";

const Discover = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading } = useGetProfiles(setProfiles);
  const { likeUser, loading: likeLoading, error: likeError } = useLike();

  const handleAction = async (action) => {
    const profile = profiles[currentIndex];
    if (!profile) return;

    if (action === "like") {
      const result = await likeUser(profile.userId);

      if (result?.matched) {
        alert(`🔥 It's a match with ${profile.name}!`);
      }
    }

    // Move to next profile
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p className={styles.status}>Loading matches…</p>;
  if (currentIndex >= profiles.length)
    return <p className={styles.status}>No more profiles nearby 🔍</p>;

  const profile = profiles[currentIndex];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={profile.profilePic}
          alt={profile.name}
          className={styles.image}
        />

        <div className={styles.info}>
          <h2>
            {profile.name}, {profile.age}
          </h2>
          <p>{profile.bio}</p>
          <span className={styles.distance}>{profile.distanceKm} km away</span>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.pass}
            onClick={() => handleAction("pass")}
          >
            ❌ Pass
          </button>

          <button
            className={styles.like}
            onClick={() => handleAction("like")}
            disabled={likeLoading}
          >
            ❤️ {likeLoading ? "..." : "Like"}
          </button>
        </div>

        {likeError && <p className={styles.error}>{likeError}</p>}
      </div>
    </div>
  );
};

export default Discover;
