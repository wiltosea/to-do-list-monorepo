import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import connectDB from './config/db.js';

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rotas
app.use('/api', itemRoutes);

export default app;
