import { useEffect } from "react";

export const useUpdateLocation = (accessToken) => {

  useEffect(() => {
    if (!accessToken) {
      console.log("Token not ready yet");
      return;
    }

    console.log("Token ready, trying to get location");

    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not available in this browser");
      return;
    }

    const getCurrentPositionAsync = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
        });
      });

    const updateLocation = async (coords) => {
      try {
        console.log("Sending location update to backend...");

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
