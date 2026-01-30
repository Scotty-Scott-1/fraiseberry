import Joi from "joi";

// Define the signup schema
const userSignUpSchema = Joi.object({
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
      "string.pattern.base":
        "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, 1 symbol",
    }),
  agree: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      "any.only": "You must agree to the terms",
    }),
});

export const validateUserSignUp = async (userData) => {
  const { error } = userSignUpSchema.validate(userData, { abortEarly: false });
  if (error) {
    throw new Error(error.details[0].message);
  }
};
