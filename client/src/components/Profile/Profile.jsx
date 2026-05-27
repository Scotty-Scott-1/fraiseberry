import styles from "./Profile.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleSave } from "./useHandleSave";
import { useGetProfile } from "./useGetProfile";
import ProfilePicture from "./ProfilePicSection.jsx";
import SupportingPhotos from "./PhotoSection";
import ProfileDetails from "./ProfileDetails";
import imageCompression from "browser-image-compression";
import DashboardHeader from "../Utils/DashboardHeader/DashboardHeader.jsx";
import { Subtitle } from "../Utils/Title/Title.jsx";


const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    bio: "",
    gender: "",
    profilePic: null,
    supportingPic1: null,
    supportingPic2: null,
    supportingPic3: null,
  });
  const [error, setError] = useState("");
  const { handleSave, saving } = useHandleSave();
  const { getProfile } = useGetProfile();
  const navigate = useNavigate();

  const onSave = async () => {
    const success = await handleSave(profileData, setError);
    if (success) {
    navigate("/dashboard");
  }
};

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 120,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    const result = await imageCompression(file, options);

    return result;
  };

  const updateProfileField = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = async (key, value) => {
  if (value?.file instanceof File) {
    try {
      const compressedFile = await compressImage(value.file);

      const updatedValue = {
        file: compressedFile,
        preview: URL.createObjectURL(compressedFile),
      };

      setProfileData((prev) => ({
        ...prev,
        [key]: updatedValue,
      }));

    } catch (err) {
      console.error("Compression failed:", err);
      setError("Image compression failed");
    }
  } else {
    updateProfileField(key, value);
  }
};

  // Load profile from backend
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setProfileData((prev) => ({
          ...prev,
          name: data.name ?? "",
          age: data.age ?? "",
          bio: data.bio ?? "",
          gender: data.gender ?? "",

          profilePic: data.profilePic
            ? { file: null, preview: data.profilePic }
            : null,

          supportingPic1: data.supportingPic1
            ? { file: null, preview: data.supportingPic1 }
            : null,

          supportingPic2: data.supportingPic2
            ? { file: null, preview: data.supportingPic2 }
            : null,

          supportingPic3: data.supportingPic3
            ? { file: null, preview: data.supportingPic3 }
            : null,
        }));

        console.log("Profile fetched");
      } catch (err) {
        console.error(err.message);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className={styles.container}>
      <DashboardHeader title="Profile" navTo="/dashboard" />
      <div className={styles.contentWrapper}>
        <ProfilePicture
          photo={profileData.profilePic}
          onChange={(photo) => handleImageChange("profilePic", photo)}
        />

        <ProfileDetails
          profileData={profileData}
          onChange={(e) =>
          updateProfileField(e.target.name, e.target.value)
          }
        />

        <SupportingPhotos
          supportingPic1={profileData.supportingPic1}
          supportingPic2={profileData.supportingPic2}
          supportingPic3={profileData.supportingPic3}
          onChange={(key, photo) =>
            handleImageChange(key, photo)
          }
        />

        <button
          className={styles.saveBtn}
          onClick={onSave}
          disabled={saving}
          >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
