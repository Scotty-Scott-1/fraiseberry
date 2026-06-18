import { useApiCall } from "../../../services/useApiCall";

export const useGetProfile = () => {
  const { apiCall } = useApiCall();

  const getProfile = async () => {
    const res = await apiCall("/api/profile", {});

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    return data;
  };

  return { getProfile };
};
