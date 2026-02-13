import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
  const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No access token" });
  }

  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ error: "No access token" });
  }

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token" });
  }

  try {
    // Try verifying access token normally
    const payload = jwt.verify(accessToken, JWT_SECRET);
    req.userId = payload.id;
    return next();
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return res.status(401).json({ error: "Invalid access token" });
    }
  }

  // Access token expired — try refresh token
  try {
    const refreshPayload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // Issue new access token
    const newAccessToken = jwt.sign(
      { id: refreshPayload.id },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Only send header if token is actually new
    if (newAccessToken !== accessToken) {
      res.setHeader("X-New-Access-Token", newAccessToken);
    }

    req.userId = refreshPayload.id;
    return next();
  } catch (refreshErr) {
    return res.status(401).json({ error: "Session expired, please login again" });
  }
};
