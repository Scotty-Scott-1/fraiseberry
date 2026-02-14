import { Op } from "sequelize";
import { Conversation } from "../../database/models/index.js";
import { generateNudge } from "./generateNudge.js";
import { deleteConversationAndMatch } from "./deleteConversationAndMatch.js";

const NUDGE_INTERVAL_MS = Number(process.env.NUDGE_INTERVAL_MS);
const SCAN_INTERVAL_MS = Number(process.env.SCAN_INTERVAL_MS);

if (
  Number.isNaN(NUDGE_INTERVAL_MS) ||
  Number.isNaN(SCAN_INTERVAL_MS) ||
  NUDGE_INTERVAL_MS <= 0 ||
  SCAN_INTERVAL_MS <= 0
) {
  throw new Error("NUDGE_INTERVAL_MS and SCAN_INTERVAL_MS must be positive numbers in .env");
}

export const startNudgeScheduler = (io) => {
  const runScan = async () => {
    try {
      console.log("running scan");
      const cutoff = new Date(Date.now() - NUDGE_INTERVAL_MS);

      const convos = await Conversation.findAll({
        where: {
          lastMessageAt: { [Op.lt]: cutoff },
          [Op.or]: [{ lastBotNudgeAt: null }, { lastBotNudgeAt: { [Op.lt]: cutoff } }],
        },
        limit: 20,
      });

      for (const convo of convos) {
        if (convo.botMessageCount >= 5) {
          console.log(`⚠️ Conversation ${convo.id} reached bot nudge threshold (${convo.botMessageCount}). Deleting match and conversation.`);
          await deleteConversationAndMatch(convo.id);
          continue;
        }

        const created = await generateNudge(convo);
        if (created && io) {
          io.to(`convo_${convo.id}`).emit("new_message", created);
        }
      }
    } catch (err) {
      console.error("nudgeScheduler scan error:", err);
    }
  };

  // run immediately and then at interval
  runScan();
  const id = setInterval(runScan, SCAN_INTERVAL_MS);


  return () => clearInterval(id);
};

export default startNudgeScheduler;
