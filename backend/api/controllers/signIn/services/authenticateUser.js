import { User } from "../../../../database/models/index.js";

export const authenticateUserService = async (email, password) => {
try {

	if (!email) throw new Error("email not provided");
	if (!password) throw new Error("password not provided");

	const user = await User.findOne({ where: { email } });

	if (!user) throw new Error("email not found");
	if (!user.isVerified) throw new Error("email not verified");

	// Prevent bot accounts from signing in
	if (user.isBot) throw new Error("bot account login disabled");

	const isMatch = await user.checkPassword(password);

	if (!isMatch) throw new Error("Invalid password");

	return user;

} catch(err) {
    throw new Error(err.message);
}
};
