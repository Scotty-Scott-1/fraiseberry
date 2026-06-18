import { useRef, useEffect } from "react";
import styles from "./ProfilePic.module.css";
import { Subtitle2 } from "../../Utils/Title/Title";
import { SecondaryButton } from "../../Utils/Buttons/primaryButton/primaryButton";

const ProfilePic = ({ photo, onChange }) => {
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

  const renderContent = () => {
    if (photo) return (
        <>
          <img src={photo.preview} alt="Profile" className={styles.avatar} />
          <SecondaryButton onClick={handleButtonClick}>
            Change Photo
          </SecondaryButton>
        </>
      );
    return (
      <button
        type="button"
        className={styles.addPhotoBtn}
        onClick={handleButtonClick}
      >
        + Add Photo
      </button>
    );
  }

  return (
    <section className={styles.card}>
      <Subtitle2>Profile Picture</Subtitle2>
      <div className={styles.avatarSection}>
        {renderContent()}
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

export default ProfilePic;

