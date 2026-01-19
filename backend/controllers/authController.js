import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvide from '../helpers/emailOlvide.js';
import pool from '../config/db.js';
import { crearToken } from '../helpers/crearToken.js';
import { encriptarPassword } from '../helpers/encriptarPassword.js';
import { decodificarToken } from '../helpers/decodificarToken.js';

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

    //validar si el email ya existe en bd
    const response = await pool.query('SELECT email FROM usuarios WHERE email=?', [email]);

    if (response[0][0] !== undefined) {
        return res.status(400).json({ error: 'El email ya existe en nuestra base de datos' });
    }

    const token = crearToken(req.body.email);
    const passwordEncriptado = await encriptarPassword(password);

    //console.log('test: ',passwordEncriptado);

    if (passwordEncriptado === 'error') {
        return res.status(500).json({ error: 'Error al generar el hash' });
    }

    //todo:guardar datos en bd
    try {
        const response = pool.query('INSERT INTO usuarios (nombre,apellido,email,password,confirmado,token) VALUES (?,?,?,?,0,?)', [nombre, apellido, email, passwordEncriptado, token]);
        response.then(data => {
            //console.log(data);
            try {
                //envio del email
                /*
                emailRegistro({
                    email: email,
                    nombre: `${nombre} ${apellido}`,
                    token: token
                });
                */
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
    const email = req.body.email;

    const response = await pool.query('SELECT * FROM usuarios WHERE email=?', [email]);

    if (response[0].length === 0) {
        return res.status(500).json({ error: 'El usuario no está registrado' });
    }

    //verificar que está confirmado
    if (response[0][0].confirmado === 0) {
        return res.status(500).json({ error: 'El usuario no está confirmado' });
    }

    const nombre = `${response[0][0].nombre} ${response[0][0].apellido}`;
    const token = crearToken(email);

    //insertar token en bd
    try {
        const respuesta = pool.query('UPDATE usuarios SET token=? WHERE email=?', [token, email]);

        try {
            //envio del email
            /*
            emailOlvide({
                email: email,
                nombre: nombre,
                token: token
            });
            */
            res.json({ mensaje: `El email, para modificar su password, se ha enviado correctamente` });

        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Ha habido un error' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Error al intentar modificar el campo token' });
    }

}

const logout = async (req, res) => {
    res.json({ mensaje: `Test OK en logout` });
}

const decodificaToken = async (req, res) => {
    const token = req.body.token;
    const secret = process.env.JWT_SECRET;
    const decodedToken = await decodificarToken(token, secret);
    
    if (decodedToken === 'error') {
        res.json({ decoded: 'error' });
    } else {
        res.json({ decoded: decodedToken });
    }


}

const confirmar = async (req, res) => {
    const email = req.params.email;

    try {
        const response = await pool.query('UPDATE usuarios SET confirmado=1,token="" WHERE email=?', [email]);
        res.json({ mensaje: response });
    } catch (error) {
        return res.status(400).json({ error: 'Ha habido un error' });
    }

}

export {
    login,
    registro,
    olvide,
    logout,
    decodificaToken,
    confirmar
}