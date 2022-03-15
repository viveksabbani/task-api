const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_TOKEN);

const sendWelcomeEmail = (email, name) =>{
    sendgrid.send({
        to: email,
        from: "sabbanivivek@gmail.com",
        subject: "Thanks for joining in!",
        text: `Hi ${name}!. Welcome to task manager application. Hope you love using our application.`
    });
}

const sendCancelationEmail = (email,name) =>{
    sendgrid.send({
        to: email,
        from: "sabbanivivek@gmail.com",
        subject: "Thanks for being a valuable user",
        text: `Hi ${name}! Sorry to see you go. Please feel free to share your feedback, so that we can improve user experience.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
