import { DataTypes, STRING, INTEGER, TEXT } from "sequelize";
import { sequelize } from "../config.js";

export const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    name: { type: STRING, allowNull: true },
    age: { type: INTEGER, allowNull: true },
    gender: {
      type: DataTypes.ENUM("male", "female", "non-binary", "other"),
      allowNull: true,
    },
    bio: { type: TEXT, allowNull: true },
  },
  { timestamps: true }
);
console.log("✅ [MariaDB]: Profile model defined");
