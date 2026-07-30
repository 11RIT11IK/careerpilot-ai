//here we are building and exporting and prisma connection
//so our backend have only direct connection with prisma not postgresql
//so if they want  to perform sql queries we just call prisma connection and tell them

// src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

