import { useState } from "react";

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  const loginUser = async (credentials) => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.status === 400) {
        setError(data.message);
        return;
      }

      if (res.status === 200 && data.mfaRequired === false) {

      /*
      result contains
      message: result.message,
      accessToken: result.accessToken,
      mfaRequired: false,
      */
      }


      console.log(data);

      return;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
