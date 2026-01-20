import express from 'express';
import {
    guardarDatos
} from '../controllers/ponenteController.js';
import upload from '../helpers/upload.js';

const router=express.Router();

router.post('/crear', upload.single('imagen'), guardarDatos);

export default router;