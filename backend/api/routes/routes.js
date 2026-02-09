import express from "express";
import { signUpHandler } from "../handlers/signUpHandler.js";
import { signInHandler } from "../handlers/signInHandler.js";
import { verifyEmailHandler } from "../handlers/verifyEmail.js";
import { updateProfileHandler } from "../handlers/updateProfileHandler.js";
import { getProfileHandler } from "../handlers/getProfileHandler.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import { uploadProfileFields } from "../middleware/upload.js";
import { updatePreferencesHandler } from "../handlers/updatePreferencesHandler.js";
import { getPreferencesHandler } from "../handlers/getPreferencesHandler.js";
import { updateProfileCoordsHandler } from "../handlers/updateProfileCoordsHandler.js";
import { getDiscoverProfilesHandler } from "../handlers/getDiscoverProfilesHandler.js";
import { newLikeHandler } from "../handlers/newLikeHandler.js";
import { getMatchesHandler } from "../handlers/getMatchesHandler.js";
import { getOrCreateConversationHandler } from "../handlers/getOrCreateConversationHandler.js";
import { getMessagesHandler } from "../handlers/getMessagesHandler.js";
import { sendMessageHandler } from "../handlers/sendMessageHandler.js";



const router = express.Router();

// Auth routes
router.post("/users", signUpHandler);
router.post("/auth", signInHandler);
router.put("/email", verifyEmailHandler);
// Profile routes
router.put("/profile", verifyAccessToken, uploadProfileFields, updateProfileHandler);
router.get("/profile", verifyAccessToken, getProfileHandler);
router.put("/preferences", verifyAccessToken, updatePreferencesHandler);
router.get("/preferences", verifyAccessToken, getPreferencesHandler);
router.put("/profile/location", verifyAccessToken, updateProfileCoordsHandler);
router.get("/discover", verifyAccessToken, getDiscoverProfilesHandler);
router.post("/like/:likedId", verifyAccessToken, newLikeHandler);
router.get("/matches", verifyAccessToken, getMatchesHandler);
router.get("/chat/:otherUserId", verifyAccessToken, getOrCreateConversationHandler);
router.get("/messages/:conversationId", verifyAccessToken, getMessagesHandler);
router.post("/messages", verifyAccessToken, sendMessageHandler);


export default router;
