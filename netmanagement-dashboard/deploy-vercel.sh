#!/bin/zsh

# CONFIGURATION
PROJECT_NAME="xero-partner-2-0"
DOMAIN_NAME="app.netmanagement.online"
PROJECT_PATH="."  # Répertoire contenant package.json

# 🚀 Déploiement manuel avec Vercel CLI
echo "📦 Déploiement de $PROJECT_NAME sur Vercel..."
vercel --yes --cwd "$PROJECT_PATH" --prod

# ✅ Vérifie si le déploiement a réussi
if [ $? -eq 0 ]; then
  echo "🌍 Ajout du domaine $DOMAIN_NAME..."
  vercel domains add $DOMAIN_NAME
  echo "✅ Terminé ! Pense à configurer les DNS :"
  echo "   Type: CNAME | Nom: app | Valeur: cname.vercel-dns.com"
  echo ""
  echo "🔗 Ton app sera bientôt dispo ici : https://$DOMAIN_NAME"
else
  echo "❌ Échec du déploiement. Domaine non ajouté."
fi

