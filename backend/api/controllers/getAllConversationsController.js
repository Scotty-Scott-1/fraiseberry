// controllers/getAllConversationsController.js
import { getAllConversationsService } from "../services/getAllConversationsService.js";

export const getAllConversationsController = async (userId) => {
  return await getAllConversationsService(userId);
};
