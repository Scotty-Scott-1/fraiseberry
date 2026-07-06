import { updateProfileController } from "../controllers/updateProfile/updateProfile.js";
import { fileTypeFromFile } from "file-type";
import fs from "fs";

export const updateProfileHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const files = req.files || {};
    const allFiles = Object.values(files).flat();

    // Validate each uploaded file
    for (const file of allFiles) {
      const type = await fileTypeFromFile(file.path);

      // Reject if not real JPEG/PNG
      if (!type || !["image/jpeg", "image/png"].includes(type.mime)) {
        console.warn("Deleting invalid file:", file.path);
        fs.unlinkSync(file.path); // delete the bad file
        return res.status(400).json({ error: "Invalid image file" });
      }
    }


    const result = await updateProfileController(
      req.userId,
      req.body,
      {
        profilePic: files.profilePic?.[0] || null,
        supportingPic1: files.supportingPic1?.[0] || null,
        supportingPic2: files.supportingPic2?.[0] || null,
        supportingPic3: files.supportingPic3?.[0] || null,
      }
    );

    return res.status(200).json(result);

  } catch (err) {
    console.error("Profile update failed:", err);
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};
