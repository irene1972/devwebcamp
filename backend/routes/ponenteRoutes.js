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
router.put('/editar/:id',upload.single('imagen'),actualizarPonente);
router.delete('/eliminar/:id', eliminarPonente);

export default router;