import { updateProfileController } from "../controllers/updateProfile/updateProfile.js";

export const updateProfileHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Multer parses files into req.files
    const files = req.files || {};

    // get profile pic (single) and supporting pics (array)
    const profilePicFile = files.profilePic ? files.profilePic[0] : null;
    const supportingPicsFiles = files.supportingPics || [];

    console.log("profilePicFile:", profilePicFile);
    console.log("supportingPicsFiles:", supportingPicsFiles);

    const result = await updateProfileController(
      req.userId,
      req.body,
      profilePicFile,
      supportingPicsFiles
    );

    return res.status(200).json(result);

  } catch (err) {
    console.error("Profile update failed:", err);
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};
