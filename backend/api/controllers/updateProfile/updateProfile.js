import xss from "xss";
import validateProfileService from "./services/validateProfileData.js";

export const updateProfileController = async (formData) => {

  // Validate input
  const validatedData =  await validateProfileService(formData);

  // sanitise input
  const safeData = {
    name: xss(validatedData.name),
    gender: xss(validatedData.gender),
    bio: xss(validatedData.bio),
    age: validatedData.age
  }

  



  return { status: 200, message: "profile updated" };
};

