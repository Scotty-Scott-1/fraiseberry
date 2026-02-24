import { getMatchesService } from "../services/getMatches.js";
import { addDistanceToMatchesService } from "../services/addDistanceToMatches.js";
import { getProfileByIdService } from "../services/getProfileById.js";

export const getMatchesController = async (userId) => {
  const matches = await getMatchesService(userId);
  const user = await getProfileByIdService(userId);

  const name = user?.name || "";

  const matchesWithDistance = await addDistanceToMatchesService(
    userId,
    matches
  );

  return {
    name,
    matches: matchesWithDistance
  };
};
