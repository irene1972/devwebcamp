import express from 'express';
import {
    listarPonentes,
    crearPonente,
    eliminarPonente
} from '../controllers/ponenteController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

router.get('/listar', listarPonentes);
router.post('/crear', upload.single('imagen'), crearPonente);
router.delete('/eliminar/:id', eliminarPonente);

export default router;