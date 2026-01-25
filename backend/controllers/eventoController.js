import { Evento } from "../models/Evento.js";

const listarEventos = async (req, res) => {
  try {
    const evento = new Evento({});
    const resultado = await evento.getEventos();
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar datos eventos' });
  }
}

const listarConJoin = async (req, res) => {
  try {
    const evento = new Evento({});
    const resultado = await evento.getEventosConJoin();
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar datos eventos con join' });
  }
}

const listarConJoinById = async (req, res) => {
  try {
    const evento = new Evento({});
    const resultado = await evento.getEventosConJoinById(req.params.id);
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar evento con join' });
  }
}

const listarEventosHorario = async (req, res) => {
  try {
    const evento = new Evento({});
    const categoria = req.params.categoria_id;
    const dia = req.params.dia;
    const resultado = await evento.getEventoHorarioByCategoriaYDia(categoria, dia);
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar los eventos' });
  }
}

const crearEvento = async (req, res) => {
  const evento = new Evento(req.body);
  try {
    if (!evento.validar()[0]) return res.status(400).json({ error: evento.validar()[1] });;
    evento.insertEvento();
    return res.json({ mensaje: 'Evento Insertado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al insertar los datos' });
  }

}

const editarEvento = async (req, res) => {
  const evento = new Evento(req.body);
  try {
    if (!evento.validar()[0]) return res.status(400).json({ error: evento.validar()[1] });
    evento.actualizarEvento(req.params.id);
    return res.json({ mensaje: 'Evento Actualizado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar los datos' });
  }
}

export {
  listarEventos,
  listarConJoin,
  listarConJoinById,
  crearEvento,
  listarEventosHorario,
  editarEvento
}