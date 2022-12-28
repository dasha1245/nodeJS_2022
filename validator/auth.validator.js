const Joi = require("joi");

const {regexp} = require('../config');

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().trim().lowercase().required().regex(regexp.EMAIL),
        password: Joi.string().required().regex(regexp.PASSWORD)
    })
};