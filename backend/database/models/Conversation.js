import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../config.js";

export const Conversation = sequelize.define(
  "Conversation",
  {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },

    userAId: {
      type: INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    userBId: {
      type: INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    lastMessageAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastBotNudgeAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    botMessageCount: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userAId", "userBId"],
      },
    ],
  }
);

console.log("✅ [MariaDB]: Conversation model defined");
