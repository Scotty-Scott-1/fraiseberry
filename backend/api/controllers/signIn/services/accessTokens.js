import jwt from "jsonwebtoken";

export const accessTokenService = (user) => {
  // Create JWTs
  const accessToken = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: "15m" }
   );

  const refreshToken = jwt.sign(
    { id: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
   );

  return {
    status: 200,
    accessToken,
    refreshToken,
    message: "access and refresh token created"
  }
}



