# Setup Spotify API Integration

## Langkah-langkah Setup:

### 1. Daftar Spotify Developer Account
1. Buka [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Login dengan akun Spotify Anda (atau buat akun baru)
3. Klik "Create an App"

### 2. Buat Aplikasi Baru
1. **App Name**: NeonWave Music Player
2. **App Description**: Modern music streaming application
3. **Redirect URI**: `http://localhost:8080/callback` (atau sesuaikan dengan server Anda)
4. Centang agreement dan klik "Create"

### 3. Dapatkan Credentials
1. Setelah app dibuat, Anda akan melihat:
   - **Client ID**: String panjang (contoh: `a1b2c3d4e5f6g7h8i9j0`)
   - **Client Secret**: Klik "Show Client Secret" untuk melihat
2. **PENTING**: Jangan share Client Secret ke publik!

### 4. Konfigurasi Aplikasi
1. Buka file `spotify-config.js`
2. Ganti nilai berikut:
   ```javascript
   const SPOTIFY_CONFIG = {
       CLIENT_ID: 'PASTE_CLIENT_ID_DISINI',
       CLIENT_SECRET: 'PASTE_CLIENT_SECRET_DISINI',
       REDIRECT_URI: 'http://localhost:8080/callback',
   };
   ```

### 5. Jalankan Aplikasi
1. Buka aplikasi dengan web server (tidak bisa langsung buka file HTML)
2. Gunakan salah satu cara:
   
   **Cara 1: Python**
   ```bash
   python -m http.server 8080
   ```
   
   **Cara 2: Node.js (http-server)**
   ```bash
   npx http-server -p 8080
   ```
   
   **Cara 3: PHP**
   ```bash
   php -S localhost:8080
   ```

3. Buka browser: `http://localhost:8080`

## Fitur yang Tersedia:

### ✅ Search Lagu
- Ketik nama lagu/artis di search bar
- Hasil akan muncul secara real-time
- Klik lagu untuk memutar preview (30 detik)

### ✅ Trending/New Releases
- Halaman home menampilkan album terbaru dari Spotify
- Klik album untuk memutar track pertama

### ✅ Auto-play Preview
- Setiap lagu dari Spotify akan diputar preview 30 detik
- Visualizer akan bereaksi dengan audio

## Catatan Penting:

1. **Preview Only**: Spotify API hanya menyediakan preview 30 detik untuk track
2. **Rate Limit**: Ada batasan request per jam (biasanya cukup untuk penggunaan normal)
3. **CORS**: Harus dijalankan melalui web server, tidak bisa langsung buka file HTML
4. **Client Credentials Flow**: Menggunakan flow sederhana tanpa user authentication

## Troubleshooting:

### Error: "CORS policy"
- Pastikan aplikasi dijalankan melalui web server (localhost)
- Jangan buka file HTML langsung dari file explorer

### Error: "Invalid client"
- Periksa kembali Client ID dan Client Secret
- Pastikan tidak ada spasi atau karakter tambahan

### Error: "Preview not available"
- Tidak semua lagu memiliki preview
- Coba lagu lain

### Search tidak muncul hasil
- Periksa console browser (F12) untuk error
- Pastikan internet connection aktif
- Cek apakah access token berhasil didapat

## Upgrade ke Full Playback (Opsional):

Untuk memutar lagu penuh (bukan preview), Anda perlu:
1. Spotify Premium account
2. Implementasi Spotify Web Playback SDK
3. User authentication flow (OAuth)

Dokumentasi: https://developer.spotify.com/documentation/web-playback-sdk

---

**Selamat mencoba! 🎵**
