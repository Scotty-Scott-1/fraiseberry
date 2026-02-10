import { getChatBootstrapController } from "../controllers/getChatBootstrapController.js";

export const getChatBootstrapHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const otherUserId = Number(req.params.otherUserId);

    if (!otherUserId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const data = await getChatBootstrapController(userId, otherUserId);

    return res.json(data);
  } catch (err) {
    console.error("Chat bootstrap failed:", err);
    return res.status(500).json({ message: "Failed to load chat" });
  }
};
