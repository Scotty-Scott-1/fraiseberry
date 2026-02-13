// src/hooks/useGetMatches.js
import { useEffect, useState } from "react";
import { useAuth } from "../Security/authContext";
import { useApiCall } from "../../services/useApiCall";

export const useGetMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const { apiCall } = useApiCall();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await apiCall("/api/matches", {});

        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        console.error("Failed to fetch matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading };
};
