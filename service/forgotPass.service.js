const jwt = require("jsonwebtoken");

const forgotPassDB = require("../dataBase/forgotPassword.dataBase");
const ApiError = require("../error/apiError");
const authHelper = require("../helper/auth.helper");

module.exports = {
    createActionToken: (actionType, dataToSign) => {

        const secret = authHelper.generateActionTokenSecret(actionType)

        return jwt.sign(dataToSign, secret, {expiresIn: '7d'});

    },

    insertActionTokensToDB: (newData) => {
        return forgotPassDB.create(newData);
    },

    deleteActionToken: (token) => {
        return forgotPassDB.deleteOne({token})
    },

    checkActionToken: (token, tokenAction) => {
        try {
            const secret = authHelper.generateActionTokenSecret(tokenAction);

            return jwt.verify(token, secret)
        } catch (e) {

            throw new ApiError('Action token is not valid', 401)
        }
    },

    findTokenInDB: (filter= {}) => {
        return forgotPassDB.findOne(filter)
    }
}