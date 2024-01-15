/* eslint-disable indent */
/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function connectDatabase() {
  try {

    // Não é necessário uma operação de conexão explícita em um contexto HTTP.
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
	await migrate(db, { migrationsFolder: 'drizzle' });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

export async function closeDatabase() {
  try {
    // Não é necessário fechar explicitamente a conexão em um contexto HTTP.
    console.log('Conexão com o banco de dados fechada.');
  } catch (error) {
    console.error('Erro ao fechar a conexão com o banco de dados:', error);
    throw error;
  }
}