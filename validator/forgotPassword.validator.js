const Joi = require('joi');

const regexp = require('../config/regexp');

module.exports = Joi.object({
    password: Joi.string().required().regex(regexp.PASSWORD)
})