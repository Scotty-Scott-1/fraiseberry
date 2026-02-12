import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import { User } from "../../database/models/index.js";
import { accessTokenService } from "../controllers/signIn/services/index.js";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const mfaVerifyHandler = async (req, res) => {
  try {
    const { tempToken, token } = req.body;
    if (!tempToken) return res.status(400).json({ message: "tempToken required" });
    if (!token) return res.status(400).json({ message: "MFA token required" });

    const { JWT_SECRET } = process.env;
    let payload;
    try {
      payload = jwt.verify(tempToken, JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired temp token" });
    }

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.mfaEnabled) return res.status(400).json({ message: "MFA not enabled" });

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) return res.status(400).json({ message: "Invalid MFA token" });

    // Create full access + refresh tokens
    const result = accessTokenService(user);

    // set refresh token cookie same as signInHandler
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: SEVEN_DAYS,
      path: "/",
    });

    return res.status(200).json({ message: "MFA verified", accessToken: result.accessToken });
  } catch (err) {
    console.error("MFA verify error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
