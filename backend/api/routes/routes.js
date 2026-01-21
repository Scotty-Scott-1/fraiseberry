import express from "express";
import { signUpHandler } from "../handlers/users/signUpHandler.js";
import { signInHandler } from "../handlers/users/signInHandler.js";
import { verifyEmailHandler } from "../handlers/users/verifyEmail.js";
import { testHandler } from "../handlers/test/test.js";



const router = express.Router();

router.post("/users", signUpHandler);
router.post("/auth", signInHandler);
router.put("/email", verifyEmailHandler);
router.get("/test", testHandler);

router.get("/ping", (req, res) => {
  console.log("Ping route hit");
  res.json({ message: "pong" });
});
export default router;
