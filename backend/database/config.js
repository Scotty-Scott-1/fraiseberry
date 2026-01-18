import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (!DB_NAME) throw new Error("❌ [MariaDB]: Missing database name.");
if (!DB_USER) throw new Error("❌ [MariaDB]: Missing database user.");
if (!DB_PASSWORD) throw new Error("❌ [MariaDB]: Missing database user password.");

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

console.log("✅ [MariaDB]: Sequelize instance defined.");
