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
  const [loading, setLoading] = useState(false);
  const { savePreferences, saving } = useSetPreferences(preferences, setError);
  const navigate = useNavigate();

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

  const renderContent = () => {
    if (loading) return <p>Loading preferences...</p>;
    return <Filters preferences={preferences} onChange={handleChange} />;
  };

  useFetchPreferences(setLoading, setPreferences, setError);

  return (
    <Container>
      <DashboardHeader title="Preferences" navTo="/dashboard" />
      <ContentWrapper>
        <Card>{renderContent()}</Card>
          <PrimaryButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Preferences"}
          </PrimaryButton>
          {error && <p className={styles.error}>{error}</p>}
      </ContentWrapper>
    </Container>
  );
};

export default Preferences;
