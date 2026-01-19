const subirImagen=(req, res) => {

  const datos = req.body;
  const imagen = req.file;

  if (!imagen) {
    return res.status(400).json({ error: 'Imagen obligatoria' });
  }

  const nombreArchivo = imagen.filename;

  // guardar en BD
  const ponente = {
    ...datos,
    imagen: nombreArchivo
  };

  res.json({
    ok: true,
    ponente
  });
}
export {
    subirImagen
}