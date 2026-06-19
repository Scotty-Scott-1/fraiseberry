import { useEffect } from "react";
import { useApiCall } from "../../../services/useApiCall";

export const useFetchPreferences = (setLoading, setPreferences, setError) => {
  const { apiCall } = useApiCall();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true);
        const res = await apiCall("/api/preferences", {
          method: "GET",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch preferences");
        }

        setPreferences({
          preferredGender: data.preferredGender || "any",
          ageRangeMin: data.ageRangeMin || 18,
          ageRangeMax: data.ageRangeMax || 100,
          maxDistanceKm: data.maxDistanceKm || 50,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    fetchPreferences();
  }, []);

  return;
};
