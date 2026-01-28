import { useState } from "react";
import { useAuth } from "../Security/authContext";

export const useSetPreferences = (preferences, setError) => {
  const { accessToken } = useAuth();
  const [saving, setSaving] = useState(false);

  const savePreferences = async () => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
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
