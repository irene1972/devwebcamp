import nodemailer from 'nodemailer';

const emailRegistro=async (datos)=>{
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });
    const {email,nombre,token}=datos;
    //enviar email
    const info=await transporter.sendMail({
        from:'DevWebCamp',
        to:email,
        subject:'Envio de email prueba',
        text:'Confirma que ha llegado el email',
        html:`
                <p>Hola: ${nombre}, has registrado correctamente tu cuenta en DevWebCamp, pero es necesario confirmarla</p>
                <p>Presiona aquí: <a href='${process.env.FRONTEND_URL}/confirmar-cuenta?token=${token}'>Confirmar Cuenta</a></p>
                <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
            `
    });
}

export default emailRegistro;