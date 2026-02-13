export const logoutHandler = (req, res) => {
  try {
    // Clear the refresh token cookie set at sign-in
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
