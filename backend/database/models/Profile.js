import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../config.js";

export const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    gender: {
      type: DataTypes.ENUM("male", "female", "non-binary", "other"),
      allowNull: true,
    },
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    profilePics: { type: STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
  },
  { timestamps: true }
);
console.log("✅ [MariaDB]: Profile model defined");
