import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { User } from "./index.js";

export const Match = sequelize.define(
  "Match",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    userAId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    userBId: {
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
        fields: ["userAId", "userBId"], // prevents duplicate matches
      },
    ],
  }
);

console.log("✅ [MariaDB]: Match model defined");
