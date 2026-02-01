import { Preferences } from "../../database/models/index.js";
import { createPreferencesService } from "../services/createNewPreferences.js";

export const updatePreferencesHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.userId;

    let preferences = await Preferences.findOne({ where: { userId } });
    if (!preferences) {
      preferences = await createPreferencesService(userId);
    }

    preferences.preferredGender = req.body.preferredGender;
    preferences.ageRangeMin = req.body.ageRangeMin;
    preferences.ageRangeMax = req.body.ageRangeMax;
    preferences.maxDistanceKm = req.body.maxDistanceKm;
    await preferences.save()

    return res.status(200).json({ message: "preferences updated"});
  } catch (err) {
    console.error("Preferences update failed:", err);
    return res.status(500).json({ message: "Failed to update preferences" });
  }
};
