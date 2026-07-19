# BLOK — Tetris

UX odaklı Next.js Tetris oyunu.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini aç.

## Özellikler

- Klasik Tetris oynanışı
- Mobil tek ekran düzeni (kaydırma yok)
- Rekor skoru (`/api/game/best-score`)
- Klavye + dokunmatik kontroller

## API

| Endpoint | Açıklama |
|---|---|
| `GET /api/game` | Oyun yapılandırması |
| `GET /api/game/best-score` | Rekor skoru |
| `POST /api/game/best-score` | Rekor kaydet |
