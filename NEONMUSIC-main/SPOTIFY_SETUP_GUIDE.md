# 🎵 Panduan Setup Spotify API untuk NeonWave

## Langkah 1: Daftar Spotify Developer Account

1. Buka https://developer.spotify.com/dashboard
2. Login dengan akun Spotify Anda (atau buat akun baru)
3. Klik **"Create an App"**
4. Isi form:
   - **App name**: NeonWave Music Player
   - **App description**: Personal music streaming web app
   - **Redirect URI**: `http://localhost:8080/callback` (atau URL hosting Anda)
5. Centang agreement dan klik **"Create"**

## Langkah 2: Dapatkan API Credentials

Setelah app dibuat, Anda akan mendapat:
- **Client ID**: String panjang (contoh: `a1b2c3d4e5f6g7h8i9j0`)
- **Client Secret**: Klik "Show Client Secret" untuk melihat

## Langkah 3: Update spotify-config.js

Buka file `spotify-config.js` dan ganti:

```javascript
const SPOTIFY_CONFIG = {
    CLIENT_ID: 'PASTE_CLIENT_ID_DISINI',
    CLIENT_SECRET: 'PASTE_CLIENT_SECRET_DISINI',
    REDIRECT_URI: 'http://localhost:8080/callback',
};
```

## Langkah 4: Jalankan Local Server

Spotify API membutuhkan server (tidak bisa file:// protocol).

### Opsi A: Menggunakan Python (Recommended)
```bash
# Python 3
python -m http.server 8080

# Atau Python 2
python -m SimpleHTTPServer 8080
```

### Opsi B: Menggunakan Node.js
```bash
npx http-server -p 8080
```

### Opsi C: Menggunakan VS Code Extension
Install extension "Live Server" dan klik "Go Live"

## Langkah 5: Buka di Browser

Buka: `http://localhost:8080/index.html`

## Cara Menggunakan Spotify API di NeonWave

### 1. Search Lagu
```javascript
// Di console browser (F12)
const results = await spotifyAPI.searchTracks('The Weeknd Timeless');
console.log(results);
```

### 2. Get Track Preview
```javascript
const track = await spotifyAPI.getTrack('TRACK_ID');
console.log('Preview URL:', track.preview_url); // 30 detik preview
```

### 3. Get New Releases
```javascript
const newReleases = await spotifyAPI.getNewReleases(10);
console.log(newReleases);
```

## ⚠️ Keterbatasan Spotify Web API

1. **Preview Only**: Hanya bisa play 30 detik preview
2. **Full Playback**: Butuh Spotify Premium +ired, akan auto-refresh
- Cek internet connection

## 📚 Resources

- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [Spotify Console](https://developer.spotify.com/console) - Test API calls
- [Rate Limits](https://developer.spotify.com/documentation/web-api/concepts/rate-limits)

---

**Butuh bantuan?** Tanya saya untuk implementasi lebih lanjut!
 exp

Setelah setup Spotify API, Anda bisa:

1. **Integrate dengan UI**: Tampilkan hasil search di NeonWave
2. **Auto-populate playlist**: Load trending songs otomatis
3. **Recommendations**: Tampilkan rekomendasi berdasarkan listening history

## 🆘 Troubleshooting

### Error: "Invalid Client"
- Pastikan CLIENT_ID dan CLIENT_SECRET benar
- Cek tidak ada spasi di awal/akhir

### Error: "CORS"
- Harus pakai local server (http://localhost)
- Tidak bisa pakai file:// protocol

### Error: "401 Unauthorized"
- Token
## 📝 Next Steps Authorization Flow
3. **Rate Limit**: Max request per hari terbatas

## 🎯 Alternatif untuk Full Playback

Jika ingin full playback tanpa batasan:

### Opsi 1: YouTube API (Recommended)
- ✅ Gratis unlimited
- ✅ Full song playback
- ✅ Mudah implementasi
- ❌ Butuh internet

### Opsi 2: Local Files + Cloud Storage
- ✅ Full control
- ✅ Offline capable
- ❌ Butuh upload manual
- ❌ Storage cost

### Opsi 3: Spotify Web Playback SDK
- ✅ Full Spotify integration
- ✅ Official SDK
- ❌ Butuh Spotify Premium
- ❌ Complex setup
