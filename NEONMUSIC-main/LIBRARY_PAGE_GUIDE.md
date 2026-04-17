# 📚 Library Page Guide

## Overview

Halaman Library adalah pusat navigasi koleksi musik yang berfungsi sebagai hub untuk mengakses berbagai kategori musik, BUKAN untuk memutar lagu langsung.

## Konsep Desain

**Personal Music Hub** - Pendekatan berbasis kategori dengan card interaktif yang mengarahkan ke halaman detail.

## Perbedaan dari Halaman Lain

### Library vs Liked Songs vs Home

```
HOME
├── Fokus: Discovery & Trending
├── Konten: Rekomendasi, trending, sound journey
└── Fungsi: Eksplorasi musik baru

LIBRARY
├── Fokus: Navigasi koleksi
├── Konten: Kategori (Liked Songs, Playlist, Album, Artist)
└── Fungsi: Hub untuk mengakses koleksi

LIKED SONGS
├── Fokus: Pemutaran lagu favorit
├── Konten: Daftar lagu yang di-like
└── Fungsi: Play lagu langsung
```

## Struktur Halaman

### 1. Simple Header
```
┌─────────────────────────┐
│  Library                │
│  Jelajahi koleksi musik │
└─────────────────────────┘
```

**Elemen:**
- Judul: "Library" (56px, Space Grotesk)
- Subtitle: Deskripsi singkat
- Tanpa banner atau cover besar

### 2. Category Grid (6 Cards)

```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ ❤️       │ │ 📋       │ │ 💿       │
│ Liked    │ │ Playlist │ │ Albums   │
│ 10 lagu  │ │ 5 list   │ │ 8 album  │
└──────────┘ └──────────┘ └──────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐
│ 👥       │ │ 🕐       │ │ ⬇️       │
│ Artists  │ │ Recent   │ │ Download │
│ 10 artis │ │ 15 lagu  │ │ 0 lagu   │
└──────────┘ └──────────┘ └──────────┘
```

**Kategori:**
1. **Liked Songs** ❤️ - Lagu yang disukai (10 lagu)
2. **Playlists** 📋 - Daftar playlist (5 playlist)
3. **Albums** 💿 - Album tersimpan (8 album)
4. **Artists** 👥 - Artis yang diikuti (10 artis)
5. **Recently Played** 🕐 - Riwayat putar (15 lagu)
6. **Downloads** ⬇️ - Lagu terunduh (0 lagu)

### 3. Quick Stats

```
┌─────────────────────────────────────┐
│  10        10        8        5     │
│  Lagu    Artis    Album   Playlist  │
└─────────────────────────────────────┘
```

**Statistik:**
- Total lagu dalam koleksi
- Jumlah artis yang diikuti
- Jumlah album tersimpan
- Jumlah playlist dibuat

### 4. Recent Activity

```
┌─────────────────────────────────────┐
│ 🎵 Menambahkan lagu ke Liked Songs  │
│    2 jam yang lalu                  │
├─────────────────────────────────────┤
│ 📀 Menyimpan album "Timeless"       │
│    1 hari yang lalu                 │
├─────────────────────────────────────┤
│ 👤 Mengikuti artis "The Weeknd"     │
│    3 hari yang lalu                 │
└─────────────────────────────────────┘
```

**Aktivitas:**
- Riwayat aksi terakhir
- Timestamp relatif
- Icon kategori

## Interaksi

### Category Card Click

```javascript
Liked Songs → Navigate to Liked Songs page
Playlists   → Navigate to Playlists page
Albums      → Show albums grid view
Artists     → Show artists list view
Recent      → Show recently played list
Downloads   → Show downloaded songs
```

### Hover Effects

- **Card**: Background lebih terang + shadow
- **Icon**: Scale 1.05 + warna lebih terang
- **Arrow**: Geser ke kanan 4px
- **Stats**: Translate up 2px

### Navigation Flow

```
Library (Hub)
    ↓
Category Card Click
    ↓
Detail Page / View
    ↓
Play Song (from detail page)
```

## Gaya Visual

### Colors
```css
Background Card: rgba(255, 255, 255, 0.03)
Border: rgba(255, 255, 255, 0.08)
Hover Background: rgba(255, 255, 255, 0.06)
Icon Background: rgba(255, 255, 255, 0.08)
Text Primary: #ffffff
Text Secondary: rgba(255, 255, 255, 0.5)
```

### Typography
```css
Title: 56px Space Grotesk, weight 600
Category Name: 18px Space Grotesk, weight 600
Category Count: 13px DM Sans, weight 400
Stat Number: 36px Space Grotesk, weight 700
```

### Spacing
```css
Card Padding: 24px
Card Gap: 20px
Icon Size: 64x64px
Border Radius: 16px (card), 12px (icon)
```

### Animations
```css
Card: fadeInScale (0.4s, stagger 0.05s)
Stats: fadeInUp (0.5s, stagger 0.05s)
Activity: slideInLeft (0.4s, stagger 0.05s)
```

## Perbedaan dari Spotify

### ❌ TIDAK Seperti Spotify:
- Tidak ada sidebar filter (Playlist, Artist, Album)
- Tidak ada tabel lagu besar
- Tidak ada playlist banner dengan cover
- Tidak ada tombol play langsung di Library
- Tidak ada grid album/playlist di halaman utama

### ✅ Desain Original:
- Card-based navigation hub
- Icon sederhana (bukan cover)
- Stats dashboard
- Recent activity feed
- Fokus ke navigasi, bukan pemutaran

## Files

### HTML
- `library.html` - Struktur halaman

### CSS
- `library.css` - Styling khusus

### JavaScript
- Inline script di `library.html`
- Navigasi menggunakan `loadPage()` dari `script.js`

## Responsive Design

### Desktop (> 768px)
- Grid 3 kolom (auto-fit, min 320px)
- Stats 4 kolom
- Full spacing

### Tablet (768px)
- Grid 1 kolom
- Stats 2 kolom
- Reduced padding

### Mobile (< 480px)
- Grid 1 kolom
- Stats 1 kolom
- Smaller icons (52px)
- Smaller title (32px)

## Navigation Integration

### Sidebar Mapping
```javascript
"Vault" → library.html
```

### Page Mapping (script.js)
```javascript
'Library': 'library.html'
```

## Future Enhancements

### Planned Features:
1. **Subsection Views**
   - Albums grid view
   - Artists list view
   - Recently played timeline

2. **Search in Library**
   - Search across all categories
   - Filter by type

3. **Sort Options**
   - Sort by date added
   - Sort by name
   - Sort by play count

4. **Create New**
   - Create playlist button
   - Import music button

## Best Practices

1. **Library sebagai Hub** - Jangan tambahkan pemutaran langsung
2. **Navigasi Jelas** - Setiap card harus mengarah ke halaman detail
3. **Stats Akurat** - Update jumlah item secara dinamis
4. **Activity Real-time** - Tampilkan aktivitas terbaru user
5. **Konsisten** - Ikuti design system yang ada

## Tips Penggunaan

- Klik kategori untuk melihat detail
- Hover card untuk melihat efek interaktif
- Lihat stats untuk overview koleksi
- Check recent activity untuk riwayat

---

**Catatan:** Library adalah pusat navigasi, bukan halaman pemutaran. Untuk memutar lagu, navigasi ke Liked Songs atau halaman detail lainnya.
