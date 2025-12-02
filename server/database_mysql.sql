

CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      student_number TEXT,
      role TEXT DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
INSERT INTO users VALUES(1,'Ulaş/Admin','serdarulasbudak@gmail.com','$2a$10$uHgNreKxoR/vFHK4rttuXumRKde3r4kzg4TZe.ca.ZsMN6CChs4VG',NULL,'admin','2025-12-02 14:59:48');
INSERT INTO users VALUES(2,'Ulaş','ulasenko@gmail.com','$2a$10$NIMyEfuMSt4g7gh974M6Uemt1ECNRAgg0V/3rFhVYuSsePHtUfFFa',NULL,'user','2025-12-02 15:36:36');
CREATE TABLE news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      user_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
INSERT INTO news VALUES(1,'ÖSYM 2025 Tercih Kılavuzu ve Kontenjanlar Yayınlandı','2025 yılı tercih kılavuzu ve kontenjan bilgileri yayınlandı.','İUC Kampüs',NULL,'2025-12-02 15:28:03');
INSERT INTO news VALUES(2,'İUC Tanıtım Günleri 2025','Üniversitemizin tanıtım günleri düzenlenecektir.','İUC Kampüs',NULL,'2025-12-02 15:28:03');
INSERT INTO news VALUES(3,'İstanbul Üniversitesi-Cerrahpaşa Taban Puanları ve Başarı Sıralamaları 2025','2025 yılı taban puanları ve başarı sıralamaları yayınlandı.','İUC Kampüs',NULL,'2025-12-02 15:28:03');
CREATE TABLE events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date DATETIME NOT NULL,
      location TEXT,
      author TEXT NOT NULL,
      user_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
INSERT INTO events VALUES(1,'İUC Tanıtım Günleri 2025','Üniversitemizin tanıtım günleri düzenlenecektir.','2026-01-01T15:28:03.130Z','Merkez Kampüs','İUC Kampüs',NULL,'2025-12-02 15:28:03');
INSERT INTO events VALUES(2,'İUC Bahar Şenlikleri: İUC Fest 2025','Bahar şenlikleri kapsamında çeşitli etkinlikler düzenlenecektir.','2026-01-01T15:28:03.130Z','Merkez Kampüs','İUC Kampüs',NULL,'2025-12-02 15:28:03');
CREATE TABLE announcements (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      author TEXT NOT NULL,
      user_id INT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
INSERT INTO announcements VALUES(1,'Kadın Ev Arkadaşı Arıyorum','Merter''deki evime kadın ev arkadaşı arıyorum.','Melis Malkoç',NULL,'pending','2025-12-02 15:28:03');
INSERT INTO announcements VALUES(2,'Bakırköy Sahilde 2+1 Ev','Bakırköy sahilde 2+1 ev arkadaşı arıyorum.','Derin Tekin',NULL,'pending','2025-12-02 15:28:03');
INSERT INTO announcements VALUES(3,'Erkek ev arkadaşı','Kadıköy''deki evime erkek ev arkadaşı arıyorum.','Hamza Kaya',NULL,'pending','2025-12-02 15:28:03');
INSERT INTO announcements VALUES(4,'Yok','SDfsdfdsfsf','Ulaş',NULL,'rejected','2025-12-02 15:36:46');
CREATE TABLE qa (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT,
      author TEXT NOT NULL,
      user_id INT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
INSERT INTO qa VALUES(1,'Otopark abonelik',NULL,'dbydb',NULL,'pending','2025-12-02 15:28:03');
INSERT INTO qa VALUES(2,'Merkezi Yatay Geçiş Ders Saydırma Hakkında',NULL,'Doguhan Akdemir',NULL,'pending','2025-12-02 15:28:03');
INSERT INTO qa VALUES(3,'Yaz okulu',NULL,'Mihriban Akbaş',NULL,'pending','2025-12-02 15:28:03');
INSERT INTO qa VALUES(4,'Bu sitede bulunmasını istediğiniz başka bir içerik var mı? Varsa ne?',NULL,'Admin',NULL,'approved','2025-12-02 18:29:09');
CREATE TABLE notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      course_name TEXT,
      file_url TEXT,
      author TEXT NOT NULL,
      user_id INT,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
CREATE TABLE contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      `read_status` TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

