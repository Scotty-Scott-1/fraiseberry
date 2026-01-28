import xss from "xss";
import { validateProfileService, updateProfileService } from "./services/index.js";

export const updateProfileController = async (
  userId,
  formData,
  profilePicFile,
  supportingPicsFiles = []
) => {


  // 1. Validate text fields
  const validatedData = await validateProfileService(formData);

  // 2. Sanitize
  const safeData = {
    name: xss(validatedData.name),
    gender: xss(validatedData.gender),
    bio: xss(validatedData.bio),
    age: validatedData.age
  };

  if (profilePicFile) {
    safeData.profilePic = `/uploads/${profilePicFile.filename}`;
  }

  if (supportingPicsFiles.length > 0) {
    safeData.supportingPics = supportingPicsFiles.map(
      (file) => `/uploads/${file.filename}`
    );
  }

  await updateProfileService(userId, safeData);

  return { status: 200, message: "Profile updated" };
};
