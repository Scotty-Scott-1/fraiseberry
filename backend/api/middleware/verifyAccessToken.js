import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {

  const { JWT_SECRET } = process.env;

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No access token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No access token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired access token" });
  }
};
