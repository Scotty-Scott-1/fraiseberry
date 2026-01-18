import express from "express";
import { newUserHandler } from "../handlers/users/newUser.js";
import { authenticateUserHandler } from "../handlers/users/authenticateUser.js";
import { verifyEmailHandler } from "../handlers/users/verifyEmail.js";



const router = express.Router();

router.post("/users", newUserHandler);
router.post("/auth", authenticateUserHandler);
router.put("/email", verifyEmailHandler);


export default router;
