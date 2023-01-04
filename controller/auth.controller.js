const emailActions = require('../config/email.actions');
const envDefConfigs = require('../config/env.config');
const tokenActions = require('../config/token.action');
const authService = require('../service/auth.service');
const emailService = require('../service/mail.service');
const forgotPassService = require('../service/forgotPass.service');
const userService = require('../service/user.service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req
            // await authService.comparePasswords(user.password, body.password)

            await user.comparePasswords(body.password)
            // await emailService.sendMail('daria.cherkasova.sr.2021@lpnu.ua', emailActions.WELCOME, {userName: user.name})

            const tokenPair = authService.createPairTokens({id: user._id});

            const insertedData = await authService.insertPairTokensToDB({...tokenPair, _user_id: user._id})


            res.json(insertedData)

        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo

            await authService.deleteTokensPair(refreshToken)

            const tokenPair = authService.createPairTokens({id: _user_id})

            const insertedData = await authService.insertPairTokensToDB({...tokenPair, _user_id})
            res.json(insertedData)

        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo

            await authService.deleteTokensPair(accessToken)

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo
            await authService.deleteAllTokensPair({_user_id})

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user

            const actionToken = await forgotPassService.createActionToken(tokenActions.FORGOT_PASSWORD, {userId: user.email});

            await forgotPassService.insertActionTokensToDB({
                token: actionToken,
                _user_id: user._id,
                tokenType: tokenActions.FORGOT_PASSWORD
            })

            const forgotPassFEUrl = `${envDefConfigs.FRONTEND_URL}/password/forgot?token=${actionToken}`

            await emailService.sendMail(user.email, emailActions.FORGOT_PASS, {
                userName: user.name,
                url: forgotPassFEUrl
            })

            res.json({
                actionToken: actionToken
            })
        } catch (e) {
            next(e)
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const user = req.user

            const hashPassword = await authService.hashPassword(req.body.password);

            await userService.updateUser(user._id, {password: hashPassword})

            await forgotPassService.deleteActionToken(req.get('Authorization'))

            res.json('Success')
        } catch (e) {
            next(e)
        }
    }
}