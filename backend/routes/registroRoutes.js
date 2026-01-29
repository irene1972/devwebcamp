import express from 'express';
import {
    crearRegistro,
} from '../controllers/registroController.js';

const router=express.Router();

//router.get('/listar', listarRegistros);
router.post('/crear', crearRegistro);

export default router;