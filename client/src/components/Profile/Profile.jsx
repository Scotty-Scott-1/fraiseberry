import styles from "./Profile.module.css";
import { useState } from "react";
 import { useHandleSave } from "./useHandleSave";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Alex",
    age: 27,
    bio: "Coffee lover. Gym enjoyer. Looking for something real.",
    avatar: "/profiles/default-avatar.jpg",
    photos: [
      "/profiles/pic1.jpg",
      "/profiles/pic2.jpg",
      "/profiles/pic3.jpg",
    ],
  });
  const { handleSave, saving, error } = useHandleSave();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };






  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Profile</h1>
      <p className={styles.subTitle}>Be yourself. The right people notice.</p>

      {/* Profile Picture */}
      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Profile Picture</h2>
        <div className={styles.avatarSection}>
          <img src={formData.avatar} alt="Profile" className={styles.avatar} />
          <button className={styles.photoBtn}>Change Photo</button>
        </div>
      </section>

      {/* About You */}
      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>About You</h2>
        <label className={styles.label}>
          Name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Age
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={styles.input}
             min={18}
          />
        </label>
        <label className={styles.label}>
          Bio
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
          />
        </label>
      </section>

      {/* Supporting Photos */}
      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Supporting Photos</h2>
        <div className={styles.photoGrid}>
          {formData.photos.map((photo, idx) => (
            <div key={idx} className={styles.photoWrapper}>
              <img src={photo} alt={`Photo ${idx + 1}`} />
            </div>
          ))}
          <button className={styles.addPhotoBtn}>+ Add Photo</button>
        </div>
      </section>

      <button className={styles.saveBtn} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
