
import { PrismaClient } from './generated/prisma/index.js'; 

const prisma = new PrismaClient();
const express = require('express');
const app = express();
const port = 3001;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Middleware para CORS (Crucial para a comunicação com o Frontend)
const cors = require('cors');
app.use(cors()); // Configure isso depois para ser mais restritivo em produção!

// Sua primeira rota de teste
app.get('/', (req, res) => {
  res.send('Backend rodando! ✨');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

/*async function createUser() {
  const user = await prisma.usuario.create({
    data: {
      nome: 'Dominisinnet', 
      email: 'domisinnet@gmail.com',
    },
  });
  console.log(user);
}
  */

//createUser();