import { Message, User } from "../../database/models/index.js";

export const getMessagesService = async (conversationId) => {
  return Message.findAll({
    where: { conversationId },
    include: [
      {
        model: User,
        as: "sender",
        attributes: ["id"]
      }
    ],
    order: [["createdAt", "ASC"]],
  });
};
