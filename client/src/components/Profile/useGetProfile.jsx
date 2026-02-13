import { useAuth } from "../Security/authContext";
import { useApiCall } from "../../services/useApiCall";

export const useGetProfile = () => {
  const { accessToken } = useAuth();
  const { apiCall } = useApiCall();

  const getProfile = async () => {
    const res = await apiCall("/api/profile", {});

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    return data;
  };

  return { getProfile };
};
