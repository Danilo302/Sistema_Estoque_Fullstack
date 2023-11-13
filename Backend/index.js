// Importando módulos e controladores
import express from "express";
import userRoutes from "./rotas/usuarios.js";
import cors from "cors";

// Configurando o aplicativo Express
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para lidar com requisições CORS
app.use(cors());

// Usando as rotas de usuário
app.use(userRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
