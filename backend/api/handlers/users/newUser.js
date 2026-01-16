import { createNewUser } from "../../services/users/createNewUser.js";

export const newUserHandler = async (req, res) => {
  try {
    const user = await createNewUser(req.body);
    res.status(201).json(user);

  } catch (err) {
    // Handle errors thrown by the service
    // Here we return 400 for known issues (validation, email in use)
    // and 500 for unexpected errors
    const isKnownError = [
      "Email already in use",
      "You must agree to the terms",
      "Invalid email format",
      "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, 1 symbol",
      "First name is required",
      "Last name is required"
    ].includes(err.message);
    res.status(isKnownError ? 400 : 500).json({ message: err.message });
  }
};
