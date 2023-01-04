const smsAction = require('../config/sms.action')

module.exports = {
    [smsAction.WELCOMING]: (name) => {
        return `Hello, ${name}! Your free trial is ending. 
        Payment will be withdrawn automatically tonight. \n To unsubscribe, contact the manager named Dasha.`
    }
}