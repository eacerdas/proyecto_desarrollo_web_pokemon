const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'developerssofties@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendRegistrationEmail = (email, nombre, password) => {
    const mailOptions = {
        from: 'developerssofties@gmail.com',
        to: email,
        subject: 'Registro Exitoso - Tu Contraseña Temporal',
        text: `Hola ${nombre},\n\nGracias por registrarte en PokéDuels. Tu contraseña temporal es: ${password}\n\nPor favor, cámbiala después de iniciar sesión.\n\n¡Saludos!\nEquipo PokéDuels`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};

module.exports = {
    sendRegistrationEmail
};
