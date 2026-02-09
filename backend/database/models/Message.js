import { DataTypes, INTEGER, TEXT } from "sequelize";
import { sequelize } from "../config.js";

export const Message = sequelize.define(
  "Message",
  {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },

    conversationId: {
      type: INTEGER,
      allowNull: false,
      references: { model: "Conversations", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    senderId: {
      type: INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    content: {
      type: TEXT,
      allowNull: false,
    },

    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

console.log("✅ [MariaDB]: Message model defined");
