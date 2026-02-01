import { Profile } from "../../database/models/index.js";

export const getProfileHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await Profile.findOne({
      where: { userId: req.userId },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      bio: profile.bio,
      profilePic: profile.profilePic || null,
      supportingPic1: profile.supportingPic1 || null,
      supportingPic2: profile.supportingPic2 || null,
      supportingPic3: profile.supportingPic3 || null,
    });
  } catch (err) {
    console.error("Get profile failed:", err);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};
