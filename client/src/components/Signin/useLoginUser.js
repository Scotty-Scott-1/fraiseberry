import { useState } from "react";
import { useAuth } from "../Security/authContext";

export const useLoginUser = () => {
  const { login, setTempMfaToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials)
      });
      const data = await res.json();

      if (res.status === 400) {
        setError(data.message);
        return { status: 400, message: data.message };
      }

      if (res.status === 200 && data.mfaRequired === false) {
        login(data.accessToken);
        return { status: 200, message: "normal login" };
      }

      if (res.status === 200 && data.mfaRequired === true) {
        if (data.tempToken) setTempMfaToken(data.tempToken);
        return { status: 200, message: "mfa required" };
      }

      return { status: 500, message: "Unexpected response from server" };
    } catch (err) {
      setError(err.message);
      return { status: 500, message: err.message };
    } finally {
      setLoading(false);
    }
  }


  return { loginUser, loading, error };
};
