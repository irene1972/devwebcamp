import { Registro } from "../models/Registro.js";

const registro = new Registro();

const obtenerRegistroPorEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const respuesta = await registro.getRegistroByEmail(email);
        if (respuesta[0].length > 0) {
            return res.json(respuesta[0]);
        } else {
            return res.status(404).json({ error: 'No encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}

const crearRegistro = async (req, res) => {
    const { token, usuario } = req.body;
    try {
        await registro.insertRegistro(3, '', token, usuario);
        res.json({ mensaje: 'Datos guardados correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar el registro' });
    }
}

export {
    obtenerRegistroPorEmail,
    crearRegistro
}