// services/getAllConversationsService.js
import { Conversation, Message, User, Profile } from "../../database/models/index.js";
import { Op } from "sequelize";

export const getAllConversationsService = async (userId) => {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: [{ userAId: userId }, { userBId: userId }]
    },
    include: [
      {
        model: Message,
        as: "messages",
        separate: true,
        limit: 1,
        order: [["createdAt", "DESC"]],
      },
      {
        model: User,
        as: "userA",
        include: [{ model: Profile, as: "profile" }]
      },
      {
        model: User,
        as: "userB",
        include: [{ model: Profile, as: "profile" }]
      }
    ]
  });

  return conversations.map((c) => {
    const other = c.userAId === userId ? c.userB : c.userA;

    return {
      conversationId: c.id,
      otherUser: {
        id: other.id,
        name: other.profile?.name,
        avatar: other.profile?.profilePic
      },
      lastMessage: c.messages[0] || null
    };
  });
};
