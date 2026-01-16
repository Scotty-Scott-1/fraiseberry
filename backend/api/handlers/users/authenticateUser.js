import { authenticateUser } from "../../services/users/authenticateUser.js";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const authenticateUserHandler = async (req, res) => {
  const { email, password } = req.body;

  const result = await authenticateUser(email, password);

  console.log(result);

  if (result?.error) {
    return res.status(result.status).json({ message: result.error });
  }

  if (result.mfaRequired) {
    return res.status(200).json({
      message: "MFA code required",
      tempToken: result.tempToken,
    });
  }

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: SEVEN_DAYS,
    path: "/",
  });

  res.status(200).json({
    message: "Login successful",
    user: result.user,
    accessToken: result.accessToken,
  });
};
