import email from '../helpers/email.js';
import pool from '../config/db.js';

const envioEmail=async (req, res) => {
    //res.json('Funciona!');

    try {
        //envio del email
        email({
            email:'ireneog_72@hotmail.es',
            nombre: 'Irene Olmos'
        });

        res.json({mensaje:`El email se ha enviado correctamente`});

    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:'Ha habido un error'});
    }
}

export {
    envioEmail,
}