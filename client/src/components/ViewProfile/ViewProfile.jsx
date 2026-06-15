import { useViewProfile } from "./hooks/useViewProfile";
import ProfileCard from "./ProfileCard";
import styles from "./Discover.module.css";
import { useParams } from "react-router-dom";
import Header from "../Utils/Header/Header";
import { DashboardHeader, Container } from "./index.js";


const ViewProfile = () => {
  const { otherUserId } = useParams();

  const {
    loading,
    profile,
    photos,
    nextPhoto,
    prevPhoto,
    currentPhotoIndex
  } = useViewProfile(otherUserId);

  if (loading)
    return <p className={styles.status}>Loading profile…</p>;

  return (
    <Container>
      <DashboardHeader title={profile.name} navTo="/dashboard" />
        <ProfileCard
          profile={profile}
          photos={photos}
          currentPhotoIndex={currentPhotoIndex}
          nextPhoto={nextPhoto}
          prevPhoto={prevPhoto}
        />
    </Container>
  );
};

export default ViewProfile;
