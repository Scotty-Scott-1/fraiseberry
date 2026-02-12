import { Message, Conversation } from "../../database/models/index.js";

export const sendMessageService = async (
  conversationId,
  senderId,
  content,
  isBot = false
) => {
  const message = await Message.create({
    conversationId,
    senderId,
    content,
    isBot,
  });

  // Update conversation timestamps
  try {
    await Conversation.update(
      { lastMessageAt: new Date(), ...(isBot ? { lastBotNudgeAt: new Date() } : {}) },
      { where: { id: conversationId } }
    );
  } catch (err) {
    console.error("Failed to update conversation timestamps:", err);
  }

  return message;
};
