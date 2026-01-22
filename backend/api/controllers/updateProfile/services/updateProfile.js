import Profile from "./index.js";

export const updateProfileService = async (data) => {
  try {
    const profile = await Profile.create({...data});
    return (profile);
  } catch(err) {
    console.error(err);
    throw new Error("Failed to update profile in db", { cause: err });
  }
}
