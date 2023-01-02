const {tokenActions, envDefConfigs} = require("../config");

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