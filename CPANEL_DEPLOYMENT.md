# cPanel Deployment Rehberi

## ✅ .cpanel.yml Dosyası Oluşturuldu

`.cpanel.yml` dosyası oluşturuldu ve GitHub'a push edildi.

## 📋 cPanel'de Yapılacaklar

### 1. cPanel Git Version Control

1. cPanel'e giriş yapın
2. "Git Version Control" bölümünü bulun
3. "Create" butonuna tıklayın
4. Repository URL: `https://github.com/ulasbudak/iuc-kampus.git`
5. Repository Branch: `main`
6. Repository Path: `public_html` (veya istediğiniz klasör)
7. "Create" tıklayın

### 2. Deployment Ayarları

cPanel otomatik olarak `.cpanel.yml` dosyasını okuyacak ve deployment yapacak.

**Not:** Eğer otomatik deployment çalışmazsa, manuel olarak:

```bash
# SSH ile bağlanın
cd ~/public_html
git pull
cd server
npm install
node init-db.js
node server.js
```

## 🔧 .cpanel.yml Yapılandırması

Mevcut `.cpanel.yml` dosyası:
- Server dosyalarını `public_html/server/` klasörüne kopyalar
- `npm install` çalıştırır
- Veritabanını oluşturur
- Frontend build dosyalarını kopyalar

## ⚠️ Önemli Notlar

1. **Frontend Build:** Önce kendi bilgisayarınızda `cd client && npm run build` yapın
2. **Environment Variables:** cPanel'den `.env` dosyası oluşturun
3. **Port:** cPanel genellikle belirli bir port kullanır, kontrol edin
4. **Node.js:** cPanel'de Node.js yüklü olmalı

## 🆘 Sorun Giderme

### "The system cannot deploy"
- `.cpanel.yml` dosyasının repository'de olduğundan emin olun
- Tüm değişikliklerin commit edildiğinden emin olun
- cPanel Git Version Control'de repository'yi kontrol edin

### "No uncommitted changes"
- Tüm değişiklikleri commit edin: `git add . && git commit -m "message" && git push`

### Deployment Çalışmıyor
- SSH ile manuel deployment yapın
- cPanel log'larını kontrol edin
- `.cpanel.yml` syntax'ını kontrol edin

## 📝 Manuel Deployment (Alternatif)

Eğer `.cpanel.yml` çalışmazsa:

```bash
# SSH ile bağlan
ssh kullanici@hosting.com

# Repository'yi clone et (ilk sefer)
cd ~/public_html
git clone https://github.com/ulasbudak/iuc-kampus.git
cd iuc-kampus

# Frontend build (kendi bilgisayarınızda yapın ve push edin)
# cd client && npm run build && git add . && git commit -m "build" && git push

# Server setup
cd server
npm install
node init-db.js

# .env dosyası oluştur
nano .env
# İçeriği:
# NODE_ENV=production
# PORT=5001
# JWT_SECRET=<güçlü-random-string>
# FRONTEND_URL=https://your-domain.com

# Uygulamayı başlat
node server.js
# veya PM2 ile
pm2 start server.js --name iuc-kampus
```

## 🔄 Güncellemeler

Güncelleme yapmak için:

```bash
# Kendi bilgisayarınızda
git add .
git commit -m "Güncelleme"
git push

# Hosting'de (SSH ile)
cd ~/public_html/iuc-kampus
git pull
cd server
npm install  # Yeni paketler varsa
pm2 restart iuc-kampus  # veya node server.js
```

