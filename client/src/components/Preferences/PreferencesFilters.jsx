import styles from "./PreferencesFilters.module.css";

const PreferencesFilters = ({ preferences = {}, onChange }) => {
  const {
    preferredGender = "any",
    ageRangeMin = 18,
    ageRangeMax = 100,
    maxDistanceKm = 50,
  } = preferences;

  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>Search Preferences</h2>

      <label className={styles.label}>
        Preferred Gender
        <select
          name="preferredGender"
          value={preferredGender}
          onChange={onChange}
          className={styles.input}
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-Binary</option>
        </select>
      </label>

      <div className={styles.sliderGroup}>
        <label className={styles.label}>Min Age: {ageRangeMin}</label>
        <input
          type="range"
          name="ageRangeMin"
          min="18"
          max={ageRangeMax}
          value={ageRangeMin}
          onChange={onChange}
          className={styles.slider}
        />
      </div>

      <div className={styles.sliderGroup}>
        <label className={styles.label}>Max Age: {ageRangeMax}</label>
        <input
          type="range"
          name="ageRangeMax"
          min={ageRangeMin}
          max="100"
          value={ageRangeMax}
          onChange={onChange}
          className={styles.slider}
        />
      </div>

      <div className={styles.sliderGroup}>
        <label className={styles.label}>Max Distance (km): {maxDistanceKm}</label>
        <input
          type="range"
          name="maxDistanceKm"
          min="1"
          max="500"
          value={maxDistanceKm}
          onChange={onChange}
          className={styles.slider}
        />
      </div>
    </section>
  );
};

export default PreferencesFilters;
