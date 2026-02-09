import { User, Profile } from "../../database/models/index.js";
import { getDistance } from "geolib";

export const addDistanceToMatchesService = async (userId, matchesArray) => {
  if (!matchesArray.length) return [];

  // Get current user's coordinates
  const currentUser = await User.findByPk(userId, {
    include: [{ model: Profile, as: "profile" }]
  });

  if (!currentUser || !currentUser.profile)
    throw new Error("User profile not found");

  const { latitude, longitude } = currentUser.profile;

  // Enrich each match with distance
  const enriched = [];

  for (const match of matchesArray) {
    const matchedUser = await User.findByPk(match.userId, {
      include: [{ model: Profile, as: "profile" }]
    });

    if (!matchedUser || !matchedUser.profile) {
      enriched.push({ ...match, distance: null });
      continue;
    }

    const distanceMeters = getDistance(
      { latitude: Number(latitude), longitude: Number(longitude) },
      {
        latitude: Number(matchedUser.profile.latitude),
        longitude: Number(matchedUser.profile.longitude)
      }
    );

    const distanceKm = distanceMeters / 1000;

    enriched.push({
      ...match,
      distanceKm: Number(distanceKm.toFixed(1))
    });
  }

  return enriched;
};
