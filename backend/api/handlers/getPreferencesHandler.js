import { Preferences } from "../../database/models/index.js";

export const getPreferencesHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.userId;

    let preferences = await Preferences.findOne({ where: { userId } });
    if (!preferences) return res.status(404).json({ message: "Preferences not found"});

    const { preferredGender, ageRangeMin, ageRangeMax, maxDistanceKm } = preferences;

    return res.status(200).json({
      preferredGender,
      ageRangeMin,
      ageRangeMax,
      maxDistanceKm
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
