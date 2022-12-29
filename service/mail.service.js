const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path')

const {envDefConfigs} = require('../config')
const ApiError = require("../error/apiError");
const emailTemplates = require('../emailTemplates')

const sendMail = async (receiver, emailAction, locals = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envDefConfigs.NO_REPLY_EMAIL, //no-replay mail sender
            pass: envDefConfigs.NO_REPLY_EMAIL_PASS  //password to mail sender
        }
    });

    const templateInfo = emailTemplates[emailAction]

    if (!templateInfo) {
        throw new ApiError('No template', 500)
    }

    const templateRender = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'emailTemplates')
        }
    })
    const html = await templateRender.render(templateInfo.templateName, locals)

    return transporter.sendMail({
        from: 'No-reply email.',
        to: receiver, //receiver email
        subject: templateInfo.subject,
        html
    })
}

module.exports = {sendMail}