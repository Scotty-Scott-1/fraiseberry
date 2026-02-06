// src/hooks/useProfiles.js
import { useEffect, useState } from "react";
import { useAuth } from "../Security/authContext";

export const useGetProfiles = (setProfiles) => {
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("/api/discover", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

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
