import { Op } from "sequelize";
import { Profile, Preferences, User, Like, Match } from "../../database/models/index.js";
import { getDistance } from "geolib";

export const getDiscoverProfilesService = async (userId) => {

  // Fetch User and user profile
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

  // Get the id of users that current user has already liked
  const likedUsers = await Like.findAll({
    where: { likerId: userId },
    attributes: ["likedId"]
  });

  const likedIds = likedUsers.map(l => l.likedId);

  // Get the id of users that current user has already matched with
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

  // combine the ids of already liked users and already matched users in one array
  const excludedIds = [...likedIds, ...matchedIds];

  // gets profiles from the database
  // excludes the current users ID
  // if the exclusion list is non-empty exlude these IDs
  // store that returned data in const: candidates
  const candidates = await Profile.findAll({
    where: {
      userId: {
        [Op.ne]: userId,
        ...(excludedIds.length && {
          [Op.notIn]: excludedIds
        })
      }
    }
  });

  // declare empty array for results
  const results = [];

  // iterate over candidates
  for (const p of candidates) {

    // get the distance between current user and iterated profile in km
    const distanceMeters = getDistance(
      {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      {
        latitude: Number(p.latitude),
        longitude: Number(p.longitude)
      }
    );
    const distanceKm = distanceMeters / 1000;

    // if this users max distance preference is not null
    // and distanceKm calulated above is more that current users preference
    // skip this interation and move on the next one.
    if (
      prefs.maxDistanceKm &&
      distanceKm > prefs.maxDistanceKm
    ) continue;

    // if the current users gender prefernce is not "any"
    // and the interated profile gender does not match this users gender preference
    // skip this interation and move on the next one.
    if (
      prefs.preferredGender !== "any" &&
      p.gender !== prefs.preferredGender
    ) continue;

    // if current users min/max age preference is null
    // and the interated profile age is outside of this current users min/max age prefernce
    // skip this interation and move on the next one.
    if (prefs.ageRangeMin && p.age < prefs.ageRangeMin) continue;
    if (prefs.ageRangeMax && p.age > prefs.ageRangeMax) continue;


    // Convert Sequelize model instance to a plain JavaScript object
    const profileData = p.toJSON();

    // separate longitude and latitude from the profile data
    const {
      latitude: _lat,
      longitude: _lng,
      ...cleanProfile
    } = profileData;

    // push clean profile data to result with distance
    results.push({
      ...cleanProfile,
      distanceKm: Number(distanceKm.toFixed(1))
    });
  }

  return results;
};
