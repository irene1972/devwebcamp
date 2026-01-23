import express from 'express';
import { listarCategorias } from '../controllers/categoriaController.js';


const router=express.Router();

router.get('/listar', listarCategorias);

export default router;