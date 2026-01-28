import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

export const Photo = sequelize.define(
  "Photo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Profiles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("PROFILE", "SUPPORTING"),
      allowNull: false,
      defaultValue: "SUPPORTING",
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 2,
      },
    },
  },
  {
    timestamps: true,
  }
);

console.log("✅ [MariaDB]: Photo model defined");
