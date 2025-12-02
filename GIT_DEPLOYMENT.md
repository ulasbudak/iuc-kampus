# Git ile Deployment Rehberi

## 🚀 Adım 1: Git Repository Oluşturma

### GitHub'da Repository Oluşturun:
1. GitHub.com'a giriş yapın
2. "New repository" butonuna tıklayın
3. Repository adı: `iuc-kampus` (veya istediğiniz isim)
4. Public veya Private seçin
5. "Create repository" tıklayın

## 📤 Adım 2: Projeyi Git'e Push Etme

### Terminal'de (Kendi Bilgisayarınızda):

```bash
# Proje klasörüne gidin
cd ~/Desktop/İUC-kamp

# Git repository'yi başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: İUC Kampüs platformu"

# GitHub repository'nizi ekleyin (GitHub'da oluşturduğunuz URL'i kullanın)
git remote add origin https://github.com/KULLANICI_ADI/iuc-kampus.git

# Push et
git branch -M main
git push -u origin main
```

**Not:** `KULLANICI_ADI` yerine GitHub kullanıcı adınızı yazın.

## 📥 Adım 3: Hosting'den Clone Etme

### Hosting Terminal'inde (SSH ile):

```bash
# Hosting'de uygun klasöre gidin
cd ~/public_html  # veya hosting'inizin belirttiği klasör

# Repository'yi clone et
git clone https://github.com/KULLANICI_ADI/iuc-kampus.git

# Proje klasörüne gidin
cd iuc-kampus

# Server klasörüne gidin
cd server

# Bağımlılıkları yükle
npm install

# Veritabanını oluştur
node init-db.js

# Uygulamayı başlat
node server.js
```

## 🔄 Adım 4: Güncellemeleri Deploy Etme

### Kendi Bilgisayarınızda:
```bash
# Değişiklikleri commit et
git add .
git commit -m "Yeni özellik eklendi"
git push
```

### Hosting'de:
```bash
cd ~/public_html/iuc-kampus
git pull
cd server
npm install  # Yeni paketler varsa
pm2 restart iuc-kampus  # veya node server.js
```

## 🎯 Avantajları

✅ **Kolay Deployment**: `git pull` ile güncelleme
✅ **Versiyon Kontrolü**: Tüm değişiklikler kayıtlı
✅ **Yedekleme**: GitHub'da otomatik yedek
✅ **İşbirliği**: Başkaları da katkıda bulunabilir
✅ **Rollback**: Hata olursa önceki versiyona dönebilirsiniz

## ⚠️ Önemli Notlar

1. **.env dosyasını Git'e eklemeyin** (zaten .gitignore'da)
2. **database.db dosyasını Git'e eklemeyin** (zaten .gitignore'da)
3. **node_modules Git'e eklenmez** (zaten .gitignore'da)
4. **Hosting'de .env dosyası oluşturun** (Git'ten gelmez)

## 🔒 Güvenlik

- `.env` dosyası asla Git'e commit edilmemeli
- `JWT_SECRET` gibi hassas bilgiler .env'de olmalı
- GitHub'da Private repository kullanın (ücretsiz)

## 📋 Hosting'de Environment Variables

Hosting'de `.env` dosyası oluşturun:

```bash
cd ~/public_html/iuc-kampus/server
nano .env
```

İçeriği:
```env
NODE_ENV=production
PORT=5001
JWT_SECRET=<güçlü-random-string>
FRONTEND_URL=https://your-frontend-domain.com
```

## 🚀 PM2 ile Otomatik Başlatma

```bash
# PM2'yi yükle
npm install -g pm2

# Uygulamayı başlat
cd ~/public_html/iuc-kampus/server
pm2 start server.js --name iuc-kampus

# Sistem yeniden başladığında otomatik başlat
pm2 startup
pm2 save
```

## 🆘 Sorun Giderme

### "git: command not found"
- Hosting'de Git yüklü değil
- Hosting desteğinden Git yüklenmesini isteyin

### "Permission denied"
- Dosya izinlerini kontrol edin
- `chmod 755` komutunu kullanın

### "npm: command not found"
- Node.js yüklü değil
- Hosting desteğinden Node.js yüklenmesini isteyin

