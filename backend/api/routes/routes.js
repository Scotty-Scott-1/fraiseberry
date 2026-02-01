import express from "express";
import { signUpHandler } from "../handlers/signUpHandler.js";
import { signInHandler } from "../handlers/signInHandler.js";
import { verifyEmailHandler } from "../handlers/verifyEmail.js";
import { updateProfileHandler } from "../handlers/updateProfileHandler.js";
import { getProfileHandler } from "../handlers/getProfileHandler.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import { uploadProfileFields } from "../middleware/upload.js";

const router = express.Router();

// Auth routes
router.post("/users", signUpHandler);
router.post("/auth", signInHandler);
router.put("/email", verifyEmailHandler);
// Profile routes
router.put("/profile", verifyAccessToken, uploadProfileFields, updateProfileHandler);
router.get("/profile", verifyAccessToken, getProfileHandler);

export default router;
