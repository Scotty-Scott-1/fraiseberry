import { useRef, useEffect } from "react";
import styles from "./PhotoSection.module.css";

const MAX_PHOTOS = 3;

const SupportingPhotos = ({ photos = [], onChange }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo.file && photo.preview) URL.revokeObjectURL(photo.preview);
      });
    };
  }, [photos]);

  const handleButtonClick = () => {
    if (photos.length < MAX_PHOTOS) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) return;

    const acceptedFiles = files.slice(0, remainingSlots);
    const newPhotos = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    onChange([...photos, ...newPhotos]);
    e.target.value = null;
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    if (photos[index]?.file && photos[index]?.preview) {
      URL.revokeObjectURL(photos[index].preview);
    }
    onChange(updatedPhotos);
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>Supporting Photos</h2>

      <div className={styles.photoGrid}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.photoWrapper}>
            <img
              src={photo.preview}
              alt={`supporting-${index}`}
              className={styles.photo}
            />
            <button
              type="button"
              className={styles.removePhotoBtn}
              onClick={() => handleRemovePhoto(index)}
            >
              ✕
            </button>
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            className={styles.addPhotoBtn}
            onClick={handleButtonClick}
          >
            + Add Photo
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />
    </section>
  );
};

export default SupportingPhotos;
