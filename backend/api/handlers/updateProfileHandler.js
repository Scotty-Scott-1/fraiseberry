import { updateProfileController } from "../controllers/updateProfile/updateProfile.js";

export const updateProfileHandler = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Multer parses files into req.files
    const files = req.files || {};

    // Get each file individually
    const profilePicFile = files.profilePic ? files.profilePic[0] : null;
    const supportingPic1File = files.supportingPic1 ? files.supportingPic1[0] : null;
    const supportingPic2File = files.supportingPic2 ? files.supportingPic2[0] : null;
    const supportingPic3File = files.supportingPic3 ? files.supportingPic3[0] : null;

    console.log("profilePicFile:", profilePicFile);
    console.log("supportingPic1File:", supportingPic1File);
    console.log("supportingPic2File:", supportingPic2File);
    console.log("supportingPic3File:", supportingPic3File);

    const result = await updateProfileController(
      req.userId,
      req.body,
      {
        profilePic: profilePicFile,
        supportingPic1: supportingPic1File,
        supportingPic2: supportingPic2File,
        supportingPic3: supportingPic3File,
      }
    );

    return res.status(200).json(result);

  } catch (err) {
    console.error("Profile update failed:", err);
    return res.status(500).json({ message: err.message || "Internal server error" });
  }
};
