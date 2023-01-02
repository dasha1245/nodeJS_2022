const Joi = require('joi');

const {regexp} = require('../config')

module.exports = Joi.object({
    password: Joi.string().required().regex(regexp.PASSWORD)
})