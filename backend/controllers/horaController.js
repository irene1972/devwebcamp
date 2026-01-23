import { Hora } from "../models/Hora.js";

const dia=new Hora();

const listarHoras = async (req, res) => {
  try {
    const resultado = await dia.getHoras();
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar datos horas' });
  }
}

export {listarHoras}