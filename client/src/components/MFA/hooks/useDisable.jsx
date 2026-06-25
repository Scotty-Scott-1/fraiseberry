export const useDisable = ({
  apiCall,
  setMfaEnabled,
  setMessage,
  setQrCode,
  setSecret,
  setMfaCode
}) => {
  const disable = async () => {
    try {
      const res = await apiCall("/api/mfa/disable", {
        method: "POST",
      });

      const data = await res.json();

      if (res.status === 200) {
        setMfaEnabled(false);
        setMessage("MFA disabled.");
        setQrCode("");
        setSecret(null);
        setMfaCode("");
      } else {
        setMessage(data.message || "Failed to disable MFA.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to disable MFA.");
    }
  };

  return { disable };
};
