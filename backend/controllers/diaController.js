import { Dia } from "../models/Dia.js";


const dia=new Dia();

const listarDias = async (req, res) => {
  try {
    const resultado = await dia.getDias();
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar datos dias' });
  }
}

export {listarDias}