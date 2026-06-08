import styles from "./PreferencesFilters.module.css";
import { Subtitle2 } from "../Utils/Title/Title";

const PreferencesFilters = ({ preferences = {}, onChange }) => {
  const {
    preferredGender = "any",
    ageRangeMin = 18,
    ageRangeMax = 100,
    maxDistanceKm = 50,
  } = preferences;

  return (
    <div className={styles.gap}>
      <Subtitle2>Your Preferences</Subtitle2>
            <label className={styles.label}>
              Gender
              <ul className={styles.genderList}>
                {["male", "female", "non-binary", "any"].map((gender) => (
                  <li
                  key={gender}
                  className={`${styles.genderItem} ${
                    preferences.preferredGender === gender ? styles.selected : ""
                  }`}
                  onClick={() =>
                    onChange({ target: { name: "preferredGender", value: gender } })
                  }
                  >
                    {gender}
                  </li>
                ))}
              </ul>
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
    </div>
  );
};

export default PreferencesFilters;
