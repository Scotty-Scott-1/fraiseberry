import { useState } from "react";
import { useAuth } from "../Security/authContext";
import { useNavigate } from "react-router-dom";


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

      // Append profile pic if there's a new file
      if (profileData.profilePic?.file) {
        formData.append("profilePic", profileData.profilePic.file);
      }

      // Append supporting photos
      profileData.supportingPics.forEach((photo, idx) => {
        if (photo.file) {
          formData.append(`supportingPics`, photo.file); // can use same field name array
        }
      });

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}` // no Content-Type for FormData!
        },
        credentials: "include",
        body: formData
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

