import { User, Profile, Preferences, Like, Match, Message, Conversation } from "./index.js";

export const associateModels = async () => {
  // Profile
  User.hasOne(Profile, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
    hooks: true,
  });
  Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

  // Preferences
  User.hasOne(Preferences, {
    foreignKey: "userId",
    as: "preferences",
    onDelete: "CASCADE",
    hooks: true,
  });
  Preferences.belongsTo(User, { foreignKey: "userId", as: "user" });

  // Likes (directional)
  User.hasMany(Like, { foreignKey: "likerId", as: "likesGiven" });
  User.hasMany(Like, { foreignKey: "likedId", as: "likesReceived" });

  Like.belongsTo(User, { foreignKey: "likerId", as: "liker" });
  Like.belongsTo(User, { foreignKey: "likedId", as: "liked" });

  // Matches (mutual)
  User.hasMany(Match, { foreignKey: "userAId", as: "matchesA" });
  User.hasMany(Match, { foreignKey: "userBId", as: "matchesB" });

  Match.belongsTo(User, { foreignKey: "userAId", as: "userA" });
  Match.belongsTo(User, { foreignKey: "userBId", as: "userB" });

  // Conversations
  User.hasMany(Conversation, { foreignKey: "userAId", as: "conversationsA" });
  User.hasMany(Conversation, { foreignKey: "userBId", as: "conversationsB" });

  Conversation.belongsTo(User, { foreignKey: "userAId", as: "userA" });
  Conversation.belongsTo(User, { foreignKey: "userBId", as: "userB" });

  // Messages
  Conversation.hasMany(Message, {
    foreignKey: "conversationId",
    as: "messages",
    onDelete: "CASCADE",
  });

  Message.belongsTo(Conversation, {
    foreignKey: "conversationId",
    as: "conversation",
  });

  Message.belongsTo(User, {
    foreignKey: "senderId",
    as: "sender",
  });


};
