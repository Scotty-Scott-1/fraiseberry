import styles from "./Profile.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleSave } from "./useHandleSave";
import { useGetProfile } from "./useGetProfile";
import ProfilePicture from "./ProfilePicSection.jsx";
import SupportingPhotos from "./PhotoSection";
import ProfileDetails from "./ProfileDetails";
import imageCompression from "browser-image-compression";

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
      maxSizeMB: 25,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    return await imageCompression(file, options);
  };

  const updateProfileField = async (key, value) => {

    if (
      value &&
      typeof value === "object" &&
      value.file instanceof File
    ) {

      try {
        console.log(
          "Original:",
          (value.file.size / (1024 * 1024)).toFixed(2),
          "MB"
        );

        const compressedFile = await compressImage(value.file);

        console.log(
          "Compressed:",
          (compressedFile.size / (1024 * 1024)).toFixed(2),
          "MB"
        );

        value = {
          file: compressedFile,
          preview: URL.createObjectURL(compressedFile),
        };

      } catch (err) {
        console.error("Compression failed:", err);
        setError("Image compression failed");
        return;
      }
    }

    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
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
      <h1 className={styles.title}>Your Profile</h1>
      <p className={styles.subTitle}>
        Be yourself. The right people notice.
      </p>

      <ProfilePicture
        photo={profileData.profilePic}
        onChange={(photo) => updateProfileField("profilePic", photo)}
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
          updateProfileField(key, photo)
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
  );
};

export default Profile;
