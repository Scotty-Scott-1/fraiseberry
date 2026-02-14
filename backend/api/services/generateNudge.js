import OpenAI from "openai";
import { Conversation, Message, User, Profile } from "../../database/models/index.js";
import { sendMessageService } from "./sendMessageService.js";
import { buildNudgePrompt } from "./buildNudgePrompt.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BOT_USER_ID = process.env.BOT_USER_ID ? parseInt(process.env.BOT_USER_ID, 10) : null;

if (!OPENAI_API_KEY) {
  console.warn("OpenAI API key not set. Nudges will be disabled until OPENAI_API_KEY is provided.");
}

const client = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null;


export const generateNudge = async (conversation) => {
  if (!client) return null;
  if (!BOT_USER_ID) return null;

  try {
    const userA = await User.findByPk(conversation.userAId, {
      include: [{ model: Profile, as: "profile" }],
    });

    const userB = await User.findByPk(conversation.userBId, {
      include: [{ model: Profile, as: "profile" }],
    });

    const rawMessages = await Message.findAll({
      where: { conversationId: conversation.id, isBot: false },
      include: [
        {
          model: User,
          as: "sender",
          include: [{ model: Profile, as: "profile" }],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });




    const messages = rawMessages.reverse();

    const aName = userA?.profile?.name || "User A";
    const bName = userB?.profile?.name || "User B";
    const aBio = userA?.profile?.bio || "";
    const bBio = userB?.profile?.bio || "";

    const prompt = buildNudgePrompt({
      aName,
      bName,
      aBio,
      bBio,
      messages,
      conversation,
    });

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a polite conversation assistant. Reply with a single short question only.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 50,
    });

    const aiText =
      response?.choices?.[0]?.message?.content ||
      response?.choices?.[0]?.text;

    if (!aiText) return null;

    return await sendMessageService(
      conversation.id,
      BOT_USER_ID,
      aiText.trim(),
      true
    );
  } catch (err) {
    console.error("generateNudge error:", err);
    return null;
  }
};

export default generateNudge;
