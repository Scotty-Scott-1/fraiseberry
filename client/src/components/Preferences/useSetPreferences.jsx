import { useState } from "react";
import { useAuth } from "../Security/authContext";
import { useApiCall } from "../../services/useApiCall";

export const useSetPreferences = (preferences, setError) => {
  const { accessToken } = useAuth();
  const { apiCall } = useApiCall();
  const [saving, setSaving] = useState(false);

  const savePreferences = async () => {
    setSaving(true);
    setError("");

    try {
      const res = await apiCall("/api/preferences", {
        method: "PUT",
        body: JSON.stringify(preferences),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save preferences");

      return data;
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { savePreferences, saving };
};
