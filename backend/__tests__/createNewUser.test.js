import { jest } from "@jest/globals";

jest.unstable_mockModule("../database/models/index.js", () => ({
  User: { create: jest.fn() },
  Profile: { create: jest.fn() },
  Preferences: { create: jest.fn() }
}));

const { createNewUser } = await import(
  "../api/services/createNewUser.js"
);

const { User, Profile, Preferences } = await import(
  "../database/models/index.js"
);

describe("createNewUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test("creates user and related profile and preferences", async () => {
    const createdUser = { id: 42, email: "test@example.com" };
    User.create.mockResolvedValue(createdUser);
    Profile.create.mockResolvedValue({});
    Preferences.create.mockResolvedValue({});

    const input = { email: "test@example.com", password: "secret" };

    const result = await createNewUser(input);

    expect(User.create).toHaveBeenCalledTimes(1);
    const userArg = User.create.mock.calls[0][0];
    expect(userArg).toMatchObject({ email: input.email, isVerified: false, isBot: false });
    expect(typeof userArg.verificationToken).toBe("string");
    expect(userArg.tokenExpiry).toBeInstanceOf(Date);

    expect(Profile.create).toHaveBeenCalledWith({ userId: createdUser.id });
    expect(Preferences.create).toHaveBeenCalledWith(expect.objectContaining({ userId: createdUser.id, preferredGender: "any" }));

    expect(result).toBe(createdUser);
  });

  test("throws a readable error when User.create fails", async () => {
    User.create.mockRejectedValue(new Error("db failure"));

    await expect(createNewUser({ email: "x" })).rejects.toThrow("Failed to create user in db");
  });
});
