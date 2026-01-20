import { User, createNewUser, sendVerificationEmail, validateUserSignUp } from "./services/index.js"

export const signUpController = async (userData) => {

  // Step 1: Validate input
  await validateUserSignUp(userData);

  // Step 2: Check if verified user exists
  const existingUser = await User.findOne({
    where: { isVerified: true, email: userData.email },
  });
  if (existingUser) throw new Error("Email already in use");

  // Step 3: Create user in DB
  const user = await createNewUser(userData);

  // Step 4: Send verification email
  await sendVerificationEmail(user);

  return { status: 200, message: "New user created and verification email sent" };
};

