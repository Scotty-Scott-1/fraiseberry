import Joi from "joi";
import crypto from "crypto";
import { User } from "../../../database/models/User.js";
import { sendMail } from "../../../email/resendMailer.js";

const userSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(30)
    .pattern(/^[a-zA-Z'\-]+$/)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.pattern.base": "First name can only contain letters, hyphens and apostrophes",
    }),
  lastName: Joi.string()
    .min(1)
    .max(30)
    .pattern(/^[a-zA-Z'\-]+$/)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.base": "Last name can only contain letters, hyphens and apostrophes",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, 1 symbol",
    }),
  agree: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      "any.only": "You must agree to the terms",
    }),
});

export const createNewUser = async (userData) => {

  const baseUrl = "http://localhost:5173";

  // Validate input
  const { error } = userSchema.validate(userData);
  if (error) throw new Error(error.details[0].message);

  // Check if verified user exists
  const existingVerifiedUser = await User.findOne({
    where: {
      isVerified: true,
      email: userData.email,
    },
  });
  if (existingVerifiedUser) throw new Error("Email already in use");

  // Create verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Create user
  const user = await User.create({
    ...userData,
    isVerified: false,
    verificationToken,
    tokenExpiry,
  });

  // Send verification email
  try {
    await sendMail({
      to: user.email,
      subject: "Verify your account",
      text: `
Hello ${user.firstName} ${user.lastName},

Thanks for signing up to fraiseberry.

Please verify your account by clicking the link below:

${baseUrl}/email?token=${verificationToken}

Kind regards,
Simulator
      `,
      html: `
<p>Hello ${user.firstName} ${user.lastName},</p>
<p>Thanks for signing up to fraiseberry.</p>
<p>Please verify your account by clicking the link below:</p>
<p><a href="${baseUrl}/email?token=${verificationToken}">Verify your account</a></p>
<p>Kind regards,<br/>Simulator</p>
      `,
    });

    console.log("✉️ [New User] Account verification email sent successfully");
  } catch (err) {
    console.error("✉️ [New User] Failed to send verification email", err);
    throw new Error("Verification email failed to send");
  }

  // Return user data without password
  const { password, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
};
