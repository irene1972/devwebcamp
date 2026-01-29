import { Registro } from "../models/Registro.js";

const registro = new Registro();

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
    crearRegistro
}