import express from 'express';
//import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import ponenteRoutes from './routes/ponenteRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import diaRoutes from './routes/diaRoutes.js';
import horaRoutes from './routes/horaRoutes.js';

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
};

const app=express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(cors(corsOptions));

//dotenv.config();

app.use('/api/auth',authRoutes);
app.use('/api/ponente',ponenteRoutes);
app.use('/api/categoria',categoriaRoutes);
app.use('/api/dia',diaRoutes);
app.use('/api/hora',horaRoutes);
app.use('/imgs', express.static('public/imgs'));

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});