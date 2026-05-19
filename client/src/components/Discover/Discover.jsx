import { useDiscover } from "./hooks/useDiscover";
import ProfileCard from "./ProfileCard";
import styles from "./Discover.module.css";
import DashboardHeader from "../Utils/DashboardHeader/DashboardHeader";

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

  const renderContent = () => {
    if (loading) return <p className={styles.text}>Loading matches...</p>;
    if (!hasMore) return <p className={styles.text}>No more profiles nearby 🔍</p>;
    return
     <ProfileCard
        profile={profile}
        photos={photos}
        currentPhotoIndex={currentPhotoIndex}
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
        handleAction={handleAction}
        likeLoading={likeLoading}
        error={error}
      />;
};

  return (
    <div className={styles.container}>
      <DashboardHeader title="Discover" navTo="/dashboard" />
      {renderContent()}
    </div>
  );
};

export default Discover;
