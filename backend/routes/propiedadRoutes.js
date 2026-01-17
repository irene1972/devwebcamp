import express from 'express';
import {
    envioEmail
} from '../controllers/propiedadController.js';

const router=express.Router();

router.get('/',envioEmail);

export default router;