import { useAuth } from "../Security/authContext";

export const useFetchPreferences = (preferences, setPreferences, setError) => {
  const { accessToken } = useAuth();

  const fetchPreferences = async () => {
    try {
      const res = await fetch("/api/preferences", {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch preferences");

      setPreferences({
        preferredGender: data.preferredGender || "any",
        ageRangeMin: data.ageRangeMin || 18,
        ageRangeMax: data.ageRangeMax || 100,
        maxDistanceKm: data.maxDistanceKm || 50,
      });
      return { message: "loaded preferences"};
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return { fetchPreferences };
};
