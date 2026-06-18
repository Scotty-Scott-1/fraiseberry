import React, { useState, useEffect } from "react";
import styles from "./Preferences.module.css";
import { useNavigate } from "react-router-dom";
import {
  Filters,
  useFetchPreferences,
  useSetPreferences,
  Container,
  DashboardHeader,
  ContentWrapper,
  Card,
  PrimaryButton,
} from "./index";

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
          <Filters preferences={preferences} onChange={handleChange} />
        </Card>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Preferences"}
          </PrimaryButton>
          {error && <p className={styles.error}>{error}</p>}
      </ContentWrapper>
    </Container>
  );
};

export default Preferences;
