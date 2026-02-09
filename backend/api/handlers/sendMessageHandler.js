import { sendMessageService } from "../services/sendMessageService.js";

export const sendMessageHandler = async (req, res) => {
  try {
    const senderId = req.userId;
    const { conversationId, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Message content required" });
    }

    const message = await sendMessageService(conversationId, senderId, content);

    return res.status(201).json(message);
  } catch (err) {
    console.error("Failed to send message:", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
};
