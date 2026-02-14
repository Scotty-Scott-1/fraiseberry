import { Conversation, Match, Likes } from "../../database/models/index.js";

/**
 * Delete a conversation and its associated match + likes.
 * Called when bot nudges reach a threshold (5 nudges without user engagement).
 */
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
        [require("sequelize").Op.or]: [
          { userAId, userBId },
          { userAId: userBId, userBId: userAId },
        ],
      },
    });

    // Delete likes from both directions (userA liked userB, or userB liked userA)
    await Likes.destroy({
      where: {
        [require("sequelize").Op.or]: [
          { userId: userAId, likedUserId: userBId },
          { userId: userBId, likedUserId: userAId },
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
