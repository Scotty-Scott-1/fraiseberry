import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

export const Preferences = sequelize.define(
  "Preferences",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    preferredGender: {
      type: DataTypes.ENUM("male", "female", "non-binary", "any"),
      allowNull: true,
      defaultValue: "any",
    },
    ageRangeMin: { type: DataTypes.INTEGER, allowNull: true },
    ageRangeMax: { type: DataTypes.INTEGER, allowNull: true },
    maxDistanceKm: { type: DataTypes.INTEGER, allowNull: true },
    interests: { type: DataTypes.TEXT, allowNull: true },
  },
  { timestamps: true }
);
console.log("✅ [MariaDB]: Preferences model defined");
