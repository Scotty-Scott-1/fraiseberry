import { User } from "../../database/models/index.js";

export const mfaStatusHandler = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ mfaEnabled: user.mfaEnabled });
  } catch (err) {
    console.error("MFA status error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
