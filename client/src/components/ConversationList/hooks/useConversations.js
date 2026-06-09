import { useEffect, useState } from "react";
import { useApiCall } from "../../../services/useApiCall";

export const useConversations = (accessToken) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { apiCall } = useApiCall();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);

        const res = await apiCall("/api/conversations", {});
        const data = await res.json();

        setConversations(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) fetchConversations();
  }, [accessToken]);

  return { conversations, loading, error };
};
