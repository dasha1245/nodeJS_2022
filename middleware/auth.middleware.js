const tokenActions = require('../config/token.action');
const ApiError = require("../error/apiError");
const authService = require("../service/auth.service");
const forgotPassService = require("../service/forgotPass.service");
const authValidator = require('../validator/auth.validator');
const forgPassValidator = require('../validator/forgotPassword.validator');

module.exports = {
    isLoginBodyValid: async (req, res, next) => {
        try {
            const validate = await authValidator.loginValidator.validate(req.body)

            if(validate.error){
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },

    isForgotPassBodyValid: async (req, res, next) => {
        try {
            const validate = await forgPassValidator.validate(req.body)

            if(validate.error){
                throw new ApiError(validate.error.message, 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization')

            if(!accessToken) {
                throw new ApiError('Access token is required', 401)
            }
            await authService.checkTokens(accessToken)

            const tokenInfo = await authService.findOneByParams({accessToken})
            if(!tokenInfo){
                throw new ApiError('Access token is not valid', 401)
            }

            req.tokenInfo = tokenInfo
            next()
        } catch (e) {
            next(e)
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization')
            if(!refreshToken){
                throw new ApiError('Refresh token is required', 401)
            }

            await authService.checkTokens(refreshToken, 'refreshToken')

            const tokenInfo = await authService.findOneByParams({refreshToken})

            console.log(tokenInfo);

            if(!tokenInfo){
                throw new ApiError('Refresh token is not valid', 401)
            }

            req.tokenInfo = tokenInfo
            next()

        } catch (e) {
            next(e)
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization')

            if(!actionToken){
                throw new ApiError('Action token is required', 401)
            }

            await forgotPassService.checkActionToken(actionToken, tokenActions.FORGOT_PASSWORD)

            const tokenInfo = await forgotPassService.findTokenInDB({token: actionToken, tokenType: tokenActions.FORGOT_PASSWORD})

            if(!tokenInfo){
                throw new ApiError('Action token is not valid', 401)
            }

            req.user = tokenInfo._user_id
            next()

        } catch (e) {
            next(e)
        }
    },
}