import { useState } from "react";
import { useAuth } from "../Security/authContext";
import { useApiCall } from "../../services/useApiCall";

export const useSetPreferences = (preferences, setError) => {
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

      return true;
    } catch (err) {
      setError(err.message);
      return false
    } finally {
      setSaving(false);
    }
  };

  return { savePreferences, saving };
};
