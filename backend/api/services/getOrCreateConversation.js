import { Conversation } from "../../database/models/index.js";

export const getOrCreateConversationService = async (userId, otherUserId) => {
  const [a, b] = userId < otherUserId
    ? [userId, otherUserId]
    : [otherUserId, userId];

  let convo = await Conversation.findOne({
    where: { userAId: a, userBId: b }
  });

  if (!convo) {
    convo = await Conversation.create({ userAId: a, userBId: b });
  }

  return convo;
};
