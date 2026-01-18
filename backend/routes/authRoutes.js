import express from 'express';
import {
    envioEmail,
    login,
    registro,
    olvide,
    logout,
    decodificaToken
} from '../controllers/authController.js';

const router=express.Router();

//router.get('/',envioEmail);
router.post('/login',login);
router.get('/logout',logout);

router.post('/registro',registro);

router.post('/olvide',olvide);

router.post('/decodificar-token',decodificaToken);

export default router;