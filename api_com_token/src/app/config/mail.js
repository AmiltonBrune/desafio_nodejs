module.exports = function(to, subject, text){
    const nodemailer = require('nodemailer');
    const env = require('./env.js');
    
    const smtpTransport = nodemailer.createTransport({
        host: env.SMTP_SERVER,
        port: parseInt(env.SMTP_PORT),
        secure: false,
        auth: {user: env.SMTP_USERNAME, pass: env.SMTP_PASSWORD}
    });

    const message = {
        from: env.SMTP_USERNAME,
        to,
        subject,
        text
    }

    smtpTransport.sendMail(message, (err, res) => {
        if(err)
            console.log('Erro ao enviar email: ' + err);
        else
            console.log('Email enviado com sucesso!');
        smtpTransport.close();
    })
}