const Joi = require("@hapi/joi");

const movieValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    release_date: Joi.string().required(),
    director: Joi.string().required(),
    movie_type: Joi.string(),
    description: Joi.string().max(1024),
    rate: Joi.number().default(-1),
    budget: Joi.number(),
    main_actors: Joi.array().required(),
    ticket_price: Joi.number().required(),
    show_long: Joi.number().required(),
    show_time: Joi.string().required(),
    age_range: Joi.number().required(),
    number_of_seats: Joi.required(),
  });
  return schema.validate(data);
};

module.exports = { movieValidation };
