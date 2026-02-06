import { getDiscoverProfilesController } from "../controllers/discoverProfiles/getDiscoverProfilesController.js";

export const getDiscoverProfilesHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const profiles = await getDiscoverProfilesController(userId);

    res.status(200).json({ profiles });
  } catch (err) {
    console.error("Discover handler error:", err);
    res.status(500).json({ error: "Failed to load profiles" });
  }
};
