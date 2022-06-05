const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.API_KEY);

class MailService {
    constructor() {
    }

    async sendActivationMail(email, link) {
        await sgMail.send({
            to: email,
            from: 'groomroomtest@gmail.com',
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            content: [
                {
                    "type": "text/html",
                    "value":
                        `
                            <div>
                                <h1>Для активации перейдите по ссылке</h1>
                                <a href="${link}">${link}</a>
                            </div>
                        `
                }
            ]
        })
    }
}

module.exports = new MailService();