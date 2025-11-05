# Ürün Kalite Kontrol Sistemi - Kullanım Kılavuzu

## 📱 Genel Bakış

Bu sistem, mobil cihazlardan ürün fotoğrafları çekerek görüntü işleme teknolojisi ile otomatik ölçüm ve kalite kontrolü yapmanızı sağlar.

## 🎯 Özellikler

### Temel Özellikler
- **Mobil Kamera Entegrasyonu**: Telefon kamerası ile canlı görüntü ve fotoğraf çekme
- **Ön/Arka Kamera Desteği**: İhtiyacınıza göre kamera seçimi
- **Görüntü İşleme**: OpenCV.js ile profesyonel seviyede görüntü analizi
- **Otomatik Ölçüm**: Referans nesne kullanarak gerçek boyut hesaplama
- **Kalite Kontrol**: Belirlenen kriterlere göre otomatik kontrol
- **Geçmiş Takibi**: Tüm ölçümlerin kaydı ve raporlama
- **Responsive Tasarım**: Tüm cihazlarda sorunsuz çalışma

### Teknik Özellikler
- **Görüntü İşleme**: OpenCV.js 4.5.2
- **Kenar Tespiti**: Canny edge detection algoritması
- **Kontur Analizi**: Nesne tanıma ve sınır belirleme
- **Ölçek Hesaplama**: Referans tabanlı piksel-cm dönüşümü
- **Veri Saklama**: localStorage ile tarayıcı tabanlı depolama

## 🚀 Başlangıç

### Sistem Gereksinimleri
- Modern bir web tarayıcısı (Chrome 90+, Safari 14+, Firefox 88+)
- Kameralı mobil cihaz veya bilgisayar
- İnternet bağlantısı (OpenCV.js yüklemesi için ilk açılışta)

### Hızlı Başlangıç

1. **Ana Sayfadan Erişim**
   - `inventory.html` sayfasını açın
   - Sol menüden "Kalite Kontrol > Ürün Ölçümü" seçin
   - Veya dashboard'daki "Ölçüm Başlat" butonuna tıklayın

2. **Doğrudan Erişim**
   - Doğrudan `quality-control.html` sayfasını açabilirsiniz

## 📖 Kullanım Talimatları

### Adım 1: Hazırlık

1. **Referans Nesne Hazırlayın**
   - Bilinen boyutlarda bir referans nesne gereklidir
   - Önerilen: Standart kredi kartı (8.5cm x 5.4cm)
   - Alternatifler: A4 kağıt (21cm x 29.7cm), cetvel, vb.

2. **Ürünü Konumlandırın**
   - Ürünü düz ve iyi aydınlatılmış bir yüzeye yerleştirin
   - Referans nesneyi ürünün yakınına koyun
   - Her iki nesnenin de tam görünür olduğundan emin olun

### Adım 2: Fotoğraf Çekme

1. **Kamerayı Açın**
   - "Kamerayı Aç" butonuna tıklayın
   - Tarayıcı izin isterse "İzin Ver" seçin
   - İsteğe bağlı: "Ön/Arka" butonu ile kamera değiştirin

2. **Çerçeveleme**
   - Ürün ve referans nesneyi ekrana sığdırın
   - Nesnelerin tamamı görünür olmalı
   - Mümkünse düz açıdan çekin (90 derece)
   - Gölgeler ve yansımaları minimize edin

3. **Çekim**
   - Ortadaki yuvarlak butona tıklayarak fotoğraf çekin
   - Sistem otomatik olarak işleme başlayacak

### Adım 3: Sonuçları İnceleme

Fotoğraf çekildikten sonra sistem otomatik olarak:

1. **Görüntü İşleme**
   - Kenarları tespit eder
   - Nesneleri tanımlar
   - Referans nesneyi bulur

2. **Ölçüm Hesaplama**
   - Genişlik (cm)
   - Yükseklik (cm)
   - Alan (cm²)
   - Tespit güveni (%)

3. **Kalite Kontrol**
   - Ölçüleri belirlenen limitlerle karşılaştırır
   - BAŞARILI veya BAŞARISIZ durumu belirler
   - Detaylı kontrol raporu sunar

### Adım 4: Kaydetme ve Raporlama

1. **Sonuçları Kaydet**
   - "Sonuçları Kaydet" butonuna tıklayın
   - Ölçüm otomatik olarak geçmişe eklenir

2. **Geçmişi Görüntüle**
   - Sayfa altındaki "Ölçüm Geçmişi" bölümünde tüm kayıtları görebilirsiniz
   - Son 20 ölçüm saklanır

3. **Yeni Ölçüm**
   - "Yeni Ölçüm" butonuna tıklayarak baştan başlayın

## ⚙️ Kalite Kontrol Kriterleri

Sistem aşağıdaki kriterleri kontrol eder:

### Varsayılan Limitler
```javascript
Genişlik: 5 - 50 cm
Yükseklik: 3 - 30 cm
Minimum Güven: %70
```

### Özelleştirme

Kriterleri değiştirmek için `quality-control.html` dosyasındaki `QUALITY_THRESHOLDS` nesnesini düzenleyin:

```javascript
const QUALITY_THRESHOLDS = {
    minWidth: 5,      // Minimum genişlik (cm)
    maxWidth: 50,     // Maximum genişlik (cm)
    minHeight: 3,     // Minimum yükseklik (cm)
    maxHeight: 30,    // Maximum yükseklik (cm)
    minConfidence: 0.7 // Minimum güven seviyesi (0-1)
};
```

## 🔧 Teknik Detaylar

### Görüntü İşleme Akışı

1. **Ön İşleme**
   ```
   Renkli Görüntü → Gri Tonlama → Gaussian Blur
   ```

2. **Kenar Tespiti**
   ```
   Canny Edge Detection (eşik: 50-150)
   ```

3. **Kontur Bulma**
   ```
   cv.findContours() → En büyük kontorları seç
   ```

4. **Ölçüm Hesaplama**
   ```
   Referans Genişlik (cm) / Referans Genişlik (piksel) = Piksel-CM Oranı
   Ürün Genişlik (piksel) × Piksel-CM Oranı = Ürün Genişlik (cm)
   ```

### Veri Yapısı

Her ölçüm aşağıdaki bilgileri içerir:

```javascript
{
    timestamp: "2025-11-05T10:30:00.000Z",
    width: "15.30",          // cm
    height: "8.75",          // cm
    area: "133.88",          // cm²
    confidence: "0.85",      // 0-1 arası
    passed: true,            // kalite kontrolü sonucu
    checks: [                // detaylı kontrol listesi
        {
            label: "Genişlik Kontrolü",
            status: true,
            message: "15.30 cm (Kabul edilebilir)"
        },
        // ...
    ],
    image: "data:image/jpeg;base64,..." // base64 formatında görsel
}
```

## 🎨 Kullanıcı Arayüzü

### Renk Kodları
- **Mavi (#4e73df)**: Başarılı işlemler, ana vurgular
- **Yeşil (#1cc88a)**: Geçen kalite kontrolleri
- **Kırmızı (#e74a3b)**: Başarısız kontroller
- **Sarı (#f6c23e)**: Uyarılar ve bilgilendirmeler

### Responsive Breakpoints
- **Mobil**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 991px

## 📊 Performans

### Optimizasyon İpuçları

1. **İyi Aydınlatma**
   - Doğal veya beyaz ışık kullanın
   - Gölgeleri minimize edin
   - Parlama ve yansımaları önleyin

2. **Yüksek Çözünürlük**
   - Mümkünse arka kamera kullanın (daha yüksek çözünürlük)
   - Yakın plan çekim yapın
   - Odak netliğine dikkat edin

3. **Doğru Pozisyonlama**
   - Kamerayı düz tutun (90 derece açı)
   - Nesneleri yüzeye paralel yerleştirin
   - Referans ve ürünü aynı düzlemde tutun

## 🐛 Sorun Giderme

### Yaygın Sorunlar ve Çözümler

#### "Kamera erişimi reddedildi"
- **Çözüm**: Tarayıcı ayarlarından kamera iznini kontrol edin
- Chrome: Ayarlar > Gizlilik ve güvenlik > Site ayarları > Kamera
- Safari: iOS Ayarlar > Safari > Kamera

#### "Yeterli nesne tespit edilemedi"
- **Çözüm**: 
  - Referans nesnenin açıkça görünür olduğundan emin olun
  - Aydınlatmayı iyileştirin
  - Arka plan karmaşasını azaltın
  - Daha yakından çekim yapın

#### "Görüntü işleme sistemi hazır değil"
- **Çözüm**: 
  - İnternet bağlantınızı kontrol edin (OpenCV.js yüklenmesi için)
  - Sayfayı yenileyin
  - Tarayıcı konsolunu kontrol edin (F12)

#### "Düşük güven seviyesi"
- **Çözüm**: 
  - Fotoğraf kalitesini artırın
  - Referans nesneyi daha net konumlandırın
  - Odak ve netliği iyileştirin

### Loglama ve Hata Ayıklama

Tarayıcı konsolunu açın (F12) ve şu mesajları kontrol edin:
- ✅ "OpenCV.js is ready!" → Sistem hazır
- ❌ "Görüntü işleme hatası" → İşleme problemi
- ⚠️ "Kamera erişim hatası" → İzin sorunu

## 📱 Mobil Kullanım İpuçları

1. **Yatay Mod**: Daha iyi çerçeveleme için telefonu yatay tutun
2. **Sabit Tutun**: Titreşimi önlemek için telefonu sabit tutun veya destekleyin
3. **Pil**: İşlem pil tüketebilir, şarj seviyesine dikkat edin
4. **Depolama**: 20 ölçüm sonrası eski kayıtlar otomatik silinir

## 🔒 Güvenlik ve Gizlilik

- **Yerel Depolama**: Tüm veriler cihazınızda saklanır
- **Sunucu Yok**: Görüntüler veya ölçümler sunucuya gönderilmez
- **Kamera İzni**: Sadece sayfa açıkken kamera erişimi vardır
- **Veri Silme**: Tarayıcı verilerini temizleyerek tüm kayıtları silebilirsiniz

## 🔄 Güncellemeler ve Geliştirmeler

### Gelecek Özellikler (Planlanan)

- [ ] Çoklu referans nesne desteği
- [ ] QR kod ile ürün tanıma
- [ ] Toplu ölçüm modu
- [ ] Excel/PDF rapor dışa aktarma
- [ ] Bulut senkronizasyonu (opsiyonel)
- [ ] Gelişmiş AI tabanlı nesne tanıma
- [ ] Ölçüm karşılaştırma grafikleri

## 📞 Destek

### Yardım Kaynakları

- 📖 Bu döküman: `QUALITY_CONTROL_README.md`
- 🏠 Ana sayfa: `inventory.html`
- 🔧 Teknik detaylar: Kaynak kodundaki yorumlar

### Sık Sorulan Sorular

**S: OpenCV.js yüklenmesi ne kadar sürer?**
C: İlk açılışta internet hızınıza bağlı olarak 5-10 saniye sürebilir. Sonraki açılışlarda tarayıcı önbelleğinden hızlıca yüklenir.

**S: Hangi referans nesneleri kullanabilirim?**
C: Standart boyutlarda herhangi bir nesne: kredi kartı (8.5x5.4cm), A4 kağıt (21x29.7cm), madeni para (2.3cm çap), cetvel, vb.

**S: Kaydedilen ölçümler ne kadar saklanır?**
C: Tarayıcı verilerini temizlemediğiniz sürece kalıcıdır. Ancak sadece son 20 ölçüm listelenir.

**S: İnternet bağlantısı olmadan çalışır mı?**
C: İlk açılıştan sonra (OpenCV.js yüklendikten sonra) çevrimdışı çalışabilir.

## 🏆 En İyi Uygulamalar

### Doğru Ölçüm İçin

1. ✅ Referans nesneyi her zaman kullanın
2. ✅ İyi ışıklandırma sağlayın
3. ✅ Düz açıdan fotoğraf çekin
4. ✅ Nesneleri aynı düzlemde tutun
5. ✅ Arka planı sade tutun

### Kaçınılması Gerekenler

1. ❌ Çok karanlık veya parlak ortamlar
2. ❌ Eğik açılardan çekim
3. ❌ Bulanık veya titrek görüntüler
4. ❌ Kesik veya eksik görünen nesneler
5. ❌ Karmaşık arka planlar

## 📈 Örnek Kullanım Senaryoları

### 1. Üretim Kalite Kontrolü
Üretim hattında ürünlerin boyutlarını hızlıca kontrol etmek için kullanın.

### 2. Kargo ve Lojistik
Gönderilecek paketlerin boyutlarını ölçerek kargo hesaplaması yapın.

### 3. E-ticaret
Satışa sunulacak ürünlerin gerçek ölçülerini kaydedin.

### 4. Envanter Yönetimi
Raf ve depo planlaması için ürün boyutlarını dokümante edin.

## 🛠️ Geliştiriciler İçin

### Kod Yapısı

```
quality-control.html
├── HTML Structure
│   ├── Navigation
│   ├── Instructions
│   ├── Camera Container
│   ├── Results Section
│   └── History Section
├── CSS Styling
│   ├── Responsive Design
│   ├── Color Scheme
│   └── Animations
└── JavaScript
    ├── Camera Management
    ├── OpenCV Integration
    ├── Image Processing
    ├── Measurement Calculation
    ├── Quality Control Logic
    └── Data Persistence
```

### Özelleştirme Noktaları

1. **Görsel Tasarım**: CSS `style` bloğunu düzenleyin
2. **Kalite Kriterleri**: `QUALITY_THRESHOLDS` nesnesini güncelleyin
3. **Referans Boyutları**: `REFERENCE_WIDTH_CM` ve `REFERENCE_HEIGHT_CM` değişkenlerini değiştirin
4. **Depolama Limiti**: `saveResults()` fonksiyonundaki `measurements.length > 20` kontrolünü düzenleyin

### API Referansları

- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [OpenCV.js Documentation](https://docs.opencv.org/4.5.2/d5/d10/tutorial_js_root.html)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## 📄 Lisans ve Telif Hakkı

Bu yazılım eğitim ve ticari kullanım için geliştirilmiştir.

---

**Son Güncelleme**: 05 Kasım 2025  
**Versiyon**: 1.0.0  
**Durum**: ✅ Aktif
