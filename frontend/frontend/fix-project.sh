#!/bin/bash

echo "🛠️ Nettoyage et réparation du projet Vercel + React..."

# 1. Supprimer le dossier frontend/frontend si existant
if [ -d "frontend/frontend" ]; then
  echo "🧹 Suppression du dossier frontend/frontend..."
  rm -rf frontend/frontend
fi

# 2. Supprimer entièrement frontend pour recréer proprement
if [ -d "frontend" ]; then
  echo "🧹 Suppression du dossier frontend..."
  rm -rf frontend
fi

# 3. Mise à jour de Node avec nvm
echo "⚙️ Mise à jour de Node.js via NVM..."

# Installe NVM si non présent
if ! command -v nvm &> /dev/null; then
  echo "📥 Installation de NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Active NVM et installe Node 18
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18

# 4. Re-création propre de l'app React
echo "⚛️ Création d'une app React dans ./frontend"
npx create-react-app frontend

# 5. Build de l'app React
cd frontend
echo "📦 Installation des dépendances..."
npm install

echo "🏗️ Build de l'application React..."
npm run build

echo "✅ Projet React prêt pour déploiement avec Vercel !"

