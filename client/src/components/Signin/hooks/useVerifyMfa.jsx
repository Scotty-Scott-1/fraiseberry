import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Security/authContext";

export const useVerifyMfa = ({ mfaCode, setError }) => {
  const navigate = useNavigate();
  const { login, tempMfaToken, clearTempMfaToken } = useAuth();

  const verifyMfa = async () => {
    try {
      if (!mfaCode) {
        setError("Please enter your MFA code");
        return;
      }
      // MFA verification during login doesn't use an access token,
      // so use a direct fetch request.
      const res = await fetch("/api/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          tempToken: tempMfaToken,
          token: mfaCode,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        if (data.accessToken) {
          login(data.accessToken);
        }

        clearTempMfaToken();
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid MFA code");
      }
    } catch (err) {
      console.error("Error verifying MFA code:", err);
      setError("An error occurred while verifying MFA code");
    }
  };

  return { verifyMfa };
};
