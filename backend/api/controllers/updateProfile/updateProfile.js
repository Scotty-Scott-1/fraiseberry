import xss from "xss";
import { validateProfileService, updateProfileService } from "./services/index.js";

export const updateProfileController = async (userId, formData) => {
    console.log("Controller:", userId);
  console.log("Controller:", formData);
  // Validate input
  const validatedData =  await validateProfileService(formData);

  // sanitise input
  const safeData = {
    name: xss(validatedData.name),
    gender: xss(validatedData.gender),
    bio: xss(validatedData.bio),
    age: validatedData.age
  }

  await updateProfileService(userId, formData);

  return { status: 200, message: "profile updated" };
};

