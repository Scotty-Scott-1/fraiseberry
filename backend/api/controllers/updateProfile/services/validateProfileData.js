import Joi from "joi";

const profileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "Name must be text",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be at most 50 characters",
      "any.required": "Name is required",
    }),

  bio: Joi.string()
    .max(5000)
    .allow("")
    .messages({
      "string.base": "Bio must be text",
      "string.max": "Bio cannot exceed 5000 characters",
    }),

  age: Joi.number()
    .integer()
    .min(18)
    .max(100)
    .required()
    .messages({
      "number.base": "Age must be a number",
      "number.integer": "Age must be an integer",
      "number.min": "You must be at least 18 years old",
      "number.max": "Age cannot be more than 100",
      "any.required": "Age is required",
    }),

  gender: Joi.string()
    .valid("male", "female", "non-binary", "other")
    .required()
    .messages({
      "any.only": "Gender must be one of: male, female, non-binary, other",
      "any.required": "Gender is required",
    }),
});

export const validateProfileService = (userData) => {
  const { value, error } = profileSchema.validate(userData, { abortEarly: false, stripUnknown: true });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};
