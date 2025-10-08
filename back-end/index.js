// back-end/index.js

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Inicialização
const app = express();
const port = 3001;
const prisma = new PrismaClient();

// Middlewares
app.use(express.json()); // Permite ler o corpo das requisições como JSON
app.use(cors());         // Permite que o frontend React se comunique

// ----------------------------------------------------
// ROTAS DA API - CRUD COMPLETO
// ----------------------------------------------------

// Rota de Teste
app.get('/', (req, res) => {
    res.send('Backend rodando! ✨');
});

// GET: Listar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        return res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

// POST: Criar um novo usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    
    try {
        const novoUsuario = await prisma.usuario.create({
            data: { nome, email },
        });
        return res.status(201).json(novoUsuario); 
    } catch (error) {
        if (error.code === 'P2002') { 
             return res.status(409).json({ error: 'Email já cadastrado.' });
        }
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// PUT: Atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params; 
    const { nome, email } = req.body;
    
    try {
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: parseInt(id) }, 
            data: { nome, email },
        });
        return res.json(usuarioAtualizado); 
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        if (error.code === 'P2025') { 
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// DELETE: Deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await prisma.usuario.delete({
            where: { id: parseInt(id) },
        });
        return res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        if (error.code === 'P2025') { 
            return res.status(404).json({ error: 'Usuário não encontrado para deletar.' });
        }
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// ----------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// ----------------------------------------------------

async function main() {
    await prisma.$connect(); 
    
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log(`Rotas CRUD completas: GET, POST, PUT, DELETE /usuarios`);
    });
}

main()
    .catch(async (e) => {
        console.error("Erro fatal na inicialização do servidor:", e);
        await prisma.$disconnect(); 
        process.exit(1);
    });