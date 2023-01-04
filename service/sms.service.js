const twilio = require('twilio');

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} = require('../config/env.config');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSms = async (message) => {
    try {
        const smsResp = await client.messages.create({
            body: message,
            to: 'phone number', //someone number
            messagingServiceSid: TWILIO_SERVICE_SID
        })

    } catch (e) {
        console.log(`Sms service ${e.message}`)
    }
};

module.exports = {
    sendSms
}

