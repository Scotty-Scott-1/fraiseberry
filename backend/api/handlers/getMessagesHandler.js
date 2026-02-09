import { getMessagesService } from "../services/getMessagesService.js";

export const getMessagesHandler = async (req, res) => {
  try {
    const conversationId = Number(req.params.conversationId);

    const messages = await getMessagesService(conversationId);

    return res.json(messages);
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    return res.status(500).json({ message: "Failed to fetch messages" });
  }
};
