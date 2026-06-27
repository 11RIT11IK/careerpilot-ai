//here we are building and exporting and prisma connection
//so our backend have only direct connection with prisma not postgresql
//so if they want  to perform sql queries we just call prisma connection and tell them

import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient(); //created prisma connection

export default prisma;

