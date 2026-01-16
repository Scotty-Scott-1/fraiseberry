// initDB.js
import { sequelize } from "./connect.js";
import { User } from "./models/User.js";

export const initDB = async () => {
  // Step 1: Connect to the database
  try {
    await sequelize.authenticate();
    console.log("✅ [MariaDB]: Database connection established.");
  } catch (err) {
    console.error("❌ [MariaDB]: Failed to connect to the database.");
    throw err;
  }

  // Step 2: Sync models
  try {
    await User.sync({ alter: true });
    console.log("✅ [MariaDB]: User model synced successfully");
  } catch (err) {
    console.error("❌ [MariaDB]: Failed to sync User model.");
    throw err;
  }
};
