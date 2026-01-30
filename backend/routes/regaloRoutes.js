import express from 'express';
import {
    obtenerRegalos
} from '../controllers/regaloController.js';

const router=express.Router();

router.get('/listar', obtenerRegalos);

export default router;