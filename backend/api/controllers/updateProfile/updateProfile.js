
export const updateProfileController = async (formData) => {

  // Step 1: Validate input
  await validateFromData(formData);

  return { status: 200, message: "profile updated" };
};

