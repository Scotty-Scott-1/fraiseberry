import { User } from "../../database/models/index.js";

export const verifyEmail = async (token) => {

  if (!token) return { status: 400, message: "Verification token missing" };

  const user = await User.findOne({
    where: {
      verificationToken: token,
    },
  });


  // token not found
  if (!user) return { status: 400, message: "Token or user not found" };

  // verify user
  user.isVerified = true;
  user.verificationToken = null;
  user.tokenExpiry = null;
  await user.save();

  return {
    status: 200,
    message: "Email verified successfully!"
  };
};
