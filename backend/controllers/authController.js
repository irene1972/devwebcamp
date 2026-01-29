import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvide from '../helpers/emailOlvide.js';
import matchPassword from '../helpers/matchPassword.js';
import { crearToken } from '../helpers/crearToken.js';
import { encriptarPassword } from '../helpers/encriptarPassword.js';
import { decodificarToken } from '../helpers/decodificarToken.js';
import { Auth } from '../models/Auth.js';

const auth = new Auth();

const login = async (req, res) => {
    const { email, password } = req.body;

    //hacer consulta a bd para recuperar los datos del usuario
    try {
        const response = await auth.getUserByEmail(email);

        if (response[0].length === 0) {
            return res.status(500).json({ error: 'Usuario no registrado' });
        }
        const usuario = response[0][0];

        if (usuario.confirmado == 0) {
            return res.status(500).json({ error: 'Usuario no confirmado' });
        }

        //compara el password con el extraido de usuario, deben ser iguales
        const coincidencia = await matchPassword(password, usuario.password);

        if (!coincidencia) {
            return res.status(500).json({ error: 'La contraseña no coincide' });
        }

        const token = crearToken(email);

        try {
            await auth.updateTokenByEmail(token, email);
            res.json({ mensaje: token, admin: usuario.admin });
        } catch (error) {
            return res.status(500).json({ error: 'Error al actualizar en bd el token' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar el usuario' });
    }



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
    const response = await auth.getEmailByEmail(email);

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
        await auth.insertUser(nombre, apellido, email, passwordEncriptado, token);

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



    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar los datos' });
    }

}

const olvide = async (req, res) => {
    const email = req.body.email;

    const response = await auth.getUserByEmail(email);

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
        await auth.updateTokenByEmail(token, email);
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
        const response = await auth.updateConfirmadoAndTokenByEmail(email);
        res.json({ mensaje: response });
    } catch (error) {
        return res.status(400).json({ error: 'Ha habido un error' });
    }

}

const restablecer = async (req, res) => {
    const token = req.body.token;
    const nuevoPassword = req.body.password;

    //decodificar el token para extraer el email
    const secret = process.env.JWT_SECRET;
    const decodedToken = await decodificarToken(token, secret);
    const email = decodedToken.user;

    //hacer consulta a bd para recuperar los datos del usuario
    const response = await auth.getUserByEmail(email);
    if (response[0].length === 0) {
        return res.status(500).json({ error: 'Token inválido' });
    }
    const usuario = response[0][0];
    //res.json(usuario);

    if (usuario.confirmado == 1) {
        //actualizar el password (hasheado) y borrar el token
        const nuevoPasswordEncriptado = await encriptarPassword(nuevoPassword);

        try {
            await auth.updatePasswordAndTokenByEmail(nuevoPasswordEncriptado, email);
            res.json({ mensaje: 'Se han actualizado los datos correctamente' });

        } catch (error) {
            return res.status(400).json({ error: 'Error al actualizar los datos' });
        }

    } else {
        return res.status(500).json({ error: 'El usuario no está confirmado' });
    }


}

const isAdmin = async (req, res) => {
    const email = req.body.email;

    try {
        const response = await auth.getAdminByEmail(email);
        if (response[0].length === 0) {
            return res.status(404).json({ error: 'No hay datos' });
        } else {
            return res.json({ mensaje: response[0][0].admin });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }


}

const obtenerUsuarioPorEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const response = await auth.getUserByEmail(email);

        if (response[0].length === 0) {
            return res.status(404).json({ error: 'Usuario no registrado' });
        }
        res.json(response[0][0]);
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
}

const obtenerUsuarioPorTokenBoleto=async(req,res)=>{
    const token=req.body.token;
    try {
        const response=await auth.getUserByTokenBoleto(token);
        if (response[0].length === 0) {
            return res.status(404).json({ error: 'Token no válido' });
        }
        res.json(response[0][0]);
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
}
export {
    login,
    registro,
    olvide,
    logout,
    decodificaToken,
    confirmar,
    restablecer,
    isAdmin,
    obtenerUsuarioPorEmail,
    obtenerUsuarioPorTokenBoleto
}