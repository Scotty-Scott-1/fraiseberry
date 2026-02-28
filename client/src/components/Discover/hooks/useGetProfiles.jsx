// src/hooks/useProfiles.js
import { useEffect, useState } from "react";
import { useApiCall } from "../../../services/useApiCall";

export const useGetProfiles = (setProfiles) => {
  const [loading, setLoading] = useState(true);
  const { apiCall } = useApiCall();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await apiCall("/api/discover", {});

        const data = await res.json();
        setProfiles(data.profiles || []);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return { loading };
};
