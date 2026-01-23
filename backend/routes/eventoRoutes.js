import express from 'express';
import { listarEventos } from '../controllers/eventoController.js';

const router=express.Router();

router.get('/listar', listarEventos);

export default router;