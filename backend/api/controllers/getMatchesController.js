import { getMatchesService } from "../services/getMatches.js";
import { addDistanceToMatchesService } from "../services/addDistanceToMatches.js";

export const getMatchesController = async (userId) => {
  const matches = await getMatchesService(userId);
  return await addDistanceToMatchesService(userId, matches);
};
