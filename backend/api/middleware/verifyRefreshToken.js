// middleware/requireRefreshToken.js
import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No refresh token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
