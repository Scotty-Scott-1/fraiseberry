import speakeasy from "speakeasy";
import { User } from "../../database/models/index.js";

export const mfaEnableHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { token } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!token) return res.status(400).json({ message: "Token required" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.mfaSecret) return res.status(400).json({ message: "MFA not setup" });

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) return res.status(400).json({ message: "Invalid MFA token" });

    user.mfaEnabled = true;
    await user.save();

    return res.status(200).json({ message: "MFA enabled" });
  } catch (err) {
    console.error("MFA enable error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
