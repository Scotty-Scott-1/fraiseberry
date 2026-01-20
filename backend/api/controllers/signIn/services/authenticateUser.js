import { User } from "../../../database/models/User.js";

export const authenticateUserService = async (email, password) => {
try {

	if (!email) throw new Error("email not provided");
	if (!password) throw new Error("password not provided");

	const user = await User.findOne({ where: { email } });

	if (!user) throw new Error("email not found");
	if (!user.isVerified) throw new Error("email not verified");;

	const isMatch = await user.checkPassword(password);

	if (!isMatch) throw new Error("Invalid password");

	return user;

} catch(err) {
	console.error(err);
    throw new Error(err.message);
}
};
