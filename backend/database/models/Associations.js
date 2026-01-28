import { User, Profile, Preferences, Photo } from "./index.js";

export const associateModels = async () => {
  User.hasOne(Profile, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
    hooks: true,
  });
  Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

  User.hasOne(Preferences, {
    foreignKey: "userId",
    as: "preferences",
    onDelete: "CASCADE",
    hooks: true,
  });
  Preferences.belongsTo(User, { foreignKey: "userId", as: "user" });


Profile.hasMany(Photo, {
  foreignKey: "profileId",
  as: "photos",
  onDelete: "CASCADE",
  hooks: true,
});
Photo.belongsTo(Profile, { foreignKey: "profileId", as: "profile" });

};
