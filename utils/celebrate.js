const { Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const url = /^(https?:\/\/)?([\w\W\.]+)\.([a-z]{2,6}\.?)(\/[\w\W\.]*)*\/?$/i;

const ShemaCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(url),
  }).unknown(),
};
const ShemaLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(),
};
const ShemaUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(url),
  }).unknown(),
};
module.exports = { ShemaCard, ShemaLogin, ShemaUser };
