import jwt from "jsonwebtoken";
import { User } from "../../../database/models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const authenticateUser = async (email, password) => {

  if (!email) return { status: 400, message: "email not provided" };
  if (!password) return { status: 400, message: "password not provided" };

  // Try to find user
  const user = await User.findOne({ where: { email } });

  // if user not found: return 403
  if (!user) return { status: 403, message: "email not found" };

  // if user found and email not verifed: return 403
  if (!user.isVerified) return { status: 403, message: "Email address not verified" };

  // if user found and email verifed: check password
  const isMatch = await user.checkPassword(password);

  // if password not valid: return 401
  if (!isMatch) return { status: 401, message: "Invalid password" };

  // if MFA enabled: create and return temp jwt
  if (user.mfaEnabled) {
    const tempToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "5m" }
    );
    return { status: 200, mfaRequired: true, tempToken, message: "MFA Required" };
  }

  /* if MFA not enabled:
    create access jwt (for react state)
    create refresh jwt fot (http cookie)
    return user and jwts
  */
  const accessToken = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return {
    status: 200,
    user: { id: user.id, email: user.email },
    accessToken,
    refreshToken,
    message: "log in successful"
  };
};
