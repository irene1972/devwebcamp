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

const crearEvento = async (req, res) => {
  const evento=new Evento(req.body);
  try {
    evento.insertEvento();
    return res.json({mensaje: 'Evento Insertado correctamente'});
  } catch (error) {
    return res.status(500).json({ error: 'Error al insertar los datos' });
  }
  
}

export {
  listarEventos,
  crearEvento
}