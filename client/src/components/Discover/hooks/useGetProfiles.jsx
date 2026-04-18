// src/hooks/useProfiles.js
import { useEffect, useState } from "react";
import { useApiCall } from "../../../services/useApiCall";

export const useGetProfiles = (setProfiles) => {
  const [loading, setLoading] = useState(true);
  const { apiCall } = useApiCall();

  const fetchProfiles = async () => {
    setLoading(true);

    try {
      const res = await apiCall("/api/discover", {});
      const data = await res.json();

      setProfiles(data.profiles || []);
    } catch (err) {
      console.error("Failed to fetch profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return {
    loading,
    refetch: fetchProfiles
  };
};
