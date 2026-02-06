import { Op } from "sequelize";
import { Profile, Preferences, User } from "../../database/models/index.js";
import { getDistance } from "geolib";

export const getDiscoverProfilesService = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      { model: Profile, as: "profile" },
      { model: Preferences, as: "preferences" }
    ]
  });

  if (!user) throw new Error("User not found")
  if (!user.profile) throw new Error("Profile not found")
  if (!user.preferences) throw new Error("Preferences not found")

  const { latitude, longitude } = user.profile;
  const prefs = user.preferences;

  const candidates = await Profile.findAll({
    where: { userId: { [Op.ne]: userId } }
  });

  const results = [];

  for (const p of candidates) {
    const distanceMeters = getDistance(
      { latitude: Number(latitude), longitude: Number(longitude) },
      { latitude: Number(p.latitude), longitude: Number(p.longitude) }
    );

    const distanceKm = distanceMeters / 1000;

    // Gender filter
    if (prefs.preferredGender !== "any" && p.gender !== prefs.preferredGender)
      continue;

    // Age filters
    if (prefs.ageRangeMin && p.age < prefs.ageRangeMin) continue;
    if (prefs.ageRangeMax && p.age > prefs.ageRangeMax) continue;

    // Distance filter
    if (prefs.maxDistanceKm) {
      const tooFar = distanceKm > prefs.maxDistanceKm;
      if (tooFar) continue;
    }

    results.push({
      ...p.toJSON(),
      distanceKm: Number(distanceKm.toFixed(1))
    });
  }

  return results;
};
