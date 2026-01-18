// initDB.js
import { sequelize } from "./config.js";
import { associateModels } from "./models/index.js";


export const initDB = async () => {
  // Step 1: Connect to the database
  try {
    await sequelize.authenticate();
    console.log("✅ [MariaDB]: Database connection established.");
  } catch (err) {
    console.error("❌ [MariaDB]: Failed to connect to the database.", err);
    throw err;
  }

  // Step 2: Set up associations
  try {
    await associateModels();
    console.log("✅ [MariaDB]: Associations set up successfully.");
  } catch (err) {
    console.error("❌[MariaDB]: Failed to set up associations.", err);
    throw err;
  }

  // Step 3: Sync all models
  try {
    await sequelize.sync({ alter: true }); // syncs User, Profile, Preferences
    console.log("✅ [MariaDB]: All models synced successfully.");
  } catch (err) {
    console.error("❌ [MariaDB]: Failed to sync models.", err);
    throw err;
  }
};
