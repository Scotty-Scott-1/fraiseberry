import jwt from "jsonwebtoken";

export const mfaRquiredService = (user) => {

  // if MFA enabled: create and return temp jwt

const JWT_SECRET = process.env;


  if (user.mfaEnabled) {
    const tempToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "5m" }
    );
    return {
      status: 200,
      mfaRequired: true,
      tempToken,
      message: "MFA required"
    };
  } else {
    return {
      status: 200,
      mfaRequired: false,
      message: "MFA not required"
    };
  }

}


