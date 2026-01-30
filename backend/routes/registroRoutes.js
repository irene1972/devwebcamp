import express from 'express';
import {
    obtenerRegistroPorEmail,
    crearRegistro,
    conferencias
} from '../controllers/registroController.js';

const router=express.Router();

//router.get('/listar', listarRegistros);
router.post('/crear', crearRegistro);
router.post('/obtener-registro-por-email', obtenerRegistroPorEmail);
router.post('/finalizar-registro/conferencias',conferencias);

export default router;