
# 🚀 Projeto Full Stack CRUD (React | Node.js | Prisma | SQLite)

![GitHub repo size](https://img.shields.io/github/repo-size/Domisnnet/Banco-de-dados-Orm-SQL?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/Domisnnet/Banco-de-dados-Orm-SQL?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Domisnnet/Banco-de-dados-Orm-SQL?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/Domisnnet/Banco-de-dados-Orm-SQL?style=for-the-badge)

---

## 📖 Sumário

- [🚀 Projeto Full Stack CRUD (React | Node.js | Prisma | SQLite)](#-projeto-full-stack-crud-react--nodejs--prisma--sqlite)
  - [📖 Sumário](#-sumário)
  - [🧩 Descrição do Projeto](#-descrição-do-projeto)
  - [⚙️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
  - [🧱 Backend (Node.js + Prisma)](#-backend-nodejs--prisma)
    - [1. Instalação das Dependências](#1-instalação-das-dependências)
    - [2. Configurar o Banco de Dados](#2-configurar-o-banco-de-dados)
    - [3. Iniciar o Servidor](#3-iniciar-o-servidor)
  - [⚛️ Frontend (React com Vite)](#️-frontend-react-com-vite)
    - [1. Instalar Dependências](#1-instalar-dependências)
    - [2. Criar Variáveis de Ambiente](#2-criar-variáveis-de-ambiente)
    - [3. Iniciar o Frontend](#3-iniciar-o-frontend)
  - [📌 Rotas da API](#-rotas-da-api)
  - [💻 Funcionalidades do Frontend](#-funcionalidades-do-frontend)
  - [📂 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🧠 Próximos Passos e Melhorias](#-próximos-passos-e-melhorias)
  - [👨‍💻 Autor](#-autor)
  - [📝 Licença](#-licença)

---

## 🧩 Descrição do Projeto

Este é um **projeto Full Stack CRUD** desenvolvido com **React**, **Node.js**, **Express**, **Prisma** e **SQLite**.
O objetivo é demonstrar a integração entre **frontend e backend**, aplicando conceitos modernos de desenvolvimento com ORM, rotas RESTful e banco de dados relacional.

---

## ⚙️ Tecnologias Utilizadas

| Categoria          | Tecnologia          | Descrição                                                                        |
| :----------------- | :------------------ | :------------------------------------------------------------------------------- |
| **Frontend**       | React (com Vite)    | Interface de usuário para interação.                                             |
| **Backend**        | Node.js com Express | API RESTful responsável pela lógica de negócios.                                 |
| **ORM**            | Prisma              | Mapeamento Objeto-Relacional para interagir com o banco de dados.                |
| **Banco de Dados** | SQLite              | Banco de dados leve baseado em arquivo (`db.sqlite`) usado para desenvolvimento. |

---

## 🧱 Backend (Node.js + Prisma)

### 1. Instalação das Dependências

```bash
cd back-end
npm install
```

### 2. Configurar o Banco de Dados

Este projeto utiliza o **SQLite**.
Execute as migrações do Prisma para criar o banco e a tabela `Usuario`:

```bash
npx prisma migrate dev --name init
```

💡 O arquivo `db.sqlite` será criado automaticamente em `back-end/prisma`.

### 3. Iniciar o Servidor

```bash
npm start
# ou
node index.js
```

Acesse a API:
👉 [http://localhost:3001](http://localhost:3001)

---

## ⚛️ Frontend (React com Vite)

### 1. Instalar Dependências

```bash
cd ../front-end/app-react
npm install
```

### 2. Criar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz de `app-react`:

```bash
# front-end/app-react/.env.local
VITE_API_BASE_URL=http://localhost:3001/
```

### 3. Iniciar o Frontend

```bash
npm run dev
```

A aplicação será executada em:
👉 [http://localhost:5173](http://localhost:5173)

---

## 📌 Rotas da API

```text
GET    /usuarios         -> Lista todos os usuários cadastrados
POST   /usuarios         -> Cria um novo usuário ({ nome, email })
PUT    /usuarios/:id     -> Atualiza os dados de um usuário específico
DELETE /usuarios/:id     -> Remove um usuário do banco de dados
```

---

## 💻 Funcionalidades do Frontend

A aplicação React permite:

* **Create:** Cadastro de novos usuários via formulário
* **Read:** Exibição da lista de usuários
* **Update:** Edição de um usuário existente
* **Delete:** Remoção de usuários

---

## 📂 Estrutura do Projeto

```bash
Banco-de-dados-Orm-SQL/
├── back-end/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── db.sqlite
│   ├── index.js
│   ├── package.json
│   └── ...
│
├── front-end/
│   └── app-react/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── main.jsx
│       ├── .env.local
│       └── package.json
│
└── README.md
```

---

## 🧠 Próximos Passos e Melhorias

* ✅ Adicionar validação de formulários (React Hook Form ou Zod)
* ✅ Implementar feedback visual com Toasts (React Toastify)
* ✅ Criar Dockerfile e `docker-compose` para ambiente completo
* ✅ Adicionar testes automatizados (Jest / Vitest)
* ✅ Implantar o app no Render / Vercel

---

## 👨‍💻 Autor

<a href="https://github.com/Domisnnet">
    <img src="src/imagens/DomisDev.png" width="60px" height="60px" alt="Acessar perfil GitHub">
    DomisDev
</a> 
---

## 📝 Licença

Este projeto está sob a licença **MIT** — sinta-se à vontade para utilizar e modificar.
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
