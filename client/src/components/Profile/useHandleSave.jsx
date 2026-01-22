import { useState } from "react";
import { useAuth } from "../Security/authContext";
import { useNavigate } from "react-router-dom";

export const useHandleSave = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleSave = async (formData) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });



    } catch (err) {
      console.error(err);
      setError(err || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSave, saving, error };
};
