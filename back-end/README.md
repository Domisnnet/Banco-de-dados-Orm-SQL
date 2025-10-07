
# 🚀 Template: Backend Moderno com Node.js e Prisma

Este é um **template de backend** minimalista e moderno, ideal para criar **APIs REST** robustas e com forte **tipagem**.

Ele é construído com **Node.js**, **TypeScript** e **Prisma ORM**, utilizando **SQLite** para persistência de dados em desenvolvimento. É o ponto de partida perfeito para projetos como **Gerenciamento de Usuários**.

---

## ✨ Principais Funcionalidades

* **Prisma ORM:** Abstração de banco de dados, migrações e **tipagem automática** de modelos.
* **TypeScript:** Garante **código mais seguro** e de fácil manutenção.
* **SQLite:** Banco de dados **leve e portátil**, perfeito para prototipagem e desenvolvimento local.
* **Estrutura REST:** Configurada com **Express.js** para rotas básicas (CRUD).

---

## 🛠 Tecnologias Utilizadas

| Categoria          | Tecnologia                     | Descrição                                 |
| :----------------- | :----------------------------- | :---------------------------------------- |
| **Linguagem**      | **Node.js** com **TypeScript** | Ambiente de execução e superset tipado.   |
| **ORM**            | **Prisma**                     | Object-Relational Mapper moderno.         |
| **Banco de Dados** | **SQLite**                     | Banco de dados leve para desenvolvimento. |
| **Framework Web**  | **Express.js**                 | Framework minimalista para rotas HTTP.    |
| **Configuração**   | `dotenv`                       | Gerenciamento de variáveis de ambiente.   |

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

Certifique-se de ter o **Node.js (versão 16+ ou superior)** e o **npm** (ou Yarn/pnpm) instalados.

---

### 1. Clone o Repositório

Substitua o link abaixo pelo endereço real do seu projeto.

```bash
git clone https://github.com/Domisnnet/Banco-de-dados-Orm-SQL
cd banco-de-dados-ORM-SQL
```

---

### 2. Instale as Dependências

```bash
npm install
# ou
yarn install
```

---

### 3. Configure o Banco de Dados

O Prisma gerencia o banco de dados e o esquema através do arquivo `prisma/schema.prisma`.

**Crie o banco de dados e aplique as migrações:**

Este comando lê o esquema, cria o arquivo `dev.db` (SQLite) e aplica a primeira migração.

```bash
npx prisma migrate dev --name init
```

**Gere o Prisma Client:**

Garanta que o Prisma Client esteja pronto para ser importado no seu código TypeScript.

```bash
npx prisma generate
```

---

### 4. Inicie a Aplicação

| Comando       | Descrição                                                                            |
| :------------ | :----------------------------------------------------------------------------------- |
| `npm run dev` | Inicia em modo de desenvolvimento (com **Nodemon** para recarregar automaticamente). |
| `npm start`   | Inicia em modo de produção (requer build prévio).                                    |

---

### 💾 Exemplo de Modelo de Dados

O esquema básico de exemplo para o modelo `Usuario` é definido em `prisma/schema.prisma`:

```prisma
model Usuario {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  nome      String?
  createdAt DateTime @default(now())
}
```

---

## 📄 Licença

Este projeto é licenciado sob os termos da **MIT License**.
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
