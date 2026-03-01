import { useEffect, useState } from "react";
import { useApiCall } from "../../../services/useApiCall";

export const useGetProfile = (profileUserId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { apiCall } = useApiCall();

  useEffect(() => {
    console.log("effect running");
    const fetchProfile = async () => {
      try {
        const res = await apiCall(
          `/api/match/profile/${profileUserId}`,
          {}
        );

        const data = await res.json();

        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (profileUserId) {
      fetchProfile();
    }
  }, [profileUserId]);

  return { profile, loading };
};
