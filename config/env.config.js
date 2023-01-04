module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL,
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'AccessWord',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'RefreshWord',

    NO_REPLY_EMAIL: process.env.NO_REPLY_MAIL,
    NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_PASS,

    FORGOT_PASSWORD_ACTION_TOKEN_SECRET: process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'confAcc',

    TWILIO_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID
}