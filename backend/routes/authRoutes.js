import express from 'express';
import {
    login,
    registro,
    olvide,
    logout,
    decodificaToken,
    confirmar,
    restablecer
} from '../controllers/authController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

//router.get('/',envioEmail);
router.post('/login',login);
router.get('/logout',logout);

router.post('/registro',registro);

router.post('/olvide',olvide);

router.post('/restablecer',restablecer);

router.post('/decodificar-token',decodificaToken);

router.put('/confirmar/:email',confirmar);

router.post('/ponentes', upload.single('imagen'), (req, res) => {

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
});

export default router;