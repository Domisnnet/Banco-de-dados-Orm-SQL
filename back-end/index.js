// back-end/index.js

// 1. Importações usando require() (Padrão CommonJS)
const express = require('express');
const cors = require('cors');
// Importação CORRETA do Prisma Client (aponta para o pacote, não para o arquivo gerado)
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3001;
const prisma = new PrismaClient(); // Instância do cliente Prisma

// Middlewares
app.use(express.json()); // Permite que o Express leia JSON do corpo da requisição
app.use(cors()); // Permite a comunicação com o Frontend em React

// ----------------------------------------------------
// ROTAS DA API
// ----------------------------------------------------

// Rota de Teste (GET /)
app.get('/', (req, res) => {
    res.send('Backend rodando! ✨');
});

/*
// Exemplo de uma Rota POST para criar um usuário:
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    try {
        const novoUsuario = await prisma.usuario.create({
            data: { nome, email },
        });
        return res.status(201).json(novoUsuario);
    } catch (error) {
        // Trate erros de email duplicado (se for único no seu schema.prisma)
        if (error.code === 'P2002') {
             return res.status(409).json({ error: 'Email já cadastrado.' });
        }
        return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});
*/

// ----------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR (com tratamento de erro do DB)
// ----------------------------------------------------

// Função assíncrona para conectar ao DB e iniciar o servidor
async function main() {
    // Tenta conectar ao banco de dados (Prisma)
    await prisma.$connect(); 
    
    // Inicia o servidor Express
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}

// Executa a função principal e trata quaisquer erros de inicialização
main()
    .catch(async (e) => {
        console.error("Erro fatal na inicialização do servidor:", e);
        await prisma.$disconnect(); // Garante o fechamento da conexão com o DB
        process.exit(1); // Encerra o processo
    });