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

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Check Entered Email"),
  });
  return schema.validate(data);
};

export const validateAddingMovie = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(6)
      .label("Name Of The Movie is Required (at least 6 char)"),
    release_date: Joi.string().label("Release Date is Required"),
    director: Joi.string().required().label("Director name is Required"),
    show_long: Joi.number()
      .required()
      .label("Show Long is Required Only as Number"),
    budget: Joi.number().required().label("Budget is Required as Number"),
    movie_type: Joi.string().required().label("Choose the Movie Genre"),
    show_time: Joi.string().required().label("Please Add Screening Time"),
    rate: Joi.number().required().label("Please add Rating"),
    age_range: Joi.number()
      .required()
      .label("Please Add the Minimum age to view"),
    description: Joi.string().required().label("Please Add Movie Synopsis"),
    ticket_price: Joi.number()
      .required()
      .label("Please Add Ticket Price Only as Numbers"),
    number_of_seats: Joi.number()
      .required()
      .min(0)
      .label("Number Of Seats Must be Only Numbers"),
  });
  return schema.validate(data);
};
