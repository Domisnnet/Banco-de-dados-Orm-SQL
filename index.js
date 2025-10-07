
import { PrismaClient } from './generated/prisma/index.js'; 

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.usuario.create({
    data: {
      nome: 'Dominisinnet', 
      email: 'domisinnet@gmail.com',
    },
  });
  console.log(user);
}

createUser();