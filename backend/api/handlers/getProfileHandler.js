import { Profile, Photo } from "../../database/models/index.js";

export const getProfileHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await Profile.findOne({
      where: { userId: req.userId },
      include: [
        {
          model: Photo,
          as: "photos",
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const profilePic = profile.photos.find(
      (p) => p.type === "PROFILE"
    );

    const supportingPics = profile.photos
      .filter((p) => p.type === "SUPPORTING")
      .sort((a, b) => a.position - b.position)
      .map((p) => p.url);

    return res.status(200).json({
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      bio: profile.bio,
      profilePic: profilePic ? profilePic.url : null,
      supportingPics,
    });
  } catch (err) {
    console.error("Get profile failed:", err);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};
