import express from "express";
import { newUserHandler } from "../handlers/users/newUser.js";
import { authenticateUserHandler } from "../handlers/users/authenticateUser.js";

const router = express.Router();

router.post("/users", newUserHandler);
router.post("/auth", authenticateUserHandler);


export default router;
