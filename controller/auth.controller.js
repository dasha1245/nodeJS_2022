const {authService} = require('../service')

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req
            await authService.comparePasswords(user.password, body.password)

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

            const tokenPair = authService.createPairTokens({id: _user_id })

            const insertedData = await authService.insertTokensToDB({...tokenPair, _user_id})
            res.json(insertedData)

        } catch (e) {
            next(e)
        }
    }
}