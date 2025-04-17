const { Pool } = require('pg');
require('dotenv').config();

// Connexion à la base de données PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Fonction pour insérer une transaction
const insertTransaction = async (transaction) => {
  const query = `
    INSERT INTO transactions (id, amount, currency, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [transaction.id, transaction.amount, transaction.currency, transaction.status];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error inserting transaction:', err);
    throw err;
  }
};

module.exports = {
  insertTransaction,
};

