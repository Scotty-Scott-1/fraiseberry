import { Op } from "sequelize";
import { Match, User, Profile } from "../../database/models/index.js";

export const getMatchesService = async (userId) => {
  // Find all matches where this user is involved
  const matches = await Match.findAll({
    where: {
      [Op.or]: [
        { userAId: userId },
        { userBId: userId }
      ]
    }
  });

  // Extract the OTHER user in each match
  const matchedUserIds = matches.map(m =>
    m.userAId === userId ? m.userBId : m.userAId
  );

  if (matchedUserIds.length === 0) return [];

  // Fetch user + profile info for each matched user
  const matchedUsers = await User.findAll({
    where: { id: matchedUserIds },
    include: [{ model: Profile, as: "profile" }]
  });

  // Format for frontend
  return matchedUsers.map(u => ({
    userId: u.id,
    name: u.profile.name,
    age: u.profile.age,
    profilePic: u.profile.profilePic
  }));
};
