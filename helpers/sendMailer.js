const nodemailer = require('nodemailer');
const { google } = require('googleapis')

const CLIENT_ID = '898861883224-0m964uh8bt0e6tufuhib1elj37rd4gn2.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04XB2WrwLdvKwCgYIARAAGAQSNwF-L9IrXQXV3VJfq6oj6RIoaeMNFUQZj2uWWHIl-gsPNb-iRJgfTelrBHLwqHxWkgCR2YXkMcw';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })


const sendMailer = async(tomailer) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'anandakrishnanrajendren@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOption = {
            from: 'anandakrishnanrajendren@gmail.com',
            to: tomailer,
            subject: 'Hello from Api',
            text: 'Hello from APi anandakrishnanrajendren@gmail.com',
            html: '<h1>Testing OTP</h1>'
        }

        const result = await transport.sendMail(mailOption);
        return result;
    } catch (err) {
        return err;
    }
}

module.exports = sendMailer;