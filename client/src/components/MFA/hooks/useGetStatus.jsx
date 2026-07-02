import { useEffect } from "react";
import { useApiCall } from "../../../services/useApiCall";

export const useGetStatus = (setMfaEnabled) => {
  const { apiCall } = useApiCall();

  useEffect(() => {
    const fetchMfaStatus = async () => {
      try {
        const res = await apiCall("/api/mfa/status", {
          method: "GET",
        });

        if (res.status === 200) {
          const data = await res.json();
          setMfaEnabled(!!data.mfaEnabled);
        }
      } catch (err) {
        console.error("Error fetching MFA status:", err);
      }
    };

    fetchMfaStatus();
  }, [apiCall, setMfaEnabled]);
};
