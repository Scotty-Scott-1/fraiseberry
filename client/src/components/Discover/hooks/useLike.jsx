import { useState } from "react";
import { useApiCall } from "../../../services/useApiCall";


export const useLike = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { apiCall } = useApiCall();

  const likeUser = async (likedId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiCall(`/api/like/${likedId}`, {
        method: "POST",
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
