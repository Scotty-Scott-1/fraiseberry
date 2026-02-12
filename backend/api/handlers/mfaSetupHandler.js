import speakeasy from "speakeasy";
import { User } from "../../database/models/index.js";

export const mfaSetupHandler = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = speakeasy.generateSecret({ name: `Fraiseberry (${user.email})` });

    // store base32 secret for this user (not enabling yet)
    user.mfaSecret = secret.base32;
    await user.save();

    return res.status(200).json({
      message: "MFA secret generated",
      otpauth_url: secret.otpauth_url,
      base32: secret.base32
    });
  } catch (err) {
    console.error("MFA setup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
