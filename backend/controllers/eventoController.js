import { Evento } from "../models/Evento.js";

const listarEventos = async (req, res) => {
  try {
    const evento=new Evento({});
    const resultado = await evento.getEventos();
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar datos eventos' });
  }
}

export {listarEventos}