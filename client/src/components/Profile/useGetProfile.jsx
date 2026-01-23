import { useAuth } from "../Security/authContext";

export const useGetProfile = () => {
  const { accessToken } = useAuth();

  const getProfile = async (setProfileData) => {
    const res = await fetch("/api/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    return data;
  };

  return { getProfile };
};
