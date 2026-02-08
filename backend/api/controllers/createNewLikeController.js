import { createNewLikeService } from "../services/createNewLike.js";

export const createNewLikeController = async (likerId, likedId) => {
  const result = await createNewLikeService(likerId, likedId);

  return {
    matched: result.matched
  };
};
