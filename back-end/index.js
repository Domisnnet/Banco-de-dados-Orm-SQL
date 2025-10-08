// back-end/index.js

// 1. Importações usando require() (Padrão CommonJS)
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Inicialização
const app = express();
const port = 3001;
const prisma = new PrismaClient(); // Instância do cliente Prisma

// Middlewares
app.use(express.json()); // Essencial: Permite que o Express leia JSON (o corpo das requisições POST/PUT)
app.use(cors());         // Essencial: Permite que o Frontend React (porta 3000) se comunique com o Backend (porta 3001)

// ----------------------------------------------------
// ROTAS DA API
// ----------------------------------------------------

// Rota de Teste (GET /)
app.get('/', (req, res) => {
    res.send('Backend rodando! ✨');
});

// Rota POST: Criar um novo usuário (POST /usuarios)
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    
    try {
        const novoUsuario = await prisma.usuario.create({
            data: { nome, email },
        });
        // Resposta de sucesso na criação
        return res.status(201).json(novoUsuario); 
    } catch (error) {
        // P2002 é o código de erro do Prisma para violação de UNIQUE (ex: email duplicado)
        if (error.code === 'P2002') {
             return res.status(409).json({ error: 'Email já cadastrado.' });
        }
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota GET: Listar todos os usuários (GET /usuarios)
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        return res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});


// ----------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR (com tratamento de erro do DB)
// ----------------------------------------------------

// Função assíncrona para garantir a conexão ao DB antes de iniciar o servidor
async function main() {
    // Tenta conectar ao banco de dados (Prisma)
    await prisma.$connect(); 
    
    // Inicia o servidor Express
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log(`Rotas de Usuários prontas: POST /usuarios, GET /usuarios`);
    });
}

// Executa a função principal e trata quaisquer erros de inicialização
main()
    .catch(async (e) => {
        console.error("Erro fatal na inicialização do servidor:", e);
        // Garante que a conexão do DB seja fechada em caso de falha
        await prisma.$disconnect(); 
        process.exit(1); // Encerra o processo com código de erro
    });