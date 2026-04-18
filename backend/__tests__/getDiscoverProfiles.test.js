import { jest } from "@jest/globals";
import { Op } from "sequelize";

import {
  createMockDiscoverUser,
  createMockProfiles,
  createMockLikedUsers,
  createMockMatches
} from "./mocks/getDiscoverProfilesMock.js";

/*
Mock external modules BEFORE importing service
*/
jest.unstable_mockModule("../database/models/index.js", () => ({
  User: { findByPk: jest.fn() },
  Preferences: {},
  Profile: { findAll: jest.fn() },
  Like: { findAll: jest.fn() },
  Match: { findAll: jest.fn() }
}));

/*
Dynamic imports AFTER mocks
*/
const { getDiscoverProfilesService } = await import(
  "../api/services/getDiscoverProfiles.js"
);

const { User, Profile, Like, Match } = await import(
  "../database/models/index.js"
);

describe("getDiscoverProfilesService", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------------------------------
  // RETURN SHAPE + TRANSFORMATION
  // --------------------------------------------------
  test("returns an array of plain profile objects", async () => {

    User.findByPk.mockResolvedValue(createMockDiscoverUser());
    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);

    Profile.findAll.mockResolvedValue(
      createMockProfiles([
        { userId: 2, age: 25, gender: "female" }
      ])
    );

    const result = await getDiscoverProfilesService(1);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);

    expect(result[0]).toEqual(
      expect.objectContaining({
        userId: 2,
        age: 25,
        gender: "female"
      })
    );

    // ensures Sequelize instance was converted to plain object
    expect(result[0].toJSON).toBeUndefined();
  });

  // --------------------------------------------------
  // GENDER FILTER BUSINESS RULE
  // --------------------------------------------------
  test("applies gender preference in DB query", async () => {

    User.findByPk.mockResolvedValue(
      createMockDiscoverUser({
        prefPreferredGender: "female"
      })
    );

    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);
    Profile.findAll.mockResolvedValue(createMockProfiles([]));

    await getDiscoverProfilesService(1);

    const query = Profile.findAll.mock.calls[0][0];

    expect(query.where.gender).toBe("female");
  });

  // --------------------------------------------------
  // EXCLUSION LOGIC (LIKES + MATCHES)
  // --------------------------------------------------
  test("adds liked and matched users to exclusion list", async () => {

    User.findByPk.mockResolvedValue(createMockDiscoverUser());

    Like.findAll.mockResolvedValue(
      createMockLikedUsers([2, 4])
    );

    Match.findAll.mockResolvedValue(
      createMockMatches([
        [1, 3],
        [5, 1]
      ])
    );

    Profile.findAll.mockResolvedValue(createMockProfiles([]));

    await getDiscoverProfilesService(1);

    const query = Profile.findAll.mock.calls[0][0];
    const excludedIds = query.where.userId[Op.notIn];

    expect(excludedIds).toEqual([2, 4, 3, 5]);
  });

  // --------------------------------------------------
  // DUPLICATE EXCLUSIONS (EXPECTED BEHAVIOUR)
  // --------------------------------------------------
  test("keeps duplicate exclusions if user appears in both likes and matches", async () => {

    User.findByPk.mockResolvedValue(createMockDiscoverUser());

    Like.findAll.mockResolvedValue(
      createMockLikedUsers([2])
    );

    Match.findAll.mockResolvedValue(
      createMockMatches([
        [1, 2]
      ])
    );

    Profile.findAll.mockResolvedValue(createMockProfiles([]));

    await getDiscoverProfilesService(1);

    const query = Profile.findAll.mock.calls[0][0];
    const excludedIds = query.where.userId[Op.notIn];

    expect(excludedIds).toEqual([2, 2]);
  });

  // --------------------------------------------------
  // QUERY CONFIGURATION (LIMIT + RANDOM ORDER)
  // --------------------------------------------------
  test("requests 20 random profiles", async () => {

    User.findByPk.mockResolvedValue(createMockDiscoverUser());
    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);
    Profile.findAll.mockResolvedValue(createMockProfiles([]));

    await getDiscoverProfilesService(1);

    const query = Profile.findAll.mock.calls[0][0];

    expect(query.limit).toBe(20);
    expect(query.order).toBeDefined();
  });

  // --------------------------------------------------
  // EMPTY RESULT CASE
  // --------------------------------------------------
  test("returns empty array when no profiles are found", async () => {

    User.findByPk.mockResolvedValue(createMockDiscoverUser());
    Like.findAll.mockResolvedValue([]);
    Match.findAll.mockResolvedValue([]);
    Profile.findAll.mockResolvedValue([]);

    const result = await getDiscoverProfilesService(1);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([]);
  });

  // --------------------------------------------------
  // ERROR HANDLING
  // --------------------------------------------------
  test("throws error when user is not found", async () => {

    User.findByPk.mockResolvedValue(null);

    await expect(
      getDiscoverProfilesService(1)
    ).rejects.toThrow("User not found");
  });

});
