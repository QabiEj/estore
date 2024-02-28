import { Pool } from 'pg';

let pool;

function getDatabasePool() {
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

export async function create(table, data) {
  const pool = getDatabasePool();
  const client = await pool.connect();

  try {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    await client.query(sql, values);
  } finally {
    client.release();
  }
}

export async function read(table, id) {
    const pool = getDatabasePool();
    const client = await pool.connect();
  
    try {
      const sql = `SELECT * FROM ${table} WHERE id = $1`;
      const res = await client.query(sql, [id]);
      return res.rows[0];
    } finally {
      client.release();
    }
  }
  
  export async function update(table, id, data) {
    const pool = getDatabasePool();
    const client = await pool.connect();
  
    try {
      const columns = Object.keys(data);
      const values = Object.values(data);
      const set = columns.map((col, i) => `${col} = $${i + 2}`).join(", ");
      const sql = `UPDATE ${table} SET ${set} WHERE id = $1`;
      await client.query(sql, [id, ...values]);
    } finally {
      client.release();
    }
  }
  
  export async function del(table, id) {
    const pool = getDatabasePool();
    const client = await pool.connect();
  
    try {
      const sql = `DELETE FROM ${table} WHERE id = $1`;
      await client.query(sql, [id]);
    } finally {
      client.release();
    }
  }
  
  export async function search(table, column, value) {
    const pool = getDatabasePool();
    const client = await pool.connect();
  
    try {
      const sql = `SELECT * FROM ${table} WHERE ${column} LIKE $1`;
      const res = await client.query(sql, [`%${value}%`]);
      return res.rows;
    } finally {
      client.release();
    }
  }