# 🚀 Hızlı Başlangıç Kılavuzu

## Mobil Ürün Kalite Kontrol Sistemi

### 1️⃣ Sistemi Başlatın (30 saniye)

1. Tarayıcınızda `inventory.html` sayfasını açın
2. Sol menüden **"Kalite Kontrol > Ürün Ölçümü"** seçin
3. Veya dashboard'daki **"Ölçüm Başlat"** butonuna tıklayın

### 2️⃣ İlk Ölçümünüzü Yapın (2 dakika)

#### Hazırlık:
- ✅ Bir referans nesne hazırlayın (Kredi kartı önerilir: 8.5cm x 5.4cm)
- ✅ Ölçülecek ürünü düz bir yüzeye yerleştirin
- ✅ İyi aydınlatma sağlayın

#### Ölçüm:
1. **"Kamerayı Aç"** butonuna tıklayın
2. Tarayıcı izni isterse **"İzin Ver"** seçin
3. Ürün ve referans nesneyi ekrana sığdırın
4. Ortadaki **yuvarlak butona** tıklayarak fotoğraf çekin
5. Sistem otomatik olarak ölçümleri hesaplayacak!

### 3️⃣ Sonuçları Kaydedin

- Ölçümler otomatik hesaplanır
- Kalite kontrol sonucu görüntülenir (BAŞARILI/BAŞARISIZ)
- **"Sonuçları Kaydet"** butonu ile kalıcı olarak saklayın
- Geçmişte son 20 ölçümü görebilirsiniz

---

## 🎯 Temel Özellikler

| Özellik | Açıklama |
|---------|----------|
| 📷 **Mobil Kamera** | Ön ve arka kamera desteği |
| 📏 **Otomatik Ölçüm** | Genişlik, yükseklik, alan hesaplama |
| ✅ **Kalite Kontrol** | Belirlenen kriterlere göre otomatik kontrol |
| 💾 **Kayıt** | localStorage ile yerel kayıt |
| 📊 **Geçmiş** | Son 20 ölçümün listesi |
| 🎨 **Responsive** | Tüm cihazlarda çalışır |

---

## ⚡ Hızlı İpuçları

### ✅ Yapılması Gerekenler:
- Referans nesneyi her zaman kullanın
- İyi aydınlatma sağlayın
- Düz açıdan (90°) fotoğraf çekin
- Nesneleri aynı düzlemde tutun

### ❌ Kaçınılması Gerekenler:
- Çok karanlık ortamlar
- Eğik açılar
- Bulanık görüntüler
- Kesik nesneler

---

## 🔧 Özelleştirme (Gelişmiş)

### Kalite Kontrol Limitlerini Değiştirme

`quality-control.html` dosyasında aşağıdaki bölümü bulun ve düzenleyin:

```javascript
const QUALITY_THRESHOLDS = {
    minWidth: 5,      // Minimum genişlik (cm)
    maxWidth: 50,     // Maximum genişlik (cm)
    minHeight: 3,     // Minimum yükseklik (cm)
    maxHeight: 30,    // Maximum yükseklik (cm)
    minConfidence: 0.7 // Minimum güven seviyesi
};
```

### Farklı Referans Nesnesi Kullanma

Kredi kartı dışında bir referans kullanıyorsanız:

```javascript
const REFERENCE_WIDTH_CM = 8.5;   // Referans genişlik (cm)
const REFERENCE_HEIGHT_CM = 5.4;  // Referans yükseklik (cm)
```

Örnek referans boyutları:
- **A4 Kağıt**: 21.0 x 29.7 cm
- **Kredi Kartı**: 8.5 x 5.4 cm
- **1 TL Madeni Para**: 2.3 cm (çap)

---

## 🐛 Sorun mu Yaşıyorsunuz?

| Sorun | Hızlı Çözüm |
|-------|-------------|
| Kamera açılmıyor | Tarayıcı izinlerini kontrol edin |
| Nesne tespit edilmiyor | Referans nesneyi netleştirin, aydınlatmayı iyileştirin |
| OpenCV yüklenmiyor | İnternet bağlantınızı kontrol edin, sayfayı yenileyin |
| Düşük güven seviyesi | Fotoğraf kalitesini artırın, daha yakından çekin |

---

## 📚 Daha Fazla Bilgi

Detaylı kullanım kılavuzu için: **[QUALITY_CONTROL_README.md](QUALITY_CONTROL_README.md)**

---

## 📞 Yardım

Sorun yaşıyorsanız:
1. Tarayıcı konsolunu açın (F12 tuşu)
2. Hata mesajlarını kontrol edin
3. Sayfayı yenileyin (Ctrl+F5)
4. Farklı tarayıcı deneyin

---

## ✨ Başarılı Ölçümler!

Sistem kullanıma hazır. İyi çalışmalar! 🎉
