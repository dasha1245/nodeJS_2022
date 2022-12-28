const ApiError = require('../error/apiError');
const {userService} = require('../service');
const {commonValidator, userValidator} = require('../validator')

module.exports = {
    getUserDynamically: (fieldName, from, dbFieldName = fieldName) => async (req, res, next) => {
        try {
            const searchedField = req[from][fieldName];

            const user = await userService.getOneByParams({[dbFieldName] : searchedField})

            if (!user) {
                throw new ApiError('User not found.', 404)
            }
            req.user = user
            next()

        } catch (e) {
            next(e)
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email){
                throw new ApiError('Email is not present.', 400)
            }

            const user = await userService.getOneByParams({email})

            if(user){
                throw new ApiError('This email is already used.', 409)
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isNewUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.newUserValidator.validate(req.body)
            if(validate.error){
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value
            next()
        } catch (e) {
            next(e)
        }
    },
    isEditUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.editUserValidator.validate(req.body)
            if(validate.error){
                throw new ApiError(validate.error.message, 400)
            }

            req.body = validate.value
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params
            const validate = commonValidator.idValidator.validate(userId);
            if(validate.error){
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}