import { jest } from "@jest/globals";

jest.unstable_mockModule("../database/models/index.js", () => ({
  User: { findByPk: jest.fn() },
  Profile: {}
}));

jest.unstable_mockModule("geolib", () => ({
  getDistance: jest.fn()
}));

const { addDistanceToMatchesService } = await import(
  "../api/services/addDistanceToMatches.js"
);

const { User } = await import("../database/models/index.js");
const { getDistance } = await import("geolib");

describe("addDistanceToMatchesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns empty array when matchesArray is empty", async () => {
    const result = await addDistanceToMatchesService(1, []);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  test("throws when current user profile not found", async () => {
    User.findByPk.mockResolvedValue(null);
    await expect(
      addDistanceToMatchesService(1, [{ userId: 2 }])
    ).rejects.toThrow("User profile not found");
  });

  test("enriches matches with distanceKm and handles missing matched profile", async () => {
    User.findByPk.mockImplementation(async (id) => {
      if (id === 1) {
        return { profile: { latitude: 0, longitude: 0 } };
      }
      if (id === 2) {
        return { profile: { latitude: 0, longitude: 1000 } };
      }
      if (id === 3) {
        return null; // no profile for this matched user
      }
      return null;
    });

    getDistance.mockReturnValue(1500); // meters -> 1.5 km

    const matches = [
      { userId: 2, foo: "bar" },
      { userId: 3, name: "noProfile" }
    ];

    const result = await addDistanceToMatchesService(1, matches);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ userId: 2, foo: "bar", distanceKm: 1.5 });
    expect(result[1]).toMatchObject({ userId: 3, name: "noProfile", distance: null });
  });
});
