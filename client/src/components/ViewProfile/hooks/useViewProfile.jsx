import { useState, useEffect, useMemo } from "react";
import { useGetProfile } from "./useGetProfile";

export const useViewProfile = (otherUserId) => {

  // React state vars
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  console.log("index: ", currentPhotoIndex);

  /*
  Custom hooks:
  - useGetProfiles: fetches discover profiles on mount and updates state via setProfiles; returns loading state.
  - useLike: provides likeUser function to trigger like requests and exposes loading and error states for that action.
  */
  const { profile, loading } = useGetProfile(otherUserId);

  // Derived Data

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

  return {
    loading,
    profile,
    photos,
    currentPhotoIndex,
    nextPhoto,
    prevPhoto,
  };
};
