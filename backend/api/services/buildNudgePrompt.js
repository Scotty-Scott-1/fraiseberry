export const buildNudgePrompt = ({ aName, bName, aBio, bBio, messages, conversation }) => {
  // Header
  let prompt = `Conversation between ${aName} and ${bName}:
${aBio ? `- ${aName} bio: "${aBio}"` : ""}
${bBio ? `- ${bName} bio: "${bBio}"` : ""}
Last messages:
`;

  // Last 5 messages
  messages.forEach((m, idx) => {
    const senderName =
      m.sender?.profile?.name ||
      m.sender?.id ||
      (m.senderId === conversation.userAId ? aName : bName);

    prompt += `${idx + 1}. ${senderName}: "${m.content.replace(/\n/g, " ")}"\n`;
  });

  // Instruction block
  prompt += `
The conversation has gone quiet.
Generate ONE short, friendly question that moves the conversation forward.
Keep the tone light, neutral, and conversational.
Do not answer user questions or speak as either user.
Always address the question to one or both users by name.
Do not give advice, multiple questions, or long messages.
Use bios only as optional inspiration.
Reference a shared interest only if both bios explicitly mention the same thing.
Do not merge unrelated bio details or assume shared interests.
Base the question on recent messages without repeating them.
Avoid assumptions, sensitive topics, and personal subjects.
Prefer open-ended questions that invite a natural reply.
`;

  return prompt;
};
