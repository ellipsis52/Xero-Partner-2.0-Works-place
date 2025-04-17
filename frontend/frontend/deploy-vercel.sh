#!/bin/zsh

# === CONFIGURATION ===
PROJECT_NAME="xero-partner-2-0"
DOMAIN_NAME="app.netmanagement.online"
PROJECT_PATH="."
LOG_FILE="vercel-deploy.log"

# Démarrage du log
echo "🚀 DÉPLOIEMENT COMMENCÉ - $(date)" > "$LOG_FILE"

# === CHARGEMENT DE NVM ===
echo "🔍 Vérification de NVM..." | tee -a "$LOG_FILE"
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
  source "/usr/local/opt/nvm/nvm.sh"
else
  echo "❌ NVM non trouvé. Installe-le d'abord : https://github.com/nvm-sh/nvm" | tee -a "$LOG_FILE"
  exit 1
fi

# === UTILISATION DE NODE 18 ===
echo "🔄 Utilisation de Node 18..." | tee -a "$LOG_FILE"
nvm install 18 >> "$LOG_FILE" 2>&1
nvm use 18 >> "$LOG_FILE" 2>&1
nvm alias default 18 >> "$LOG_FILE" 2>&1

NODE_VERSION=$(node -v)
echo "✅ Node version utilisée : $NODE_VERSION" | tee -a "$LOG_FILE"

# === NETTOYAGE ===
echo "🧹 Suppression node_modules et package-lock.json..." | tee -a "$LOG_FILE"
rm -rf node_modules package-lock.json

# === INSTALLATION DES DÉPENDANCES ===
echo "📦 Installation des dépendances..." | tee -a "$LOG_FILE"
npm install >> "$LOG_FILE" 2>&1

# === BUILD DU PROJET ===
echo "🔨 Build du projet..." | tee -a "$LOG_FILE"
npm run build >> "$LOG_FILE" 2>&1
if [ $? -ne 0 ]; then
  echo "❌ Build échoué. Vérifie les logs." | tee -a "$LOG_FILE"
  exit 1
fi

# === DÉPLOIEMENT VERCEL ===
echo "🚀 Déploiement de $PROJECT_NAME sur Vercel..." | tee -a "$LOG_FILE"
vercel --yes --cwd "$PROJECT_PATH" --prod >> "$LOG_FILE" 2>&1
if [ $? -ne 0 ]; then
  echo "❌ Échec du déploiement Vercel. Abandon." | tee -a "$LOG_FILE"
  exit 1
fi

# === AJOUT DU DOMAINE PERSONNALISÉ ===
echo "🌍 Ajout du domaine personnalisé : "$DOMAIN_NAME" | tee -a "$LOG_FILE"
vercel domains add "$DOMAIN_NAME" >> "$LOG_FILE" 2>&1
if [ $? -ne 0 ]; then
  echo "⚠️ Domaine déjà ajouté ou erreur lors de l'ajout." | tee -a "$LOG_FILE"
fi

# === FIN ===
echo "✅ Déploiement terminé avec succès !" | tee -a "$LOG_FILE"
echo "🔗 Accès à ton app : https://$DOMAIN_NAME" | tee -a "$LOG_FILE"
echo "🛠️ Configure le DNS : Type=CNAME | Nom=app | Valeur=cname.vercel-dns.com" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"
if ! vercel domains ls | grep -q "$DOMAIN_NAME"; then
  vercel domains add "$DOMAIN_NAME"
else
  echo "⚠️ Domaine déjà présent sur Vercel."
fi
