import { buildNudgePrompt } from "../api/services/buildNudgePrompt.js";

describe("buildNudgePrompt", () => {
  test("includes bios and instruction block and formats messages correctly", () => {
    const aName = "Alice";
    const bName = "Bob";
    const aBio = "Likes hiking";
    const bBio = "Coffee enthusiast";

    const conversation = { userAId: 5, userBId: 6 };

    const messages = [
      { sender: { profile: { name: "Alice" }, id: 1 }, content: "Hi\nthere" },
      { sender: { id: "user-2" }, content: "Hello" },
      { senderId: 5, content: "Yo" }
    ];

    const prompt = buildNudgePrompt({ aName, bName, aBio, bBio, messages, conversation });

    expect(prompt).toContain(`Conversation between ${aName} and ${bName}:`);
    expect(prompt).toContain(`- ${aName} bio: "${aBio}"`);
    expect(prompt).toContain(`- ${bName} bio: "${bBio}"`);
    expect(prompt).toContain('Generate ONE short, friendly question');

    // message 1: uses profile.name and replaces newline with space
    expect(prompt).toContain('1. Alice: "Hi there"');

    // message 2: uses sender.id
    expect(prompt).toContain('2. user-2: "Hello"');

    // message 3: senderId equals conversation.userAId -> uses aName
    expect(prompt).toContain(`3. ${aName}: "Yo"`);
  });

  test("omits bio lines when bios are not provided", () => {
    const aName = "A";
    const bName = "B";
    const messages = [];
    const conversation = { userAId: 1, userBId: 2 };

    const prompt = buildNudgePrompt({ aName, bName, aBio: null, bBio: null, messages, conversation });

    expect(prompt).toContain(`Conversation between ${aName} and ${bName}:`);
    expect(prompt).not.toMatch(new RegExp(`- ${aName} bio:`));
    expect(prompt).not.toMatch(new RegExp(`- ${bName} bio:`));
  });
});
