import { authenticateUser } from "../../services/users/authenticateUser.js";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const authenticateUserHandler = async (req, res) => {
  console.log("hi");
  try {
    const { email, password } = req.body;
    const result = await authenticateUser(email, password);

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    // MFA flow
    if (result.mfaRequired) {
      return res.status(200).json({
        message: result.message,
        tempToken: result.tempToken,
      });
    }

    // normal login: set refresh token
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: SEVEN_DAYS,
      path: "/",
    });

    return res.status(200).json({
      message: result.message,
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
