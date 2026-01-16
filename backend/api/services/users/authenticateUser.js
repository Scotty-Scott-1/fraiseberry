import jwt from "jsonwebtoken";
import { User } from "../../../database/models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const authenticateUser = async (email, password) => {

  if (!email) return { error: "email not provided", status: 400 };
  if (!password) return { error: "password not provided", status: 400 };

  // Try to find user
  const user = await User.findOne({ where: { email } });

  // if user not found: return 403
  if (!user) return { error: "email not found", status: 403 };

  // if user found and email not verifed: return 403
  if (!user.isVerified) return { error: "Email address not verified", status: 403 };

  // if user found and email verifed: check password
  const isMatch = await user.checkPassword(password);

  // if password not valid: return 401
  if (!isMatch) return { error: "Invalid password", status: 401 };

  // if MFA enabled: create and return temp jwt
  if (user.mfaEnabled) {
    const tempToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "5m" }
    );
    return { mfaRequired: true, tempToken };
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
    user: { id: user.id, email: user.email },
    accessToken,
    refreshToken,
  };
};
