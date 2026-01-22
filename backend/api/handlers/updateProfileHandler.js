
export const updateProfileHandler = async (req, res) => {
  try {
    const { profileData } = req.body;
    const result = await updateProfileController(formData);
    console.log(result);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
