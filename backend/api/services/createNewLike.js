import { Like, Match } from "../../database/models/index.js";

export const createNewLikeService = async (likerId, likedId) => {
  // 1. Insert the like (directional)
  await Like.create({ likerId, likedId });

  // 2. Check if the other user already liked this user
  const mutual = await Like.findOne({
    where: { likerId: likedId, likedId: likerId }
  });

  // 3. If mutual, create a match
  if (mutual) {
    const userAId = Math.min(likerId, likedId);
    const userBId = Math.max(likerId, likedId);

    await Match.create({ userAId, userBId });

    return { matched: true };
  }

  // 4. If not mutual, return false
  return { matched: false };
};
