import emailRegistro from '../helpers/emailRegistro.js';
import pool from '../config/db.js';

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

    //todo:guardar datos en bd
    try {
        const response = pool.query('INSERT INTO usuarios (nombre,apellido,email,password) VALUES (?,?,?,?)', [nombre, apellido, email, password]);
        response.then(data => {
            console.log(data);
            try {
                //envio del email
                emailRegistro({
                    email: email,
                    nombre: `${nombre} ${apellido}`
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

export {
    envioEmail,
    login,
    registro,
    olvide,
    logout
}