import { Pool } from 'pg';

let pool;

export function getDatabasePool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
    });
  }

  return pool;
}