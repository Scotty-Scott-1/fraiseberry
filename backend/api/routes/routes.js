import express from "express";
import { signUpHandler } from "../handlers/signUpHandler.js";
import { signInHandler } from "../handlers/signInHandler.js";
import { verifyEmailHandler } from "../handlers/verifyEmail.js";
import { updateProfileHandler } from "../handlers/updateProfileHandler.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import { getProfileHandler } from "../handlers/getProfileHandler.js"
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/users", signUpHandler);
router.post("/auth", signInHandler);
router.put("/email", verifyEmailHandler);
router.put ("/profile", verifyAccessToken, upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "supportingPics", maxCount: 3 }
  ]),
	updateProfileHandler);
router.get ("/profile", verifyAccessToken, getProfileHandler);
export default router;
