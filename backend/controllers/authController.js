import emailRegistro from '../helpers/emailRegistro.js';
import pool from '../config/db.js';
import { crearToken } from '../helpers/crearToken.js';
import { encriptarPassword } from '../helpers/encriptarPassword.js';
import {decodificarToken} from '../helpers/decodificarToken.js';

const login = async (req, res) => {
    res.json({ mensaje: `Test OK en login` });
}

const registro = async (req, res) => {

    const { nombre, apellido, email, password, password2 } = req.body;

    if (!nombre | !apellido | !email | !password) {
        return res.status(400).json({ error: 'Alguno de los campos no se ha cumplimentado' });
    }

    if (password !== password2) {
        return res.status(400).json({ error: 'Los password no son iguales' });
    }

    const token=crearToken(req.body.email);
    const passwordEncriptado=await encriptarPassword(password);

    console.log('test: ',passwordEncriptado);

    if(passwordEncriptado==='error'){
        return res.status(500).json({ error: 'Error al generar el hash' });
    }
    
    //todo:guardar datos en bd
    try {
        const response = pool.query('INSERT INTO usuarios (nombre,apellido,email,password,confirmado,token) VALUES (?,?,?,?,0,?)', [nombre, apellido, email, passwordEncriptado,token]);
        response.then(data => {
            console.log(data);
            try {
                //envio del email
                emailRegistro({
                    email: email,
                    nombre: `${nombre} ${apellido}`,
                    token: token
                });

                res.json({ mensaje: `El email se ha enviado correctamente` });

            } catch (error) {
                console.log(error);
                return res.status(400).json({ error: 'Ha habido un error en el envío del email' });
            }
        });



    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar los datos' });
    }

}

const olvide = async (req, res) => {
    res.json({ mensaje: `Test OK en olvide` });
}

const logout = async (req, res) => {
    res.json({ mensaje: `Test OK en logout` });
}

const envioEmail = async (req, res) => {
    //res.json('Funciona!');

    try {
        //envio del email
        email({
            email: 'ireneog_72@hotmail.es',
            nombre: 'Irene Olmos'
        });

        res.json({ mensaje: `El email se ha enviado correctamente` });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Ha habido un error' });
    }
}

const decodificaToken=async(req,res)=>{
    //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaGFrdUBoYWt1LmVzIiwiaWF0IjoxNzY4NzM4ODU4LCJleHAiOjE3Njg5MTE2NTh9.jbPYTfHIe2D7-NXMwLcVo5Ya-4uTCjpk8Jj2iBPZ-po';
    const token=req.body.token;
    const secret='superIrene';
    const decodedToken=decodificarToken(token,secret);
    res.json({ decoded: decodedToken});
 
}

export {
    envioEmail,
    login,
    registro,
    olvide,
    logout,
    decodificaToken
}