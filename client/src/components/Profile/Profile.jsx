import styles from "./Profile.module.css";
import { useState } from "react";
 import { useHandleSave } from "./useHandleSave";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Alex",
    age: 27,
    bio: "Coffee lover. Gym enjoyer. Looking for something real.",
    gender: "Male"
  });

  const { handleSave, saving, error } = useHandleSave(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
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
          Gender
          <ul className={styles.genderList}>
            {["male", "female", "non-binary", "other"].map((gender) => (
              <li
                key={gender}
                className={`${styles.genderItem} ${formData.gender === gender ? styles.selected : ""}`}
                onClick={() => handleChange({ target: { name: "gender", value: gender } })}
              >
                {gender}
              </li>
            ))}
          </ul>
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


      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Supporting Photos</h2>
        <div className={styles.photoGrid}>
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
