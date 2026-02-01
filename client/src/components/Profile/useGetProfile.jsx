import { useAuth } from "../Security/authContext";

export const useGetProfile = () => {
  const { accessToken } = useAuth();

  const getProfile = async () => {
    const res = await fetch("/api/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    return data;
  };

  return { getProfile };
};
