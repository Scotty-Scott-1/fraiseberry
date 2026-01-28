import { Profile, Photo } from "./index.js";
import fs from "fs";
import path from "path";

export const updateProfileService = async (userId, profileData) => {
  try {
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) throw new Error("Profile not found");

    // 1. Update text fields
    profile.name = profileData.name;
    profile.age = Number(profileData.age);
    profile.bio = profileData.bio;
    profile.gender = profileData.gender;
    await profile.save();

    const projectRoot = process.cwd();

    // 2. Handle profile pic
    if (profileData.profilePic) {
      const existingProfilePhoto = await Photo.findOne({
        where: { profileId: profile.id, type: "PROFILE" },
      });

      if (existingProfilePhoto) {
        const filePath = path.join(
          projectRoot,
          existingProfilePhoto.url.replace(/^\/+/, "")
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Deleted profile pic:", filePath);
        }

        await existingProfilePhoto.destroy();
      }

      await Photo.create({
        profileId: profile.id,
        url: profileData.profilePic,
        type: "PROFILE",
      });
    }

    // 3. Handle supporting pics
    if (profileData.supportingPics && profileData.supportingPics.length > 0) {
      const existingSupportingPhotos = await Photo.findAll({
        where: { profileId: profile.id, type: "SUPPORTING" },
      });

      for (const photo of existingSupportingPhotos) {
        const filePath = path.join(
          projectRoot,
          photo.url.replace(/^\/+/, "")
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Deleted supporting pic:", filePath);
        }
      }

      await Photo.destroy({
        where: { profileId: profile.id, type: "SUPPORTING" },
      });

      const newSupportingPhotos = profileData.supportingPics.map(
        (url, index) => ({
          profileId: profile.id,
          url,
          type: "SUPPORTING",
          position: index,
        })
      );

      await Photo.bulkCreate(newSupportingPhotos);
    }

    return profile;
  } catch (err) {
    console.error("Failed to update profile in db:", err);
    throw err;
  }
};
