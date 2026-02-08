import { getMatchesController } from "../controllers/getMatchesController.js";

export const getMatchesHandler = async (req, res) => {
  try {
    const userId = req.userId;

    const matches = await getMatchesController(userId);

    res.json({ matches });
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};
