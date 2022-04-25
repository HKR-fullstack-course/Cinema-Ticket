const Joi = require("@hapi/joi");

const userRegisterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    repeat_password: Joi.any().valid(Joi.ref("password")).required(),
    phonenumber: Joi.string().required(),
  });
  return schema.validate(data);
};

const userLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports = { userRegisterValidation, userLoginValidation };
