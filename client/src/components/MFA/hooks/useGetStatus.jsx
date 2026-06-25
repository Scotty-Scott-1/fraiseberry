import { useEffect } from "react";

export const useGetStatus = (apiCall, setMfaEnabled) => {
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
  }, []);
};
