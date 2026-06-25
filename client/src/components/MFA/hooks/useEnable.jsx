export const useEnable = ({
  apiCall,
  mfaCode,
  setMfaEnabled,
  setMessage,
  setQrCode,
  setSecret,
  setMfaCode,
}) => {
  const enable = async () => {
    try {
      if (!mfaCode) {
        setMessage("Please enter the code");
        return;
      }

      const res = await apiCall("/api/mfa/enable", {
        method: "POST",
        body: JSON.stringify({ token: mfaCode }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setMfaEnabled(true);
        setMessage("MFA enabled successfully!");
        setQrCode("");
        setSecret(null);
        setMfaCode("");
      } else {
        setMessage(data.message || "Invalid code");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return { enable };
};
