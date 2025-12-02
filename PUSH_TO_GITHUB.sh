#!/bin/bash

# GitHub'a Push Etme Script'i
# Kullanım: ./PUSH_TO_GITHUB.sh

echo "🚀 İUC Kampüs - GitHub'a Push"
echo "=============================="
echo ""

# GitHub repository URL'inizi buraya yazın
read -p "GitHub repository URL'inizi girin (örn: https://github.com/kullanici/iuc-kampus.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL'i gerekli!"
    exit 1
fi

echo ""
echo "📦 Dosyalar commit ediliyor..."

# Git repository başlat (eğer yoksa)
if [ ! -d ".git" ]; then
    git init
fi

# Remote ekle (eğer yoksa)
if ! git remote | grep -q "origin"; then
    git remote add origin "$REPO_URL"
else
    git remote set-url origin "$REPO_URL"
fi

# Tüm dosyaları ekle
git add .

# Commit et
git commit -m "Initial commit: İUC Kampüs platformu"

# Main branch'e geç
git branch -M main

echo ""
echo "📤 GitHub'a push ediliyor..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Başarıyla GitHub'a push edildi!"
    echo ""
    echo "📋 Sonraki Adımlar:"
    echo "1. Hosting'de SSH ile bağlanın"
    echo "2. Şu komutları çalıştırın:"
    echo "   cd ~/public_html"
    echo "   git clone $REPO_URL"
    echo "   cd iuc-kampus/server"
    echo "   npm install"
    echo "   node init-db.js"
    echo "   node server.js"
else
    echo ""
    echo "❌ Push başarısız oldu!"
    echo "GitHub kullanıcı adı ve şifrenizi kontrol edin."
fi

