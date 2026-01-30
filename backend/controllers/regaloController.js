import { Regalo } from "../models/Regalo.js";

const regalo = new Regalo();

const obtenerRegalos = async (req, res) => {
    try {
        const respuesta = await regalo.getRegalos();
        if (respuesta[0].length > 0) {
            return res.json(respuesta[0]);
        } else {
            return res.status(404).json({ error: 'No hay regalos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar los datos' });
    }
}


export {
    obtenerRegalos
}