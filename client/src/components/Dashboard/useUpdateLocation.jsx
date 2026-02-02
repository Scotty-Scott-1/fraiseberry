import { useEffect } from "react";
import { useAuth } from "../Security/authContext";

export const useUpdateLocation = () => {
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    const alreadyUpdated = sessionStorage.getItem("locationUpdated");
    if (alreadyUpdated) return;

    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not available in this browser");
      return;
    }

    const getCurrentPositionAsync = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
        });
      });

    const updateLocation = async (coords) => {
      try {
        await fetch("/api/profile/location", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            latitude: coords.latitude,
            longitude: coords.longitude,
          }),
        });

        sessionStorage.setItem("locationUpdated", "true");
        console.log("Location updated successfully");
      } catch (err) {
        console.error("Location update failed:", err);
      }
    };

    const handleLocation = async () => {
      try {
        const position = await getCurrentPositionAsync();
        const { coords } = position;
        await updateLocation(coords);
      } catch (err) {
        console.warn("User denied or geolocation unavailable", err);
      }
    };

    handleLocation();
  }, [accessToken]);
};
