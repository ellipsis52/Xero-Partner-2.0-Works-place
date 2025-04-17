#!/bin/bash

echo "🎵 Que la magie commence... 🎵"
echo "🧙‍♂️ Utilisation de Node.js $(node -v) et pnpm $(pnpm -v)"

# 1. Installation des dépendances
echo "📦 Installation des dépendances..."
pnpm install

# 2. Construction du projet
echo "🏗️  Construction du projet..."
pnpm run build

# 3. Déploiement avec Vercel
echo "🚀 Déploiement vers Vercel en production..."
vercel --prod --force

echo "✅ Déploiement terminé ! L'épopée continue... 🌌"
chmod +x deploy.sh


