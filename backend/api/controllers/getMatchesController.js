import { getMatchesService } from "../services/getMatches.js";

export const getMatchesController = async (userId) => {
  return await getMatchesService(userId);
};
