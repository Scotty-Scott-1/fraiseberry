import { getOrCreateConversationService } from "../services/getOrCreateConversation.js";
import { getProfileByIdService } from "../services/getProfileById.js";
import { getMessagesService } from "../services/getMessagesService.js";

export const getChatBootstrapController = async (userId, otherUserId) => {
  // 1. Get or create conversation
  const convo = await getOrCreateConversationService(userId, otherUserId);

  // 2. Fetch other user's profile
  const otherProfile = await getProfileByIdService(otherUserId);

  // 3. Fetch messages
  const messages = await getMessagesService(convo.id);

  return {
    conversationId: convo.id,
    currentUserId: userId,
    otherUser: {
      id: otherProfile.userId,
      name: otherProfile.name,
      avatar: otherProfile.avatar || null
    },
    messages
  };
};
