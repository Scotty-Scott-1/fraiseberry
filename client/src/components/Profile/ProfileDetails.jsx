import styles from "./ProfileDetails.module.css";

const ProfileDetails = ({ profileData, onChange }) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>About You</h2>

      <label className={styles.label}>
        Name
        <input
          name="name"
          value={profileData.name}
          onChange={onChange}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Age
        <input
          type="number"
          name="age"
          value={profileData.age}
          onChange={onChange}
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
              className={`${styles.genderItem} ${
                profileData.gender === gender ? styles.selected : ""
              }`}
              onClick={() =>
                onChange({ target: { name: "gender", value: gender } })
              }
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
          value={profileData.bio}
          onChange={onChange}
          className={styles.textarea}
          rows={4}
        />
      </label>
    </section>
  );
};

export default ProfileDetails;
