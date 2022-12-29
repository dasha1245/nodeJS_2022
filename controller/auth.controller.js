const {WELCOME} = require("../config/email.actions");
const {authService, emailService} = require('../service')

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req
            await authService.comparePasswords(user.password, body.password)

            // await emailService.sendMail('daria.cherkasova.sr.2021@lpnu.ua', WELCOME, {userName: user.name})

            const tokenPair = authService.createPairTokens({id: user._id});

            const insertedData = await authService.insertTokensToDB({...tokenPair, _user_id: user._id})


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

            const insertedData = await authService.insertTokensToDB({...tokenPair, _user_id})
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
            await authService.deleteAllTokensPair(_user_id)

            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
}