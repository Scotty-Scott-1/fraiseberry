import { Profile } from "../../database/models/index.js";

export const createProfileService = async (userId) => {
  try {
    await Profile.create({
		userId
	});
    return { status: 200, message: "profile created" };
  } catch(err) {
    console.error(err);
    throw new Error("Failed to update profile in db", { cause: err });
  }
}
