import express from 'express';
import { listarHoras } from '../controllers/horaController.js';


const router=express.Router();

router.get('/listar', listarHoras);

export default router;