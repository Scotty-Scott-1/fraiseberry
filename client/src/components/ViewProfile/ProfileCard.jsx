import styles from "./Discover.module.css";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";


const ProfileCard = ({
  profile,
  photos,
  currentPhotoIndex,
  nextPhoto,
  prevPhoto,
}) => {

  console.log("Testing: ", profile);

  const navigate = useNavigate();
  const openChat = () => {
    navigate(`/chat/${profile.userId}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {photos.length > 1 && currentPhotoIndex > 0 && (
          <button className={styles.leftArrow} onClick={prevPhoto}>
            ◀
          </button>
        )}

        <img
          src={photos[currentPhotoIndex]}
          alt={profile.name}
          className={styles.image}
        />

        {photos.length > 1 &&
          currentPhotoIndex < photos.length - 1 && (
            <button className={styles.rightArrow} onClick={nextPhoto}>
              ▶
            </button>
          )}

        {photos.length > 1 && (
          <div className={styles.dots}>
            {photos.map((_, index) => (
              <span key={index} className={`${styles.dot} ${index === currentPhotoIndex ? styles.activeDot : ""}`}/>
            ))}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h2>{profile.name}, {profile.age}</h2>
        <p>{profile.bio}</p>
        <span className={styles.distance}>{profile.distanceKm} km away</span>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.messageButton}
          onClick={openChat}
        >
          <ChatBubbleLeftRightIcon className={styles.messageIcon} />
        </button>
      </div>

    </div>
  );
};

export default ProfileCard;
