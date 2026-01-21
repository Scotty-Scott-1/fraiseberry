import { User, authenticateUserService, mfaRquiredService, accessTokenService } from "./services/index.js";


export const signInController = async (email, password) => {

    const user = await authenticateUserService(email, password);
    const result =  mfaRquiredService(user);

    if (result.mfaRequired) return result;

    return accessTokenService(user);

}
