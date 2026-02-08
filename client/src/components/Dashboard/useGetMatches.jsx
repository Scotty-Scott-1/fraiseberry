// src/hooks/useGetMatches.js
import { useEffect, useState } from "react";
import { useAuth } from "../Security/authContext";

export const useGetMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/matches", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

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
