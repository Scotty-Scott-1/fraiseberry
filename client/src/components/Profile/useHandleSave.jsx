import { useState } from "react";
import { useAuth } from "../Security/authContext";
import { useNavigate } from "react-router-dom";

export const useHandleSave = () => {
  const [saving, setSaving] = useState(false);
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleSave = async (profileData, setError) => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include",
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.error("Fetch error:", res.status, text);
        throw new Error(`Request failed: ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setSaving(false);
    }
  };

  return { handleSave, saving };
};
