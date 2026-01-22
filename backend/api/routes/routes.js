import express from "express";
import { signUpHandler } from "../handlers/signUpHandler.js";
import { signInHandler } from "../handlers/signInHandler.js";
import { verifyEmailHandler } from "../handlers/verifyEmail.js";

const router = express.Router();

router.post("/users", signUpHandler);
router.post("/auth", signInHandler);
router.put("/email", verifyEmailHandler);

export default router;
