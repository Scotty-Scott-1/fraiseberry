import { Conversation, Match, Like } from "../../database/models/index.js";
import { Op } from "sequelize";

export const deleteConversationAndMatch = async (conversationId) => {
  try {
    // Find the conversation to get userAId and userBId
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation) {
      console.warn(`Conversation ${conversationId} not found.`);
      return null;
    }

    const { userAId, userBId } = conversation;

    // Delete the conversation (cascades will handle related messages)
    await Conversation.destroy({
      where: { id: conversationId },
    });

    // Delete the match record if it exists
    await Match.destroy({
      where: {
        [Op.or]: [
          { userAId, userBId },
          { userAId: userBId, userBId: userAId },
        ],
      },
    });

    // Delete likes from both directions (userA liked userB, or userB liked userA)
    await Like.destroy({
      where: {
        [Op.or]: [
          { likerId: userAId, likedId: userBId },
          { likerId: userBId, likedId: userAId },
        ],
      },
    });

    console.log(`✅ Deleted conversation ${conversationId} and associated match/likes for users ${userAId} and ${userBId}`);
    return { conversationId, userAId, userBId };
  } catch (err) {
    console.error("deleteConversationAndMatch error:", err);
    throw err;
  }
};

export default deleteConversationAndMatch;
