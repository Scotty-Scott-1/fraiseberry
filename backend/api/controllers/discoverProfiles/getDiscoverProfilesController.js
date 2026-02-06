import { getDiscoverProfilesService } from "../../services/getDiscoverProfiles.js";

export const getDiscoverProfilesController = async (userId) => {

  return await getDiscoverProfilesService(userId);
};
