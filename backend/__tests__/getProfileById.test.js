import { jest } from "@jest/globals";

// Must be called before the module under test is imported so Jest can
// intercept the ESM import inside getProfileById.js
jest.unstable_mockModule("../database/models/index.js", () => ({
  Profile: {
    findOne: jest.fn(),
  },
}));

// Dynamic imports AFTER the mock is registered
const { getProfileByIdService } = await import(
  "../api/services/getProfileById.js"
);
const { Profile } = await import("../database/models/index.js");

describe("getProfileByIdService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the profile when found", async () => {
    const mockProfile = {
      id: 1,
      userId: 42,
      name: "Alice",
      age: 25,
      gender: "female",
      bio: "Hello!",
    };

    Profile.findOne.mockResolvedValue(mockProfile);

    const result = await getProfileByIdService(42);

    expect(result).toEqual(mockProfile);
  });

  test("returns null when no profile exists for the given id", async () => {
    Profile.findOne.mockResolvedValue(null);

    const result = await getProfileByIdService(99);

    expect(result).toBeNull();
  });

  test("calls Profile.findOne with the correct where clause", async () => {
    Profile.findOne.mockResolvedValue(null);

    await getProfileByIdService(7);

    expect(Profile.findOne).toHaveBeenCalledWith({ where: { userId: 7 } });
  });

  test("calls Profile.findOne exactly once per invocation", async () => {
    Profile.findOne.mockResolvedValue(null);

    await getProfileByIdService(1);

    expect(Profile.findOne).toHaveBeenCalledTimes(1);
  });

  test("propagates errors thrown by Profile.findOne", async () => {
    const dbError = new Error("Database connection failed");
    Profile.findOne.mockRejectedValue(dbError);

    await expect(getProfileByIdService(1)).rejects.toThrow(
      "Database connection failed"
    );
  });
});
