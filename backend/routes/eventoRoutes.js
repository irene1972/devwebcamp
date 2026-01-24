import express from 'express';
import { crearEvento, listarEventos, listarEventosHorario } from '../controllers/eventoController.js';

const router=express.Router();

router.get('/listar', listarEventos);
router.get('/listar/:categoria_id/:dia', listarEventosHorario);
router.post('/crear', crearEvento);

export default router;