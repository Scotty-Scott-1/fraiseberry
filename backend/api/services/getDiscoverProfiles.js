import { Op } from "sequelize";
import { Profile, Preferences, User, Like, Match } from "../../database/models/index.js";
import { getDistance } from "geolib";

export const getDiscoverProfilesService = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      { model: Profile, as: "profile" },
      { model: Preferences, as: "preferences" }
    ]
  });

  if (!user) throw new Error("User not found");
  if (!user.profile) throw new Error("Profile not found");
  if (!user.preferences) throw new Error("Preferences not found");

  const { latitude, longitude } = user.profile;
  const prefs = user.preferences;

  const likedUsers = await Like.findAll({
    where: { likerId: userId },
    attributes: ["likedId"]
  });

  const likedIds = likedUsers.map(l => l.likedId);

  const matches = await Match.findAll({
    where: {
      [Op.or]: [
        { userAId: userId },
        { userBId: userId }
      ]
    }
  });

  const matchedIds = matches.map(m =>
    m.userAId === userId ? m.userBId : m.userAId
  );


  const excludedIds = [...likedIds, ...matchedIds];


  const candidates = await Profile.findAll({
    where: {
      userId: {
        [Op.ne]: userId,
        [Op.notIn]: excludedIds
      }
    }
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
    if (prefs.maxDistanceKm && distanceKm > prefs.maxDistanceKm) continue;

    results.push({
      ...p.toJSON(),
      distanceKm: Number(distanceKm.toFixed(1))
    });
  }

  return results;
};
