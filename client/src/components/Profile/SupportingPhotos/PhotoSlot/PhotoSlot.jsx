import { useRef, useEffect } from "react";
import styles from "./PhotoSlot.module.css";

const PhotoSlot = ({ title, photo, onChange }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (photo?.file && photo?.preview) {
        URL.revokeObjectURL(photo.preview);
      }
    };
  }, [photo]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newPhoto = {
      file,
      preview: URL.createObjectURL(file),
    };

    onChange(newPhoto);
    e.target.value = null;
  };

  const handleRemove = () => {
    if (photo?.file && photo?.preview) {
      URL.revokeObjectURL(photo.preview);
    }
    onChange(null);
  };

  const renderContent = () => {
    if (photo) return (
      <>
        <img
          src={photo.preview}
          alt={title}
          className={styles.photoPreview}
        />
        <button
          type="button"
          className={styles.removePhotoBtn}
          onClick={handleRemove}
          >✕
        </button>
      </>
    );
    return (
      <button
        type="button"
        className={styles.addPhotoBtn}
        onClick={handleButtonClick}
      >
        + Add {title}
      </button>
    );
  }

  const renderContent2 = () => {
    if (photo) return (
      <button
        type="button"
        className={styles.photoBtn}
        onClick={handleButtonClick}
      >
        Change
      </button>);
  }

  const hiddenContent = () => {
    return(
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    )
  }

  return (
    <div className={styles.photoSlot}>
      {hiddenContent()}
      <h3 className={styles.photoTitle}>{title}</h3>
      <div className={styles.photoWrapper}>{renderContent()}</div>
      <div className={styles.photoButtons}>{renderContent2()}</div>
    </div>
  );
};

export default PhotoSlot;
