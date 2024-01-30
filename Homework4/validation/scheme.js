const Joi = require("joi");

const userScheme = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().integer().min(0).required(),
  city: Joi.string().min(1),
});

const idScheme = Joi.object({
  id: Joi.number().required(),
});

module.exports = { userScheme, idScheme };
