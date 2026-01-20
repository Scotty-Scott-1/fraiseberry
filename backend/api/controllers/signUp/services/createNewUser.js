import crypto from "crypto";
import { User } from "../../../../database/models/index.js";

export const createNewUser = async (userData) => {
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = await User.create({
      ...userData,
      isVerified: false,
      verificationToken,
      tokenExpiry,
    });
    return (user);
  } catch(err) {
    console.error(err);
    throw new Error("Failed to create user in db", { cause: err });
  }
}
