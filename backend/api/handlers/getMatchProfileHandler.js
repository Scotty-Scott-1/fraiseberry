import { Op } from "sequelize";
import { Profile, Match } from "../../database/models/index.js";
import { getDistance } from "geolib";

export const getMatchProfileHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUserId = Number(req.userId);
    const profileUserId = Number(req.params.profileUserId);

    if (currentUserId === profileUserId) {
      return res.status(400).json({ message: "Invalid profile request" });
    }

    // Check if match exists
    const existingMatch = await Match.findOne({
      where: {
        [Op.or]: [
          { userAId: currentUserId, userBId: profileUserId },
          { userAId: profileUserId, userBId: currentUserId },
        ],
      },
    });

    if (!existingMatch) {
      return res.status(403).json({ message: "Access denied. No match found." });
    }

    // Fetch both profiles
    const [currentUserProfile, profile] = await Promise.all([
      Profile.findOne({ where: { userId: currentUserId } }),
      Profile.findOne({ where: { userId: profileUserId } }),
    ]);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    let distanceKm = null;

    if (
      currentUserProfile?.latitude &&
      currentUserProfile?.longitude &&
      profile.latitude &&
      profile.longitude
    ) {
      const distanceMeters = getDistance(
        {
          latitude: Number(currentUserProfile.latitude),
          longitude: Number(currentUserProfile.longitude),
        },
        {
          latitude: Number(profile.latitude),
          longitude: Number(profile.longitude),
        }
      );

      distanceKm = Number((distanceMeters / 1000).toFixed(1));
    }

    return res.status(200).json({
      userId: profile.userId,
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      bio: profile.bio,
      profilePic: profile.profilePic || null,
      supportingPic1: profile.supportingPic1 || null,
      supportingPic2: profile.supportingPic2 || null,
      supportingPic3: profile.supportingPic3 || null,
      distanceKm,
    });

  } catch (err) {
    console.error("Get profile failed:", err);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};
