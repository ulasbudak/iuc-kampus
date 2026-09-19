# İUC Kampüs

İstanbul Üniversitesi-Cerrahpaşa öğrenci ve mezun platformu.

*[English version below](#iuc-campus-english)*

## Özellikler

- 📰 Haber & Duyurular
- 🎉 Etkinlikler
- 📋 İlanlar
- ❓ Soru-Cevap
- 💰 Burs Haberleri
- 💼 Kariyer & Staj İlanları
- 📚 Ders Notları
- 🏫 Kurslar
- 🏠 Yurtlar
- 📅 Akademik Takvim
- 🚗 Otopark Bilgileri
- 🚌 Ulaşım Bilgileri
- 📱 WhatsApp Grupları
- 🍽️ Yemekhane Menüsü

## Kurulum

```bash
# Tüm bağımlılıkları yükle
npm run install:all

# Development modunda çalıştır (hem frontend hem backend)
npm run dev

# Sadece frontend çalıştır
npm run dev:client

# Sadece backend çalıştır
npm run dev:server
```

Frontend `http://localhost:3000` adresinde, backend `http://localhost:5000` adresinde çalışacaktır.

Admin kullanıcısı oluşturmak isterseniz `ADMIN_EMAIL` ve `ADMIN_PASSWORD` ortam değişkenlerini ayarlayın (bkz. [DEPLOYMENT.md](DEPLOYMENT.md)).

## Teknolojiler

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- SQLite

## Deployment ve güvenlik

- Deployment adımları için [DEPLOYMENT.md](DEPLOYMENT.md)
- Alınan güvenlik önlemleri için [SECURITY.md](SECURITY.md)

## Lisans

MIT — bkz. [LICENSE](LICENSE)

---

## İUC Campus (English)

A student and alumni platform for Istanbul University-Cerrahpaşa (İÜC), covering campus news, events, listings, Q&A, scholarship news, career/internship postings, course notes, courses, dorms, academic calendar, parking, transportation info, WhatsApp groups, and the cafeteria menu.

### Setup

```bash
npm run install:all   # install all dependencies
npm run dev            # run frontend + backend in dev mode
npm run dev:client     # frontend only
npm run dev:server     # backend only
```

Frontend runs at `http://localhost:3000`, backend at `http://localhost:5000`.

To seed an admin user, set the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables (see [DEPLOYMENT.md](DEPLOYMENT.md)).

### Tech stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router
**Backend:** Node.js, Express, SQLite

### License

MIT — see [LICENSE](LICENSE)
