import { useState, useCallback } from "react";

export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);

  const verifyEmail = useCallback(async (token) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      const newData = {status: res.status, message: data.message }
	  return newData;

    } finally {
      setLoading(false);
    }
  }, []);

  return { verifyEmail, loading };
};
