const Joi = require("joi"); // Use uppercase 'Joi' when requiring the module

// Define schemas for registration and login validation
const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    contactNumber: Joi.string().min(8).max(15).required(), // Assuming contact number has a required length
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

// Middleware to validate user input based on the provided schema
const validateUser = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    next();
  };
};

module.exports = { validateUser, schemas };
