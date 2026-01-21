import pool from '../config/db.js';
import sharp from 'sharp';
import path from 'path';

const guardarDatos = async (req, res) => {

  const datos = req.body;
  const { nombre, apellido, ciudad, pais, tags, redes_facebook, redes_github, redes_instagram, redes_tiktok, redes_twitter, redes_youtube } = req.body;
  const imagen = req.file;



  if (!nombre || !apellido || !ciudad || !pais || !imagen) {
    return res.status(400).json({ error: 'Los campos nombre, apellido, ciudad, pais e imagen son obligatorios' });
  }

  const nombreArchivo = imagen.filename;
  let redes = {};

  if (redes_facebook) redes.facebook = redes_facebook;
  if (redes_github) redes.github = redes_github;
  if (redes_instagram) redes.instagram = redes_instagram;
  if (redes_tiktok) redes.tiktok = redes_tiktok;
  if (redes_twitter) redes.twitter = redes_twitter;
  if (redes_youtube) redes.youtube = redes_youtube;

  redes = JSON.stringify(redes);

  // guardar en BD
  try {
    pool.query('INSERT INTO ponentes (nombre,apellido,ciudad,pais,imagen,tags,redes) VALUES (?,?,?,?,?,?,?)', [nombre, apellido, ciudad, pais, nombreArchivo, tags, redes]);

    // 📸 Crear copias PNG y WEBP
    const rutaOriginal = imagen.path;
    const extension = path.extname(nombreArchivo);
    const nombreBase = path.basename(nombreArchivo, extension);
    const directorio = path.dirname(rutaOriginal);

    await sharp(rutaOriginal)
      .png({ quality: 90 })
      .toFile(path.join(directorio, `${nombreBase}.png`));

    await sharp(rutaOriginal)
      .webp({ quality: 80 })
      .toFile(path.join(directorio, `${nombreBase}.webp`));

    const ponente = { ...datos, imagen: nombreArchivo };
    res.json({ mensaje: 'Datos guardados correctamente', ponente });

  } catch (error) {
    return res.status(500).json({ error: 'Error al guardar los datos' }, error);
  }

}
export {
  guardarDatos
}