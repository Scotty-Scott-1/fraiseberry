import { jest } from "@jest/globals";

/*
Mock external modules BEFORE importing service
*/

jest.unstable_mockModule("geolib", () => ({
  getDistance: jest.fn()
}));

jest.unstable_mockModule(
  "../database/models/index.js",
  () => ({
    User: { findByPk: jest.fn() },
    Preferences: {},
    Profile: { findAll: jest.fn() },
    Like: { findAll: jest.fn() },
    Match: { findAll: jest.fn() }
  })
);

/*
Dynamic import AFTER mocks are registered
*/

const { getDiscoverProfilesService } = await import(
  "../api/services/getDiscoverProfiles.js"
);

const { User, Profile, Like, Match, } = await import(
  "../database/models/index.js"
);

const { getDistance } = await import("geolib");

describe("getDiscoverProfilesService", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns discover profiles", async () => {

    User.findByPk.mockResolvedValue({
      profile: { latitude: 0, longitude: 0 },
      preferences: {
        maxDistanceKm: 100,
        preferredGender: "any",
        ageRangeMin: null,
        ageRangeMax: null
      }
    });

    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);

    Profile.findAll.mockResolvedValue([
      {
        userId: 2,
        latitude: 0,
        longitude: 0,
        gender: "male",
        age: 25,
        toJSON() {
          return this;
        }
      }
    ]);

    getDistance.mockReturnValue(0);

    const result = await getDiscoverProfilesService(1);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

});
