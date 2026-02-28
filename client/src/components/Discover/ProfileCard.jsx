import styles from "./Discover.module.css";

const ProfileCard = ({
  profile,
  photos,
  currentPhotoIndex,
  nextPhoto,
  prevPhoto,
  handleAction,
  likeLoading,
  error,
}) => {
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
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentPhotoIndex
                    ? styles.activeDot
                    : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h2>
          {profile.name}, {profile.age}
        </h2>

        <p>{profile.bio}</p>

        <span className={styles.distance}>
          {profile.distanceKm} km away
        </span>
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

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ProfileCard;
