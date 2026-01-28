import { useRef, useEffect, useState } from "react";
import styles from "./ProfilePicSection.module.css";

const ProfilePicture = ({ photo, onChange }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (photo?.preview && photo.file) URL.revokeObjectURL(photo.preview);
    };
  }, [photo]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newPhoto = { file, preview: URL.createObjectURL(file) };
    onChange && onChange(newPhoto);
    e.target.value = null;
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>Profile Picture</h2>
      <div className={styles.avatarSection}>
        {photo ? (
          <>
            <img src={photo.preview} alt="Profile" className={styles.avatar} />
            <button
              type="button"
              className={styles.photoBtn}
              onClick={handleButtonClick}
            >
              Change Photo
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.addPhotoBtn}
            onClick={handleButtonClick}
          >
            + Add Photo
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
};

export default ProfilePicture;

