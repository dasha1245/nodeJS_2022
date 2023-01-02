const Joi = require("joi");

const {regexp} = require('../config')

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(25).required().default(''),
        age: Joi.number().min(1).max(120).integer(),
        email: Joi.string().trim().required().lowercase().regex(regexp.EMAIL),
        password: Joi.string().required().regex(regexp.PASSWORD)
    }),
    editUserValidator: Joi.object({
        name: Joi.string().min(2).max(25).optional(),
        age: Joi.number().min(1).max(120).integer().optional(),
        email: Joi.string().trim().optional().lowercase().regex(regexp.EMAIL)
    })
}