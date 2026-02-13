import { useAuth } from "../components/Security/authContext";

export const useApiCall = () => {
  const { accessToken, setAccessToken } = useAuth();

  const apiCall = async (url, options = {}) => {
    if (!accessToken) {
      throw new Error("No access token - please login");
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    };

    // Only set Content-Type if not FormData
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    // Read header EXACTLY once
    const newToken = response.headers.get("X-New-Access-Token");

    // Hardened conditions:
    // 1. header exists
    // 2. header is non-empty
    // 3. header is different from current token
    if (newToken && newToken.trim() !== "" && newToken !== accessToken) {
      console.log("apiCall wrapper assigned new access token");
      setAccessToken(newToken);
    }

    return response;
  };

  return { apiCall };
};
