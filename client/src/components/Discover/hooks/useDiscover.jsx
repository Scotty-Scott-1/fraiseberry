import { useState } from "react";
import { useGetProfiles } from "./useGetProfiles";
import { useLike } from "./useLike";
import { toast } from "react-toastify";

export const useDiscover = () => {

  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const { loading, refetch } = useGetProfiles(setProfiles);
  const { likeUser, loading: likeLoading, error } = useLike();

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

  // -----------------------------
  // PHOTO NAVIGATION
  // -----------------------------
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev >= photos.length - 1 ? prev : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev <= 0 ? prev : prev - 1
    );
  };

  // -----------------------------
  // PROFILE ACTION
  // -----------------------------
  const handleAction = async (action) => {
    if (!profile) return;

    if (action === "like") {
      const result = await likeUser(profile.userId);

      if (result?.matched) {
        toast.success(`🔥 It's a match with ${profile.name}!`, {
          position: "bottom-center",
          autoClose: 5000
        });
      }
    }

    const nextIndex = currentIndex + 1;

    // -----------------------------
    // END OF BATCH → REFRESH
    // -----------------------------
    if (nextIndex >= profiles.length) {
      await refetch();      // fetch new 20
      setCurrentIndex(0);   // reset feed
    } else {
      setCurrentIndex(nextIndex);
    }

    setCurrentPhotoIndex(0);
  };

  const hasMore = profiles.length > 0;

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
