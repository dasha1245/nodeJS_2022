const envDefConfigs = require("../config/env.config");
const tokenActions = require("../config/token.action");

module.exports = {

    generateActionTokenSecret: (actionType) => {
        let secret = '';

        switch (actionType){
            case tokenActions.FORGOT_PASSWORD:
                secret = envDefConfigs.FORGOT_PASSWORD_ACTION_TOKEN_SECRET
                break
        }

        return secret
    }
}