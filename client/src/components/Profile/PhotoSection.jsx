import { useRef, useEffect } from "react";
import styles from "./PhotoSection.module.css";

// Individual photo slot component
const PhotoSlot = ({ title, photo, onChange }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (photo?.file && photo?.preview) URL.revokeObjectURL(photo.preview);
    };
  }, [photo]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newPhoto = { file, preview: URL.createObjectURL(file) };
    onChange(newPhoto);
    e.target.value = null;
  };

  const handleRemove = () => {
    if (photo?.file && photo?.preview) URL.revokeObjectURL(photo.preview);
    onChange(null);
  };

  return (
    <div className={styles.photoSlot}>
      <h3 className={styles.photoTitle}>{title}</h3>

      {photo ? (
        <>
          <img src={photo.preview} alt={title} className={styles.photoPreview} />
          <div className={styles.photoButtons}>
            <button type="button" className={styles.photoBtn} onClick={handleButtonClick}>
              Change
            </button>
            <button type="button" className={styles.removePhotoBtn} onClick={handleRemove}>
              ✕
            </button>
          </div>
        </>
      ) : (
        <button type="button" className={styles.addPhotoBtn} onClick={handleButtonClick}>
          + Add {title}
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
  );
};

// Main supporting photos section
const SupportingPhotos = ({ supportingPic1, supportingPic2, supportingPic3, onChange }) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>Supporting Photos</h2>

      <div className={styles.photosGrid}>
        <PhotoSlot
          title="Photo 1"
          photo={supportingPic1}
          onChange={(photo) => onChange("supportingPic1", photo)}
        />
        <PhotoSlot
          title="Photo 2"
          photo={supportingPic2}
          onChange={(photo) => onChange("supportingPic2", photo)}
        />
        <PhotoSlot
          title="Photo 3"
          photo={supportingPic3}
          onChange={(photo) => onChange("supportingPic3", photo)}
        />
      </div>
    </section>
  );
};

export default SupportingPhotos;
