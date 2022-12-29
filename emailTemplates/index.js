const {emailActions} = require('../config')
module.exports = {
    [emailActions.WELCOME]: {
        subject: 'Welcome to our team!',
        templateName: 'welcome'
    },
    [emailActions.FORGOT_PASS]: {
        subject: 'Dont worry, be happy :)',
        templateNae: 'forgotPass'
    }
}