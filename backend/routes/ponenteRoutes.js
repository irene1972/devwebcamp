import express from 'express';
import {
    subirImagen
} from '../controllers/ponenteController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

router.post('/crear', upload.single('imagen'), subirImagen);

export default router;