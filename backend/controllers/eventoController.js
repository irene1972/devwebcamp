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
    if(!evento.validar()[0]) return res.status(400).json({ error: evento.validar()[1] });;
    evento.insertEvento();
    return res.json({mensaje: 'Evento Insertado correctamente'});
  } catch (error) {
    return res.status(500).json({ error: 'Error al insertar los datos' });
  }
  
}

const listarEventosHorario = async (req, res) => {
  try {
    const evento=new Evento({});
    const categoria=req.params.categoria_id;
    const dia=req.params.dia;
    const resultado = await evento.getEventoHorarioByCategoriaYDia(categoria,dia);
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar los eventos' });
  }
}

export {
  listarEventos,
  crearEvento,
  listarEventosHorario
}