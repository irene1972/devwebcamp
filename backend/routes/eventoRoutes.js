import express from 'express';
import { crearEvento, 
        listarConJoin, 
        listarConJoinById, 
        listarEventos, 
        listarEventosHorario,
        obtenerTotalEventosPorCategoria,
        editarEvento,
        eliminarEvento
         } from '../controllers/eventoController.js';

const router=express.Router();

router.get('/listar', listarEventos);
router.get('/listarConJoin', listarConJoin);
router.get('/listarConJoinById/:id', listarConJoinById);
router.get('/listar/:categoria_id/:dia', listarEventosHorario);
router.get('/total',obtenerTotalEventosPorCategoria);
router.post('/crear', crearEvento);
router.put('/editar/:id', editarEvento);
router.delete('/eliminar/:id', eliminarEvento);

export default router;