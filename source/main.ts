// main.ts

import express from 'express';
import cors from 'cors';

// Crée une instance d'application Express
const app = express();

// Utilisation de CORS pour gérer les requêtes croisées (si nécessaire)
app.use(cors());

// Définir un routeur pour l'API
app.get('/', (req, res) => {
  res.send('');
});

// Configurer le port sur lequel le serveur écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
