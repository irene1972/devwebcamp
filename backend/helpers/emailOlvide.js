import nodemailer from 'nodemailer';

const emailOlvide=async (datos)=>{
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
        subject:'Restablece tu password',
        text:'Restablece tu password',
        html:`
                <p>Hola: ${nombre}, has solicitado restablecer tu password, sigue el siguiente enlace para hacerlo.</p>
                <p>Presiona aquí: <a href='${process.env.FRONTEND_URL}/restablecer?token=${token}'>Restablecer Password</a></p>
                <p>Si tú no solicitaste este cambio, puedes ignorar el mensaje.</p>
            `
    });
}

export default emailOlvide;