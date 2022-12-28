const {authValidator} = require('../validator')
const ApiError = require("../error/apiError");
const {authService} = require("../service");

module.exports = {
    isBodyValid: async (req, res, next) => {
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
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization')

            if(!accessToken) {
                throw new ApiError('Access token is required', 401)
            }
            authService.checkTokens(accessToken)

            const tokenInfo = await authService.findOneByParams({accessToken})
            if(!tokenInfo){
                throw new ApiError('Access token is not valid', 401)
            }
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

            if(!tokenInfo){
                throw new ApiError('Refresh token is not valid', 401)
            }

            req.tokenInfo = tokenInfo
            next()

        } catch (e) {
            next(e)
        }
    }
}