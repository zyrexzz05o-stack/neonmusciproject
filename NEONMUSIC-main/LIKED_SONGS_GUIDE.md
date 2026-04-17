# 💖 Liked Songs Page Guide

## Overview

Halaman Liked Songs adalah halaman khusus untuk menampilkan daftar lagu favorit dengan desain dark glassmorphism monokrom yang elegan dan modern.

## Desain Visual

### Warna & Style
- **Dark Mode**: Background hitam dengan glassmorphism
- **Monokrom**: Hanya hitam, abu-abu, dan putih
- **Glassmorphism**: Background transparan dengan blur effect
- **Rounded Corners**: Sudut melengkung halus (12-16px)
- **Shadows**: Shadow lembut untuk depth

### Typography
- **Headings**: Space Grotesk (geometric, modern)
- **Body**: DM Sans (clean, readable)

## Struktur Halaman

### 1. Playlist Header (Bagian Atas)
```
┌─────────────────────────────────────────────┐
│  ┌────┐                                     │
│  │ ❤️ │  PLAYLIST                           │
│  │    │  Lagu yang Disukai                  │
│  └────┘  10 lagu • Koleksi musik favorit    │
└─────────────────────────────────────────────┘
```

**Fitur:**
- Cover box dengan icon hati putih
- Gradient background dengan glassmorphism
- Judul besar (72px) dengan shadow
- Metadata: jumlah lagu dan deskripsi

### 2. Action Bar
```
┌─────────────────────────────────────────────┐
│  ⚪ Play   ⭕ Shuffle   ⭕ Download   🔍 Cari │
└─────────────────────────────────────────────┘
```

**Tombol:**
- **Play All**: Tombol putih solid, play semua lagu
- **Shuffle**: Outline putih, acak lagu
- **Download**: Outline putih, download playlist
- **Search**: Input search di kanan

### 3. Table Header (Sticky)
```
┌───┬──────────┬────────┬──────────────────┬────────┐
│ # │  JUDUL   │ ALBUM  │ TANGGAL DITAMBAH │ DURASI │
└───┴──────────┴────────┴──────────────────┴────────┘
```

**Kolom:**
- Nomor urut
- Judul (dengan thumbnail & artis)
- Album
- Tanggal ditambahkan
- Durasi

### 4. Songs List
```
┌───┬──────────────────────┬────────┬──────────┬────────┐
│ 1 │ 🖼️ Timeless          │ Album  │ 2 hari   │ 4:32  │
│   │    The Weeknd        │        │          │       │
├───┼──────────────────────┼────────┼──────────┼────────┤
│ 2 │ 🖼️ Say You Won't...  │ Album  │ 5 hari   │ 3:31  │
│   │    James Arthur      │        │          │       │
└───┴──────────────────────┴────────┴──────────┴────────┘
```

## Interaksi

### Hover Effects
- **Row Hover**: Background abu transparan
- **Play Button**: Muncul saat hover, replace nomor
- **Tombol Action**: Glow putih lembut
- **Song Name**: Text shadow saat hover

### Click Actions
- **Klik Row**: Memutar lagu
- **Klik Play Button**: Memutar lagu
- **Play All**: Memutar lagu pertama
- **Search**: Filter lagu real-time

### Active State
- Row yang sedang diputar: background lebih terang
- Song name: text shadow lebih kuat

## Fitur Fungsional

### 1. Play Song
```javascript
// Klik row atau play button akan memutar lagu
playTrack(artist, song, image, video);
```

### 2. Search
```javascript
// Real-time search berdasarkan judul atau artis
searchInput.addEventListener('input', filterSongs);
```

### 3. Play All
```javascript
// Play lagu pertama dari playlist
playAllBtn.addEventListener('click', playFirstSong);
```

## Daftar Lagu

1. **Timeless** - The Weeknd (4:32)
2. **Say You Won't Let Go** - James Arthur (3:31)
3. **Evaluasi** - Hindia (4:15)
4. **Love Yourself** - Justin Bieber (3:53)
5. **Night Changes** - One Direction (3:46)
6. **Fix You** - Coldplay (4:54)
7. **The Night We Met** - Lord Huron (3:28)
8. **Aku Milikmu** - Dewa 19 (4:42)
9. **Wish You Were Here** - Neck Deep (3:37)
10. **Penjaga Hati** - Nadhif Basalamah (4:18)

## Navigasi

### Cara Akses:
1. Klik **"Saved Waves"** (icon ❤️) di sidebar floating
2. Atau klik **"Liked Songs"** di sidebar utama

### Page Mapping:
```javascript
'Liked Songs': 'liked-songs.html'
```

## Responsive Design

### Desktop (> 1200px)
- Semua kolom tampil
- Layout grid penuh

### Tablet (768px - 1200px)
- Kolom Album disembunyikan
- Grid: # | Judul | Tanggal | Durasi

### Mobile (< 768px)
- Hanya: # | Judul | Durasi
- Header vertikal
- Search disembunyikan

## Files

### HTML
- `liked-songs.html` - Struktur halaman

### CSS
- `liked-songs.css` - Styling khusus halaman

### JavaScript
- Inline script di `liked-songs.html`
- Menggunakan fungsi `playTrack()` dari `script.js`

## Styling Details

### Colors
```css
Background: rgba(20, 20, 20, 0.4) - rgba(40, 40, 40, 0.6)
Text Primary: #ffffff
Text Secondary: rgba(255, 255, 255, 0.6)
Border: rgba(255, 255, 255, 0.08)
Hover: rgba(255, 255, 255, 0.05)
```

### Shadows
```css
Box Shadow: 0 8px 32px rgba(0, 0, 0, 0.4)
Text Shadow: 0 4px 20px rgba(0, 0, 0, 0.5)
Glow: 0 0 20px rgba(255, 255, 255, 0.2)
```

### Blur
```css
Backdrop Filter: blur(16px) - blur(20px)
```

## Best Practices

1. **Tidak mengubah halaman lain** - Hanya styling untuk liked-songs
2. **Menggunakan player existing** - Tidak membuat player baru
3. **Konsisten dengan theme** - Dark glassmorphism monokrom
4. **Smooth transitions** - Semua animasi 0.2s - 0.3s
5. **Accessible** - Hover states jelas, contrast baik

## Tips

- Gunakan search untuk menemukan lagu cepat
- Hover di row untuk melihat play button
- Klik Play All untuk mulai playlist
- Table header sticky saat scroll

---

**Catatan:** Halaman ini dirancang khusus untuk menampilkan lagu favorit dengan desain yang elegan, modern, dan konsisten dengan tema NeonWave Music Player.
