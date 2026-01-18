import { useState } from "react";

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);

  const loginUser = async (credentials) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
};
