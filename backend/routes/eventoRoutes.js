import express from 'express';
import { crearEvento, listarEventos } from '../controllers/eventoController.js';

const router=express.Router();

router.get('/listar', listarEventos);
router.post('/crear', crearEvento);

export default router;