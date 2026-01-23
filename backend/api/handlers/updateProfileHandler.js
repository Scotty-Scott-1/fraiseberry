import { updateProfileController } from "../controllers/updateProfile/updateProfile.js";

export const updateProfileHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await updateProfileController(req.userId, req.body);

    return res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    console.error("Profile update failed:", err);
    return res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
