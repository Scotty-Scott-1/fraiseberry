import { jest } from "@jest/globals";

jest.unstable_mockModule("../database/models/index.js", () => ({
  Like: { create: jest.fn(), findOne: jest.fn() },
  Match: { create: jest.fn() }
}));

const { createNewLikeService } = await import(
  "../api/services/createNewLike.js"
);

const { Like, Match } = await import("../database/models/index.js");

describe("createNewLikeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns matched:false when no mutual like", async () => {
    Like.findOne.mockResolvedValue(null);
    Like.create.mockResolvedValue({});

    const res = await createNewLikeService(10, 20);

    expect(Like.create).toHaveBeenCalledWith({ likerId: 10, likedId: 20 });
    expect(Like.findOne).toHaveBeenCalledWith({ where: { likerId: 20, likedId: 10 } });
    expect(Match.create).not.toHaveBeenCalled();
    expect(res).toEqual({ matched: false });
  });

  test("creates match and returns matched:true when mutual like exists", async () => {
    Like.findOne.mockResolvedValue({ id: 5, likerId: 20, likedId: 10 });
    Like.create.mockResolvedValue({});
    Match.create.mockResolvedValue({});

    const res = await createNewLikeService(10, 20);

    expect(Like.create).toHaveBeenCalledWith({ likerId: 10, likedId: 20 });
    expect(Match.create).toHaveBeenCalledWith({ userAId: 10, userBId: 20 });
    expect(res).toEqual({ matched: true });
  });
});
