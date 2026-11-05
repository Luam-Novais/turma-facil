import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('Falha ao iniciar o prisma, Variavel de ambiente inexistente.');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
export const db = new PrismaClient({ adapter });
