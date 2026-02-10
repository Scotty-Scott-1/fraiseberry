import { Profile } from "../../database/models/index.js";

export const getProfileByIdService = async (id) => {
  const profile = await Profile.findOne({
    where: { userId: id }
  });

  return profile;
};
