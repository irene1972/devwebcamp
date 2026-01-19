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

const router=express.Router();

//router.get('/',envioEmail);
router.post('/login',login);
router.get('/logout',logout);

router.post('/registro',registro);

router.post('/olvide',olvide);

router.post('/restablecer',restablecer);

router.post('/decodificar-token',decodificaToken);

router.put('/confirmar/:email',confirmar);

export default router;