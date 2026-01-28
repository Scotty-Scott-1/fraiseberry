import styles from "./Profile.module.css";
import React, { useState, useEffect } from "react";
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
    supportingPics: []
  });
  const [error, setError] = useState("");
  const { handleSave, saving } = useHandleSave();
  const { getProfile } = useGetProfile();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (newPhoto) => {
    setProfileData((prev) => ({ ...prev, profilePic: newPhoto }));
  };

  const handleSupportingPhotosChange = (newPhotos) => {
    setProfileData((prev) => ({ ...prev, supportingPics: newPhotos }));
  };

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
          profilePic: data.profilePic ? { file: null, preview: data.profilePic } : null,
          supportingPics: (data.supportingPics || []).map((url) => ({
            file: null,
            preview: url
          }))
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
      <p className={styles.subTitle}>Be yourself. The right people notice.</p>

      <ProfilePicture
        photo={profileData.profilePic}
        onChange={handleProfilePicChange}
      />

      <ProfileDetails
        profileData={profileData}
        onChange={handleChange}
      />

      <SupportingPhotos
        photos={profileData.supportingPics}
        onChange={handleSupportingPhotosChange}
      />

      <button
        className={styles.saveBtn}
        onClick={() => handleSave(profileData, setError)}
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
