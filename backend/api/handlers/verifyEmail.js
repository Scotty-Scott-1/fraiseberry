import { verifyEmail } from "../services/verifyEmail.js";

export const verifyEmailHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await verifyEmail(token);
    return res.status(result.status).json({ message: result.message });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
