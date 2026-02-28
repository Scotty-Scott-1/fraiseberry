import { useState } from "react";
import { useGetProfiles } from "./useGetProfiles";
import { useLike } from "./useLike";

export const useDiscover = () => {

  // React state vars
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  /*
  Custom hooks:
  - useGetProfiles: fetches discover profiles on mount and updates state via setProfiles; returns loading state.
  - useLike: provides likeUser function to trigger like requests and exposes loading and error states for that action.
  */
  const { loading } = useGetProfiles(setProfiles);
  const { likeUser, loading: likeLoading, error } = useLike();

  // Derived Data
  const profile = profiles[currentIndex];

  let photos = [];

  if (profile) {
    const rawPhotos = [
      profile.profilePic,
      profile.supportingPic1,
      profile.supportingPic2,
      profile.supportingPic3,
    ];

    photos = rawPhotos.filter(Boolean);
  }

  // Photo Navigation
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => {
      if (prev >= photos.length - 1) {
        return prev;
      }

      return prev + 1;
    });
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => {
      if (prev <= 0) {
        return prev;
      }

      return prev - 1;
    });
  };

  // Profile Actions
  const handleAction = async (action) => {
    if (!profile) return;

    if (action === "like") {
      const result = await likeUser(profile.userId);

      if (result?.matched) {
        alert(`🔥 It's a match with ${profile.name}!`);
      }
    }

    // Move to next profile card
    setCurrentIndex((prev) => prev + 1);

    // Reset photo slider position
    setCurrentPhotoIndex(0);
  };

  // Helper
  const hasMore = currentIndex < profiles.length;

  return {
    loading,
    profile,
    photos,
    currentPhotoIndex,
    nextPhoto,
    prevPhoto,
    handleAction,
    likeLoading,
    error,
    hasMore,
  };
};
