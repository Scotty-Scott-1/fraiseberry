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

  // Update conversation timestamps and increment botMessageCount if bot message
  try {
    const updateData = {
      lastMessageAt: new Date(),
      ...(isBot && { lastBotNudgeAt: new Date() }),
    };

    if (isBot) {
      await Conversation.increment("botMessageCount", {
        where: { id: conversationId },
      });
    }

    await Conversation.update(updateData, {
      where: { id: conversationId },
    });
  } catch (err) {
    console.error(`Failed to update conversation ${conversationId}:`, err);
  }

  return message;
};
