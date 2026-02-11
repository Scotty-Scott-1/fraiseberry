import { Profile } from "../../database/models/index.js";

export const updateProfileCoordsHandler = async (req, res) => {

  try {
	if (!req.userId) {
	  return res.status(401).json({ message: "Unauthorized" });
	}


	const userId = req.userId;

	const profile = await Profile.findOne({ where: { userId } });
	if (!profile) {
	  return res.status(404).json({ message: "Profile not found" });
	}

	profile.latitude = req.body.latitude;
	profile.longitude = req.body.longitude;

	await profile.save()

	return res.status(200).json({ message: "co ordinates updated"});
  } catch (err) {
	console.error("co ordinates update failed:", err);
	return res.status(500).json({ message: "Failed to update co ordinates" });
  }
};
