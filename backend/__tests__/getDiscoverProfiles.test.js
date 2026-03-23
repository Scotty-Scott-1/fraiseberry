import { jest } from "@jest/globals";

import {
  createMockDiscoverUser,
  createMockProfiles,
  createMockLikedUsers,
  createMockMatches
} from "./mocks/getDiscoverProfilesMock.js";

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
Dynamic imports AFTER mocks are registered
*/

const { getDiscoverProfilesService } = await import(
  "../api/services/getDiscoverProfiles.js"
);

const { User, Profile, Like, Match } = await import(
  "../database/models/index.js"
);

const { getDistance } = await import("geolib");

describe("getDiscoverProfilesService", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /*
  --------------------------------------------------
  BASE SERVICE TEST
  --------------------------------------------------
  */

  test("returns discover profiles successfully", async () => {

    User.findByPk.mockResolvedValue(
      createMockDiscoverUser()
    );

    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);

    Profile.findAll.mockResolvedValue(
      createMockProfiles([
        { userId: 2, age: 25, gender: "female" }
      ])
    );

    getDistance.mockReturnValue(0);

    const result = await getDiscoverProfilesService(1);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  /*
  --------------------------------------------------
  AGE PREFERENCE TEST
  --------------------------------------------------
  */

  test("filters profiles outside age preference range", async () => {

    User.findByPk.mockResolvedValue(
      createMockDiscoverUser({
        prefAgeMin: 18,
        prefAgeMax: 25,
        prefPreferredGender: "female"
      })
    );

    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);

    Profile.findAll.mockResolvedValue(
      createMockProfiles([
        { userId: 2, age: 20, gender: "female" },
        { userId: 3, age: 40, gender: "female" }
      ])
    );

    getDistance.mockReturnValue(0);

    const result = await getDiscoverProfilesService(1);

    expect(result).toHaveLength(1);
    expect(result[0].age).toBe(20);
  });

  /*
  --------------------------------------------------
  GENDER PREFERENCE TEST
  --------------------------------------------------
  */

  test("filters profiles by gender preference", async () => {

    User.findByPk.mockResolvedValue(
      createMockDiscoverUser({
        prefPreferredGender: "female"
      })
    );

    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);

    Profile.findAll.mockResolvedValue(
      createMockProfiles([
        { userId: 2, gender: "female" },
        { userId: 3, gender: "male" }
      ])
    );

    getDistance.mockReturnValue(0);

    const result = await getDiscoverProfilesService(1);

    expect(result.every(p => p.gender === "female")).toBe(true);
    expect(result).toHaveLength(1);
  });

  /*
  --------------------------------------------------
  DISTANCE BOUNDARY TEST
  --------------------------------------------------
  */

  test("filters profiles outside distance preference", async () => {

    User.findByPk.mockResolvedValue(
      createMockDiscoverUser({
        prefMaxDistance: 10
      })
    );

    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);

    Profile.findAll.mockResolvedValue(
      createMockProfiles([
        { userId: 2, gender: "female" }
      ])
    );

    getDistance.mockReturnValue(15000); // 15 km

    const result = await getDiscoverProfilesService(1);

    expect(result.length).toBe(0);
  });

  /*
  --------------------------------------------------
  EXCLUSION LOGIC TEST
  --------------------------------------------------
  */

  test("excludes liked and matched profiles", async () => {

    User.findByPk.mockResolvedValue(
      createMockDiscoverUser()
    );

    Like.findAll.mockResolvedValue(
      createMockLikedUsers([2])
    );

    Match.findAll.mockResolvedValue(
      createMockMatches([
        [1, 3]
      ])
    );

    Profile.findAll.mockResolvedValue(
      createMockProfiles([
        { userId: 4, gender: "female" }
      ])
    );

    getDistance.mockReturnValue(0);

    const result = await getDiscoverProfilesService(1);

    const returnedIds = result.map(p => p.userId);

    expect(returnedIds).not.toContain(2);
    expect(returnedIds).not.toContain(3);
    expect(result).toHaveLength(1);
  });

});
