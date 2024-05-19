export{}; // Módulo em modo estrito
import express from 'express';
import cors from 'cors';
import listRoutes from './routes/listRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api', listRoutes); // Prefixo '/api' para as rotas

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
