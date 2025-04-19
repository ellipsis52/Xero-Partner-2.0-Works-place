const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/xero', async (req, res) => {
  try {
    const response = await axios.get('https://api.xero.com/api.xro/2.0/Invoices', {
      headers: {
        'Authorization': `Bearer ${process.env.XERO_ACCESS_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur Xero:", error);
    res.status(500).send('Erreur lors de la récupération des données Xero');
  }
});

app.post('/saferpay', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const response = await axios.post('https://www.saferpay.com/api/v1/payments', {
      amount: amount,
      currency: currency,
      // D'autres détails du paiement ici
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.SAFERPAY_API_KEY}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erreur Saferpay:", error);
    res.status(500).send('Erreur lors du traitement du paiement avec Saferpay');
  }
});

app.listen(PORT, () => console.log(`Le serveur backend fonctionne sur http://localhost:${PORT}`));
