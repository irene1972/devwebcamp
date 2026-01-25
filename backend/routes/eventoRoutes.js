import express from 'express';
import { crearEvento, listarConJoin, listarEventos, listarEventosHorario } from '../controllers/eventoController.js';

const router=express.Router();

router.get('/listar', listarEventos);
router.get('/listarConJoin', listarConJoin);
router.get('/listar/:categoria_id/:dia', listarEventosHorario);
router.post('/crear', crearEvento);

export default router;