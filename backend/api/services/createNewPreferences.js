import { Preferences } from "../../database/models/index.js";

export const createPreferencesService = async (userId) => {
  try {
	const preferences = await Preferences.create({
		userId
	});
	return preferences;
  } catch(err) {
	console.error(err);
	throw new Error("Failed to create profile in db", { cause: err });
  }
}
