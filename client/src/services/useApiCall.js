import { useAuth } from "../components/Security/authContext";
import { useCallback } from "react";

export const useApiCall = () => {
  const { accessToken, setAccessToken } = useAuth();

  const apiCall = useCallback(async (url, options = {}) => {
    if (!accessToken) {
      throw new Error("No access token - please login");
    }
  
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    };
  
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
  
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  
    const newToken = response.headers.get("X-New-Access-Token");
  
    if (newToken && newToken.trim() !== "" && newToken !== accessToken) {
      console.log("apiCall wrapper assigned new access token");
      setAccessToken(newToken);
    }
  
    return response;
  }, [accessToken, setAccessToken]);

  return { apiCall };
};
