import { Profile } from "../../database/models/index.js";

export const getProfileHandler = async (req, res) => {
  try {
	if (!req.userId) {
	  return res.status(401).json({ message: "Unauthorized" });
	}

	 const profile = await Profile.findOne({
		where: { userId: req.userId },
	  });
	return res.status(200).json({
		name: profile.name,
		age: profile.age,
		gender: profile.gender,
		bio: profile.bio
	});
  } catch (err) {
	console.error("Profile update failed:", err);
	return res.status(500).json({ message: "Profile not found" });
  }
};
