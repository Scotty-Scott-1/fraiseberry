import { useState } from "react";
import { useAuth } from "../Security/authContext";

export const useLike = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();

  const likeUser = async (likedId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/like/${likedId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      return data; // { success, matched }
    } catch (err) {
      setError("Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { likeUser, loading, error };
};
