/* eslint-disable indent */
/* eslint-disable linebreak-style */
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
 schema: './src/server/database/schema/tablesCreator.ts',
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});