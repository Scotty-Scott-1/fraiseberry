import { User } from "../../database/models/index.js";

export const mfaDisableHandler = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.mfaEnabled = false;
    user.mfaSecret = null;
    await user.save();

    return res.status(200).json({ message: "MFA disabled" });
  } catch (err) {
    console.error("MFA disable error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
