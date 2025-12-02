# GitHub'a Push Etme - Hızlı Komutlar

## ✅ Commit Tamamlandı!

Şimdi GitHub repository URL'inizi ekleyip push edin:

## 🚀 Komutlar (Terminal'de Çalıştırın):

```bash
cd ~/Desktop/İUC-kamp

# GitHub repository URL'inizi ekleyin (aşağıdaki örnekteki gibi)
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADI.git

# Push edin
git push -u origin main
```

## 📝 Örnek:

Eğer repository URL'iniz `https://github.com/ulasbudak/iuc-kampus.git` ise:

```bash
git remote add origin https://github.com/ulasbudak/iuc-kampus.git
git push -u origin main
```

## 🔐 GitHub Authentication:

Push ederken GitHub kullanıcı adı ve şifreniz istenebilir. 
Eğer 2FA (iki faktörlü doğrulama) açıksa, Personal Access Token kullanmanız gerekebilir.

## ✅ Başarılı Olursa:

"Enumerating objects..." ve "Writing objects..." mesajlarını göreceksiniz.
Sonunda "To https://github.com/..." mesajı görünecek.

## 🆘 Sorun Olursa:

- "remote origin already exists" → `git remote set-url origin https://github.com/...` kullanın
- "Authentication failed" → Personal Access Token oluşturun
- "Permission denied" → Repository'nin size ait olduğundan emin olun

