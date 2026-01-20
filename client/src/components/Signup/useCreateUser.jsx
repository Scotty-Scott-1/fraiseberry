import { useState } from "react";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createUser = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unknown error");
      }

      return data;

    } catch (err) {
      setError(err.message || "Network error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};

