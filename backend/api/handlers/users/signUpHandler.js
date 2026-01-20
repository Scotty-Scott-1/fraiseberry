import { signUpController } from "../../controllers/signUp/signUp.js";

export const signUpHandler = async (req, res) => {
  console.log("Incoming signup:", req.body);
  try {
    const result = await signUpController(req.body);
    return res.status(result.status).json({ status: result.status, message : result.message });

  } catch (err) {
    const error400 = [
      "Invalid email format",
      "Email is required",
      "Password is required",
      "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, 1 symbol",
      "You must agree to the terms",
      "Email already in use",
      "Failed to create user in db",
      "Email verification email failed to send",
      "Failed to create user in db",
      "Email verification email failed to send"
    ].includes(err.message);
    if (error400) return res.status(400).json({ message: err.message });

        // Fallback for unknown/unexpected errors
    console.error(err); // log stack trace
    return res.status(500).json({ message: "Internal server error" });
  }
};
