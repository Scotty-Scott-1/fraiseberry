import xss from "xss";
import { validateProfileService, updateProfileService } from "./services/index.js";

export const updateProfileController = async (userId, formData, files) => {
  // 1. Validate text fields
  const validatedData = await validateProfileService(formData);

  // 2. Sanitize
  const safeData = {
    name: xss(validatedData.name),
    gender: xss(validatedData.gender),
    bio: xss(validatedData.bio),
    age: validatedData.age,
  };

  // 3. Handle uploaded files
  if (files.profilePic) {
    safeData.profilePic = `/uploads/${files.profilePic.filename}`;
  }

  if (files.supportingPic1) {
    safeData.supportingPic1 = `/uploads/${files.supportingPic1.filename}`;
  }
  if (files.supportingPic2) {
    safeData.supportingPic2 = `/uploads/${files.supportingPic2.filename}`;
  }
  if (files.supportingPic3) {
    safeData.supportingPic3 = `/uploads/${files.supportingPic3.filename}`;
  }

  // 4. Update profile in DB
  await updateProfileService(userId, safeData);

  return { status: 200, message: "Profile updated" };
};
