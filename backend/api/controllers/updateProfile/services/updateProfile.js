import { Profile } from "./index.js";

export const updateProfileService = async (userId, profileData) => {
  try {
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) throw new Error("Profile not found");

    profile.name = profileData.name;
    profile.age = Number(profileData.age);
    profile.bio = profileData.bio;
    profile.gender = profileData.gender;
    await profile.save();

    return profile;

  } catch(err) {
    console.error(err);
    throw new Error("Failed to update profile in db", { cause: err });
  }
}
