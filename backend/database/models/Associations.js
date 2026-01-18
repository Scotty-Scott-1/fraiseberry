import { User } from "./User.js";
import { Profile } from "./Profile.js";
import { Preferences } from "./Preferences.js";

export const associateModels = async () => {
  // User ↔ Profile
  User.hasOne(Profile, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
    hooks: true,
  });
  Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

  // User ↔ Preferences
  User.hasOne(Preferences, {
    foreignKey: "userId",
    as: "preferences",
    onDelete: "CASCADE",
    hooks: true,
  });
  Preferences.belongsTo(User, { foreignKey: "userId", as: "user" });
};
