import { useState } from "react";
import { useAuth } from "../Security/authContext";

export const useLoginUser = () => {
  const { login, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (credentials) => {
    setLoading(true);

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
        throw new Error(data.message);
      }

      if (res.status === 200 && data.mfaRequired === false) {
        login(data.accessToken);
        return {status: 200, message: "normal login"};
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }


  return { loginUser, loading, error };
};
