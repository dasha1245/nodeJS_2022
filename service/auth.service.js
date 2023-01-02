const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {envDefConfigs} = require('../config')
const {authDataBase} = require('../dataBase')
const ApiError = require("../error/apiError");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword);
        if (!isPasswordSame) {
            throw new ApiError('Wrong email or password.', 400)
        }
    },

    createPairTokens: (dataToSign) => {
        const accessToken = jwt.sign(dataToSign, envDefConfigs.ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, envDefConfigs.REFRESH_SECRET, {expiresIn: '30m'});
        return {
            accessToken,
            refreshToken
        }
    },

    insertPairTokensToDB:  (newData) => {
        return authDataBase.create(newData);
    },

    findOneByParams:  (filter = {}) => {
        return authDataBase.findOne(filter)

    },

    deleteTokensPair:  (token) => {
        return authDataBase.deleteOne({token})
    },

    deleteAllTokensPair:  (userId) => {
        return authDataBase.deleteMany({userId})
    },

    checkTokens: async (token = '', tokenType = 'accessToken') => {
        try {
            let secret = ''

            if (tokenType === 'accessToken') secret = envDefConfigs.ACCESS_SECRET
            else if (tokenType === 'refreshToken') secret = envDefConfigs.REFRESH_SECRET

            return jwt.verify(token, secret)
        } catch (e) {
            if (tokenType === 'refreshToken') {
                await authDataBase.deleteOne({refreshToken: token})
                throw new ApiError('Refresh token is not valid', 401)
            }

            throw new ApiError('Access token is not valid', 401)
        }

    },

}


