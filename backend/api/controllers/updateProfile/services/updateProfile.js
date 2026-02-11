import { Profile } from "../../../../database/models/index.js";
import fs from "fs";
import path from "path";

export const updateProfileService = async (userId, profileData) => {
  try {
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) {
      throw new Error("Profile not found for user");
    }
    const projectRoot = process.cwd();
    // 1. Update text fields
    profile.name = profileData.name;
    profile.age = Number(profileData.age);
    profile.bio = profileData.bio;
    profile.gender = profileData.gender;
    // 2. Handle profilePic
    if (profileData.profilePic) {
      if (profile.profilePic) {
        const existingPath = path.join(projectRoot, profile.profilePic.replace(/^\/+/, ""));
        if (fs.existsSync(existingPath)) {
          fs.unlinkSync(existingPath);
          console.log("Deleted old profile pic:", existingPath);
        }
      }
      profile.profilePic = profileData.profilePic;
    }
    // 3. Handle supportingPic1
    if (profileData.supportingPic1) {
      if (profile.supportingPic1) {
        const existingPath = path.join(projectRoot, profile.supportingPic1.replace(/^\/+/, ""));
        if (fs.existsSync(existingPath)) {
          fs.unlinkSync(existingPath);
          console.log("Deleted old supportingPic1:", existingPath);
        }
      }
      profile.supportingPic1 = profileData.supportingPic1;
    }
    // 4. Handle supportingPic2
    if (profileData.supportingPic2) {
      if (profile.supportingPic2) {
        const existingPath = path.join(projectRoot, profile.supportingPic2.replace(/^\/+/, ""));
        if (fs.existsSync(existingPath)) {
          fs.unlinkSync(existingPath);
          console.log("Deleted old supportingPic2:", existingPath);
        }
      }
      profile.supportingPic2 = profileData.supportingPic2;
    }
    // 5. Handle supportingPic3
    if (profileData.supportingPic3) {
      if (profile.supportingPic3) {
        const existingPath = path.join(projectRoot, profile.supportingPic3.replace(/^\/+/, ""));
        if (fs.existsSync(existingPath)) {
          fs.unlinkSync(existingPath);
          console.log("Deleted old supportingPic3:", existingPath);
        }
      }
      profile.supportingPic3 = profileData.supportingPic3;
    }
    await profile.save();
    return profile;
  } catch (err) {
    console.error("Failed to update profile in db:", err);
    throw err;
  }
};
