const Joi = require("@hapi/joi");

const movieValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    release_date: Joi.date().required(),
    director: Joi.string().min(8).max(255).required(),
    movie_type: Joi.string().min(7).max(512),
    description: Joi.string().max(1024),
    rate: Joi.number().default(-1),
    budget: Joi.string(),
    main_actirs: Joi.array().required(),
    ticket_price: Joi.number().required(),
    show_time: Joi.string().required(),
    age_range: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = { movieValidation };
