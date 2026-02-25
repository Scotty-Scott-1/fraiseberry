import crypto from "crypto";
import { User, Profile, Preferences } from "../../database/models/index.js";

export const createNewUser = async (userData) => {
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = await User.create({
      ...userData,
      isVerified: false,
      isBot: false,
      verificationToken,
      tokenExpiry,
    });

    await Profile.create({
      userId: user.id,
    });

    await Preferences.create({
      userId: user.id,
      preferredGender: "any",
      ageRangeMin: 25,
      ageRangeMax: 50,
      maxDistanceKm: 30
    })

    return user;
  } catch(err) {
    console.error(err);
    throw new Error("Failed to create user in db", { cause: err });
  }
}
