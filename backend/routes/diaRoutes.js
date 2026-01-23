import express from 'express';
import { listarDias } from '../controllers/diaController.js';


const router=express.Router();

router.get('/listar', listarDias);

export default router;