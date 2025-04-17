const express = require('express');
const router = express.Router();
const { insertTransaction } = require('../db');

// Route pour récupérer les transactions
router.get('/transactions', async (req, res) => {
    // Simulons des transactions récupérées de Saferpay
    const transactions = [
        { id: 1, amount: 12000, currency: 'EUR', status: 'AUTHORIZED' },
        { id: 2, amount: 4500, currency: 'CHF', status: 'DECLINED' }
    ];

    // Insérer les transactions dans la base de données PostgreSQL
    for (const tx of transactions) {
        try {
            await insertTransaction(tx);  // Insérer chaque transaction
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement de la transaction:', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    res.json(transactions);  // Réponse avec les transactions simulées
});

module.exports = router;

const { Pool } = require('pg');
require('dotenv').config();

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

// Fonction serverless
module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const transactions = [
      { id: 1, amount: 12000, currency: 'EUR', status: 'AUTHORIZED' },
      { id: 2, amount: 4500, currency: 'CHF', status: 'DECLINED' }
    ];

    for (const tx of transactions) {
      try {
        await insertTransaction(tx);  // Enregistre chaque transaction
      } catch (err) {
        console.error('Error saving transaction:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    return res.status(200).json(transactions);
  }
  return res.status(405).json({ error: 'Method Not Allowed' });
};
