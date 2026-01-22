import { signInController } from "../controllers/signIn/signIn.js";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const signInHandler = async (req, res) => {
  console.log("hi");
  try {
    const { email, password } = req.body;

    const result = await signInController(email, password);

    // MFA flow
    if (result.mfaRequired) {
      return res.status(200).json({
        message: result.message,
        tempToken: result.tempToken,
      });
    }

    // normal login:
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: SEVEN_DAYS,
      path: "/",
    });

    return res.status(200).json({
      message: result.message,
      accessToken: result.accessToken,
      mfaRequired: false,
    });

  } catch (err) {
    console.error("Login error:", err);

    const error400 = [
      "email not provided",
      "password not provided",
      "email not found",
      "email not verified",
      "Invalid password"
    ].includes(err.message);

    if (error400) return res.status(400).json({ message: err.message });
    return res.status(500).json({ status: 400, message: "Internal server error" });
  }
};
