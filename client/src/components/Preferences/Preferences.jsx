import React, { useState, useEffect } from "react";
import styles from "./Preferences.module.css";
import PreferencesFilters from "./PreferencesFilters";
import { useFetchPreferences } from "./useFetchPreferences";
import { useSetPreferences } from "./useSetPreferences";
import { useNavigate } from "react-router-dom";
import Container from "../Utils/Container/Container";
import DashboardHeader from "../Utils/DashboardHeader/DashboardHeader.jsx";
import ContentWrapper from "../Utils/ContentWrapper/ContentWrapper.jsx";
import Card from "../Utils/Card/Card.jsx";


const Preferences = () => {
  const [preferences, setPreferences] = useState({
    preferredGender: "any",
    ageRangeMin: 18,
    ageRangeMax: 100,
    maxDistanceKm: 50,
  });
  const [error, setError] = useState("");
  const { fetchPreferences } = useFetchPreferences(preferences, setPreferences, setError);
  const { savePreferences, saving } = useSetPreferences(preferences, setError);
  const navigate = useNavigate();



  useEffect(() => {
    const load = async () => {
      const data = await fetchPreferences();
      console.log(data.message);
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: Number(value) || value }));
  };

  const handleSave = async () => {
      const success = await savePreferences();
      if (success) {
        navigate("/dashboard");
      }
  };

  return (
    <Container>
      <DashboardHeader title="Preferences" navTo="/dashboard" />
      <ContentWrapper>
        <Card>

          <PreferencesFilters preferences={preferences} onChange={handleChange} />
          <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Preferences"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </Card>
      </ContentWrapper>
    </Container>
  );
};

export default Preferences;
