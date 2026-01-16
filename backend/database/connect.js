// npm packages
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (!DB_NAME) {
  console.error("❌ [MariaDB]: Missing database name.");
  process.exit(1);
}
if (!DB_USER) {
  console.error("❌ [MariaDB]: Missing database user."); 
  process.exit(1);
}
if (!DB_PASSWORD) {
  console.error("❌ [MariaDB]: Missing database user password.");
  process.exit(1);
}

// Create Sequelize instance
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
