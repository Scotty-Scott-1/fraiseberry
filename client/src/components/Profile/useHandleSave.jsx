import { useState } from "react";
import { useAuth } from "../Security/authContext";
import { useApiCall } from "../../services/useApiCall";

export const useHandleSave = () => {
  const [saving, setSaving] = useState(false);
  const { apiCall } = useApiCall();

  const handleSave = async (profileData, setError) => {
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();

      // Append text fields
      formData.append("name", profileData.name);
      formData.append("age", profileData.age);
      formData.append("gender", profileData.gender);
      formData.append("bio", profileData.bio);

      // Append profile picture if a new file exists
      if (profileData.profilePic?.file) {
        formData.append("profilePic", profileData.profilePic.file);
      }

      // Append supporting photos
      ["supportingPic1", "supportingPic2", "supportingPic3"].forEach((key) => {
        const photo = profileData[key];
        if (photo?.file) {
          formData.append(key, photo.file);
        }
      });

      const res = await apiCall("/api/profile", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Request failed: ${res.status}`);
      }
      return true;

    } catch (err) {
      setError(err.message || "Failed to save profile");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { handleSave, saving };
};
