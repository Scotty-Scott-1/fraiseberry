import { Profile } from "../../database/models/index.js";

export const createProfileService = async (userId) => {
  try {
    const profile = await Profile.create({
		userId
	});
    return profile;
  } catch(err) {
    console.error(err);
    throw new Error("Failed to update profile in db", { cause: err });
  }
}
