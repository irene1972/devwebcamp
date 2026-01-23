import { Categoria } from '../models/Categoria.js';

const categoria=new Categoria();

const listarCategorias = async (req, res) => {
  try {
    const resultado = await categoria.getCategorias();
    return res.json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar datos categorias' });
  }
}

export {listarCategorias}