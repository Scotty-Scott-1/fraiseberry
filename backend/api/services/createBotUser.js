import { User } from "../../database/models/index.js";
import bcrypt from "bcrypt";

export const createBotUser = async () => {
  try {
    const botId = Number(process.env.BOT_USER_ID);
    const botEmail = process.env.BOT_EMAIL;
    const botPassword = process.env.BOT_PASSWORD;

    // Validate required env vars
    if (!botId) {
      console.log("❌ [BotUser]: BOT_USER_ID is missing or invalid");
      return;
    }

    if (!botEmail) {
      console.log("❌ [BotUser]: BOT_EMAIL is missing");
      return;
    }

    if (!botPassword) {
      console.log("❌ [BotUser]: BOT_PASSWORD is missing");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(botPassword, 10);

    // Idempotent creation
    const [bot, created] = await User.findOrCreate({
      where: { id: botId },
      defaults: {
        id: botId,
        email: botEmail,
        password: hashedPassword,
        agree: true,
        isVerified: true,
        isBot: true,
      },
    });

    if (created) {
      console.log("✅ [BotUser]: Created");
    } else {
      console.log("✅ [BotUser]: Already exists");
    }
  } catch (err) {
    console.log(`❌ [BotUser]: Failed — ${err.message}`);
  }
};
