const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/apiError");
const {authDataBase} = require('../dataBase')
const {envDefConfigs} = require('../config')

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
    insertTokensToDB: async (newData) => {
        const insertedData = await authDataBase.create(newData);

        return insertedData
    },


    findOneByParams: async (filter = {}) => {
        const searchedInfo = await authDataBase.findOne(filter)
        return searchedInfo
    },

    deleteTokensPair: async function (token) {
        return authDataBase.deleteOne({token})
    },
    deleteAllTokensPair: async function (userId) {
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


