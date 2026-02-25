import styles from "./Profile.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleSave } from "./useHandleSave";
import { useGetProfile } from "./useGetProfile";
import ProfilePicture from "./ProfilePicSection.jsx";
import SupportingPhotos from "./PhotoSection";
import ProfileDetails from "./ProfileDetails";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (newPhoto) => {
    setProfileData((prev) => ({ ...prev, profilePic: newPhoto }));
  };

  const handleSupportingPhotoChange = (key, newPhoto) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: newPhoto,
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
        onChange={handleProfilePicChange}
      />

      <ProfileDetails
        profileData={profileData}
        onChange={handleChange}
      />

      <SupportingPhotos
        supportingPic1={profileData.supportingPic1}
        supportingPic2={profileData.supportingPic2}
        supportingPic3={profileData.supportingPic3}
        onChange={handleSupportingPhotoChange}
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
