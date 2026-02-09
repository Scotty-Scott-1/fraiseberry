import { Message } from "../../database/models/index.js";

export const sendMessageService = async (conversationId, senderId, content) => {
  return Message.create({
    conversationId,
    senderId,
    content,
  });
};
