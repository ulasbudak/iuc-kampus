# Deployment (cPanel + Git)

## 1. cPanel Git Version Control

1. cPanel'e giriş yapın ve "Git Version Control" bölümünü açın
2. "Create" → Repository URL: `https://github.com/ulasbudak/iuc-kampus.git`, Branch: `main`, Path: `public_html` (veya tercih ettiğiniz klasör)
3. `.cpanel.yml` dosyası otomatik olarak deployment adımlarını çalıştırır: server dosyalarını `public_html/server/` içine kopyalar, `npm install` çalıştırır, veritabanını oluşturur ve frontend build dosyalarını kopyalar.

## 2. Frontend build

Deploy etmeden önce kendi bilgisayarınızda:

```bash
cd client && npm run build
git add . && git commit -m "build" && git push
```

## 3. Sunucu kurulumu (SSH)

```bash
cd public_html/server
npm install
node init-db.js
```

`.env` dosyası oluşturun (asla Git'e commit etmeyin):

```
NODE_ENV=production
PORT=5001
JWT_SECRET=<güçlü-random-string>
FRONTEND_URL=https://your-domain.com
# Admin kullanıcısı oluşturmak isterseniz (opsiyonel, boş bırakılırsa admin seed edilmez):
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=<güçlü-şifre>
```

Uygulamayı başlatın:

```bash
node server.js
# veya PM2 ile (önerilen)
pm2 start server.js --name iuc-kampus
pm2 save
```

## 4. Admin kullanıcısı oluşturma/güncelleme

`ADMIN_EMAIL` ve `ADMIN_PASSWORD` ortam değişkenleri ayarlıysa sunucu başlangıcında admin otomatik oluşturulur/güncellenir. Manuel çalıştırmak için:

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=<güçlü-şifre> node create-admin.js
```

## 5. Güncellemeler

```bash
# Kendi bilgisayarınızda
git add . && git commit -m "Güncelleme" && git push

# Hosting'de (SSH ile)
cd ~/public_html/iuc-kampus
git pull
cd server && npm install
pm2 restart iuc-kampus
```

## Sorun giderme

- `npm: command not found` → Node.js yüklü değil, hosting desteğinden isteyin
- `Port already in use` → Farklı bir port kullanın (`PORT=3000`)
- `Permission denied` → Dosya izinlerini kontrol edin (`chmod 755`)
- `The system cannot deploy` → `.cpanel.yml` dosyasının repoda olduğundan ve tüm değişikliklerin commit edildiğinden emin olun
- `node_modules` ve `database.db` dosyalarını repoya YÜKLEMEYİN — `npm install` ve `init-db.js` bunları oluşturur
- `.env` dosyasını asla Git'e commit etmeyin
