import { getOrCreateConversationService } from "../services/getOrCreateConversation.js";

export const getOrCreateConversationHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const otherUserId = Number(req.params.otherUserId);

    if (!otherUserId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const convo = await getOrCreateConversationService(userId, otherUserId);

    return res.json({ conversationId: convo.id });
  } catch (err) {
    console.error("Conversation fetch/create failed:", err);
    return res.status(500).json({ message: "Failed to get conversation" });
  }
};
