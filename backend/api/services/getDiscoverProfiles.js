import { Op, literal } from "sequelize";
import {
  Profile,
  Preferences,
  User,
  Like,
  Match
} from "../../database/models/index.js";

export const getDiscoverProfilesService = async (userId) => {

  // -----------------------------
  // Fetch user
  // -----------------------------
  const user = await User.findByPk(userId, {
    include: [
      { model: Profile, as: "profile" },
      { model: Preferences, as: "preferences" }
    ]
  });

  if (!user) {
    throw new Error("User not found");
  }

  const latitude = user.profile.latitude;
  const longitude = user.profile.longitude;
  const prefs = user.preferences;

  // -----------------------------
  // Get liked users
  // -----------------------------
  const likedUsers = await Like.findAll({
    where: { likerId: userId },
    attributes: ["likedId"]
  });

  const likedIds = [];
  for (const l of likedUsers) {
    likedIds.push(l.likedId);
  }

  // -----------------------------
  // Get matches
  // -----------------------------
  const matches = await Match.findAll({
    where: {
      [Op.or]: [
        { userAId: userId },
        { userBId: userId }
      ]
    }
  });

  const matchedIds = [];

  for (const m of matches) {
    if (m.userAId === userId) {
      matchedIds.push(m.userBId);
    } else {
      matchedIds.push(m.userAId);
    }
  }

  // -----------------------------
  // Build exclusion list
  // -----------------------------
  const excludedIds = [];

  for (const id of likedIds) {
    excludedIds.push(id);
  }

  for (const id of matchedIds) {
    excludedIds.push(id);
  }

  // -----------------------------
  // Build WHERE
  // -----------------------------
  const where = {
    userId: {
      [Op.ne]: userId
    },

    age: {
      [Op.gte]: prefs.ageRangeMin,
      [Op.lte]: prefs.ageRangeMax
    },

    [Op.and]: [
      literal(`
        ROUND(
          ST_Distance_Sphere(
            point(longitude, latitude),
            point(${longitude}, ${latitude})
          ) / 1000
        ) <= ${prefs.maxDistanceKm}
      `)
    ]
  };

  if (excludedIds.length > 0) {
    where.userId[Op.notIn] = excludedIds;
  }

  if (prefs.preferredGender !== "any") {
    where.gender = prefs.preferredGender;
  }

  // -----------------------------
  // Query DB (random 20 profiles)
  // -----------------------------
  const candidates = await Profile.findAll({
    attributes: {
      exclude: ["latitude", "longitude"],
      include: [
        [
          literal(`
            ROUND(
              ST_Distance_Sphere(
                point(longitude, latitude),
                point(${longitude}, ${latitude})
              ) / 1000
            )
          `),
          "distanceKm"
        ]
      ]
    },

    where,

    order: literal("RAND()"),

    limit: 20
  });

  // -----------------------------
  // Return results
  // -----------------------------
  const results = [];

  for (const p of candidates) {
    results.push(p.toJSON());
  }

  return results;
};
