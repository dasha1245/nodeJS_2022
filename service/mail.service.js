const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const envDefConfigs = require('../config/env.config');
const emailTemplates = require('../emailTemplates');
const ApiError = require("../error/apiError");

const sendMail = async (receiver, emailAction, context = {}) => {
    const transporter = nodemailer.createTransport({
        from: 'No-reply email.',
        service: 'gmail',
        auth: {
            user: envDefConfigs.NO_REPLY_EMAIL, //no-replay mail sender
            pass: envDefConfigs.NO_REPLY_EMAIL_PASS  //password to mail sender
        }
    });

    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo) {
        throw new ApiError('No template', 500)
    }

    const options = {
        viewEngine: {
            defaultLayout: 'main',
            layoutsDir: path.join(process.cwd(), 'emailTemplates', 'layout'),
            partialsDir: path.join(process.cwd(), 'emailTemplates', 'partial'),
            extname: '.hbs',
        },
        extName: '.hbs',
        viewPath: path.join(process.cwd(), 'emailTemplates', 'view'),
    };

    transporter.use('compile', hbs(options));

    return transporter.sendMail({
        to: receiver, //receiver email
        subject: templateInfo.subject,
        template: templateInfo.templateName,
        context
    })
};

module.exports = {sendMail}