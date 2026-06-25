export const useSetup = ({
  setLoading,
  setQrCode,
  setSecret,
  setMessage
}) => {
  const setup = async () => {
    try {
      setLoading(true);

      const res = await apiCall("/api/mfa/setup", {
        method: "POST",
      });

      const data = await res.json();

      if (res.status === 200) {
        setQrCode(data.otpauth_url);
        setSecret(data.base32);
        setMessage(
          "Scan the QR code with your authenticator app and enter the 6-digit code below."
        );
      } else {
        setMessage(data.message || "Error generating secret");
      }
    } catch (err) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return { setup };
};
