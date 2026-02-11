import { getAllConversationsController } from "../controllers/getAllConversationsController.js";

export const getAllConversationsHandler = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await getAllConversationsController(userId);
    console.log(data);

    return res.json(data);
  } catch (err) {
    console.error("Failed to load conversations:", err);
    return res.status(500).json({ message: "Failed to load conversations" });
  }
};
