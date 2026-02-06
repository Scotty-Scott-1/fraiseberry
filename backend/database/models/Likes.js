import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { User } from "./index.js";

export const Like = sequelize.define(
  "Like",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    likerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    likedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["likerId", "likedId"], // prevents duplicate likes
      },
    ],
  }
);

console.log("✅ [MariaDB]: Like model defined");
