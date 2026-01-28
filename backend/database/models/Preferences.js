import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { Profile } from "./index.js";

export const Preferences = sequelize.define(
  "Preferences",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Profile,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    preferredGender: {
      type: DataTypes.ENUM("male", "female", "non-binary", "any"),
      allowNull: true,
      defaultValue: "any",
    },
    ageRangeMin: { type: DataTypes.INTEGER, allowNull: true },
    ageRangeMax: { type: DataTypes.INTEGER, allowNull: true },
    maxDistanceKm: { type: DataTypes.INTEGER, allowNull: true },
  },
  { timestamps: true }
);

console.log("✅ [MariaDB]: Preferences model defined");
