import express from 'express';
import {
    listarPonentes,
    crearPonente,
    obtenerPonente,
    actualizarPonente,
    eliminarPonente
} from '../controllers/ponenteController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

router.get('/listar', listarPonentes);
router.post('/crear', upload.single('imagen'), crearPonente);
router.get('/editar/:id',obtenerPonente);
router.post('/editar/:id',actualizarPonente);
router.delete('/eliminar/:id', eliminarPonente);

export default router;