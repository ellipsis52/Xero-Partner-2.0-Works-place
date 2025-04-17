#!/bin/bash

# CONFIGURE ICI 👇
PROJECT_NAME="xero-partner-2-0"
DOMAIN_NAME="app.netmanagement.online"
PROJECT_PATH="."  # Dossier où se trouve ton projet (package.json, etc.)

# 👉 Déploiement manuel avec Vercel CLI
echo "📦 Déploiement de $PROJECT_NAME sur Vercel..."

vercel --name "$PROJECT_NAME" --prod --cwd "$PROJECT_PATH" --confirm

# 👉 Ajout du domaine personnalisé
echo "🌍 Ajout du domaine $DOMAIN_NAME au projet $PROJECT_NAME..."
vercel domains add $DOMAIN_NAME $PROJECT_NAME

echo "✅ Terminé ! Pense à configurer le DNS avec :"
echo "   CNAME pour 'app' → cname.vercel-dns.com"
echo ""
echo "🔗 Une fois les DNS propagés, ton projet sera dispo sur : https://$DOMAIN_NAME"

#!/bin/bash

echo "🚀 Déploiement de Xero Partner 2.0 sur Vercel..."

# Nettoyage
echo "🧹 Nettoyage de l'environnement..."
rm -rf node_modules package-lock.json

# Réinstallation
echo "📦 Réinstallation des dépendances..."
npm install || { echo "❌ Erreur npm install"; exit 1; }

# Lien avec Vercel
echo "🔗 Lien avec Vercel..."
vercel link || { echo "❌ Erreur vercel link"; exit 1; }

# Déploiement
echo "🌍 Déploiement en production..."
vercel --prod --yes || { echo "❌ Erreur déploiement Vercel"; exit 1; }

# Ajout du domaine personnalisé
echo "🌐 Ajout du domaine personnalisé : app.netmanagement.online"
vercel domains add app.netmanagement.online xero-partner-2-0 || echo "⚠️ Domaine déjà ajouté ou erreur"

echo "✅ Déploiement terminé !"
echo "📎 Vérifie : https://app.netmanagement.online"

#!/bin/zsh

# 🧠 Configuration du projet
PROJECT_NAME="xero-partner-2-0"
DOMAIN_NAME="app.netmanagement.online"
PROJECT_PATH="."  # Répertoire contenant package.json

# 🧪 Vérifie que Node 18 est utilisé
REQUIRED_NODE_VERSION="18"
CURRENT_NODE_VERSION=$(node -v | sed 's/v\([0-9]*\).*/\1/')

if [ "$CURRENT_NODE_VERSION" -ne "$REQUIRED_NODE_VERSION" ]; then
  echo "⚠️ Tu utilises Node v$(node -v). Ce projet nécessite Node v18."
  echo "💡 Utilise NVM :"
  echo "   nvm install 18 && nvm use 18"
  exit 1
fi

echo "📦 Nettoyage de l'environnement..."
rm -rf node_modules package-lock.json

echo "📥 Réinstallation des dépendances..."
npm install

echo "🔨 Build de l'app React..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Le build a échoué. Vérifie les erreurs ci-dessus."
  exit 1
fi

echo "�� Déploiement de $PROJECT_NAME sur Vercel..."
vercel --yes --cwd "$PROJECT_PATH" --prod

if [ $? -ne 0 ]; then
  echo "❌ Le déploiement a échoué. Domaine non ajouté."
  exit 1
fi

echo "🌍 Ajout du domaine $DOMAIN_NAME..."
vercel domains add $DOMAIN_NAME

echo ""
echo "✅ Terminé ! Pense à configurer les DNS :"
echo "   Type: CNAME"
echo "   Nom : app"
echo "   Valeur : cname.vercel-dns.com"
echo ""
echo "🔗 Ton app sera bientôt dispo ici : https://$DOMAIN_NAME"

