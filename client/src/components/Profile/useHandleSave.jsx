import { useState } from "react";
import { useAuth } from "../Security/authContext";

export const useHandleSave = () => {
  const [saving, setSaving] = useState(false);
  const { accessToken } = useAuth();

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

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Request failed: ${res.status}`);
      }

      console.log("Profile saved:", data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return { handleSave, saving };
};
