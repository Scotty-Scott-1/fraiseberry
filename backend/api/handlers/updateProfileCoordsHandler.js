import { Profile } from "../../database/models/index.js";
import { createProfileService } from "../services/createNewProfile.js";

export const updateProfileCoordsHandler = async (req, res) => {
  try {
	if (!req.userId) {
	  return res.status(401).json({ message: "Unauthorized" });
	}

	const userId = req.userId;

	let profile = await Profile.findOne({ where: { userId } });
	if (!profile) {
	  profile = await createProfileService(userId);
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
