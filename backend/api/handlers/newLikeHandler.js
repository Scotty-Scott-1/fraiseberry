// handlers/createNewLikeHandler.js
import { createNewLikeController } from "../controllers/createNewLikeController.js";

export const newLikeHandler = async (req, res) => {
  try {
    const likerId = req.userId;
    const likedId = Number(req.params.likedId);

    if (!likedId || Number.isNaN(likedId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid likedId",
      });
    }

    if (likerId === likedId) {
      return res.status(400).json({
        success: false,
        message: "You cannot like yourself",
      });
    }

    const result = await createNewLikeController(likerId, likedId);

    return res.status(200).json({
      success: true,
      matched: result.matched,
    });

  } catch (err) {
    console.error("Like error:", err);

    const knownErrors = [
      "User not found",
      "Cannot like this profile",
      "Already liked",
    ];

    if (knownErrors.includes(err.message)) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
