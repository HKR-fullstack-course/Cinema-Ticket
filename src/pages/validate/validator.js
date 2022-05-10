import Joi from "joi";

export const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .max(20)
      .required()
      .label("Name Must be between 6-20 Character"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Check Entered Email"),
    phone: Joi.number()
      .min(10)
      .required()
      .label("Phone Number Must Has Only Numbers With Length 10-14"),
    pwd: Joi.string()
      .min(8)
      .max(25)
      .required()
      .label("Password Length Must be 8-25"),
    confPwd: Joi.string()
      .required()
      .valid(Joi.ref("pwd"))
      .label("Confirm Password Must Match Password"),
    birthdate: Joi.date().required().label("Please Enter Your Birthdate"),
  });
  return schema.validate(data);
};
