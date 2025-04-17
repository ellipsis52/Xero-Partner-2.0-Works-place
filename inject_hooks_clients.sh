    # 🧹 Hook pre-push pour retirer la clé
    PRE_PUSH_PATH="$dir/.git/hooks/pre-push"
    cat <<EOF > "$PRE_PUSH_PATH"
#!/bin/bash
ENV_FILE="\$(git rev-parse --show-toplevel)/.env"
if [ -f "\$ENV_FILE" ]; then
  grep -v "^OPENAI_API_KEY=" "\$ENV_FILE" > "\$ENV_FILE.tmp" && mv "\$ENV_FILE.tmp" "\$ENV_FILE"
fi
echo "🔐 Clé OpenAI retirée de .env avant push"
EOF

    chmod +x "$PRE_PUSH_PATH"
    echo "🧹 Hook de nettoyage installé pour $dir"
for dir in ...