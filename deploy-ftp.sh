#!/bin/bash

# FTP/SFTP ile Deployment Script
# Kullanım: ./deploy-ftp.sh

echo "🚀 İUC Kampüs - FTP/SFTP Deployment Script"
echo "=========================================="
echo ""

# FTP/SFTP Bilgileri (Bu bilgileri doldurun)
FTP_HOST="your-ftp-host.com"
FTP_USER="your-username"
FTP_PASS="your-password"
FTP_DIR="/public_html/server"  # veya hosting'inizin belirttiği klasör

echo "📦 Frontend build ediliyor..."
cd client
npm run build
cd ..

echo ""
echo "📤 Server dosyaları hazırlanıyor..."

# Server dosyalarını geçici bir klasöre kopyala
TEMP_DIR="server-deploy"
rm -rf $TEMP_DIR
mkdir $TEMP_DIR

# Gerekli dosyaları kopyala
cp -r server/* $TEMP_DIR/
rm -rf $TEMP_DIR/node_modules  # node_modules'i kaldır
rm -f $TEMP_DIR/database.db   # Database'i kaldır (hosting'de oluşturulacak)

echo "✅ Dosyalar hazır: $TEMP_DIR/"
echo ""
echo "📋 Yapılacaklar:"
echo "1. FTP/SFTP client kullanarak $TEMP_DIR/ klasöründeki dosyaları hosting'e yükleyin"
echo "2. Hosting panelinden SSH/Terminal erişimi açın"
echo "3. Hosting'de şu komutları çalıştırın:"
echo "   cd $FTP_DIR"
echo "   npm install"
echo "   node init-db.js"
echo "   node server.js"
echo ""
echo "💡 Alternatif: Hosting panelinden 'File Manager' kullanarak dosyaları yükleyebilirsiniz"

