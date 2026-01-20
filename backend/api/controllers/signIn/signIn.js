import { User, authenticateUserService, mfaRquiredService, accessTokenService } from "./services/index.js";


export const signInController = async (email, password) => {
  try {

    const user = await authenticateUserService(email, password);
    const result1 = await mfaRquiredService(user);

    if (result1.mfaRequired) {
      // mfa flow
    }

    return await accessTokenService(user);




  } catch {


  }
}
