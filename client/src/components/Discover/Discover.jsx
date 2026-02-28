import { useDiscover } from "./hooks/useDiscover";
import ProfileCard from "./ProfileCard";
import styles from "./Discover.module.css";

const Discover = () => {
  const {
    loading,
    profile,
    photos,
    currentPhotoIndex,
    nextPhoto,
    prevPhoto,
    handleAction,
    likeLoading,
    error,
    hasMore,
  } = useDiscover();

  if (loading)
    return <p className={styles.status}>Loading matches…</p>;

  if (!hasMore)
    return <p className={styles.status}>No more profiles nearby 🔍</p>;

  return (
    <div className={styles.container}>
      <ProfileCard
        profile={profile}
        photos={photos}
        currentPhotoIndex={currentPhotoIndex}
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
        handleAction={handleAction}
        likeLoading={likeLoading}
        error={error}
      />
    </div>
  );
};

export default Discover;
