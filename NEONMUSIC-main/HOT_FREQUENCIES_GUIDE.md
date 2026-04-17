# Hot Frequencies Page Guide

## Overview
Halaman "Hot Frequencies" adalah Music Trend Dashboard yang menampilkan tren musik aktif berdasarkan frekuensi pemutaran, genre, dan energi lagu.

## Konsep Desain
Dashboard visual dengan pendekatan insight dan data, bukan daftar lagu biasa. Fokus pada informasi tren musik yang sedang beresonansi.

## Struktur Halaman

### 1. Header
- **Judul**: "Hot Frequencies"
- **Subtitle**: "Musik yang sedang beresonansi hari ini"
- **Style**: Minimal, centered, clean

### 2. Trend Pulse Section
**Tujuan**: Menampilkan intensitas aktivitas musik berdasarkan energi

**Komponen**:
- 4 bar horizontal dengan level berbeda:
  - Low Energy (30%)
  - Mid Energy (65%)
  - High Energy (85%)
  - Peak Energy (95%)
- Setiap bar memiliki:
  - Label energi
  - Progress bar dengan gradasi putih
  - Nilai persentase
  - Animasi glow pulse

**Visual**: Bar horizontal dengan fill gradasi dan animasi pulse

### 3. Genre On Fire Section
**Tujuan**: Menampilkan genre yang sedang aktif dengan status

**Komponen**:
- Grid cards (6 genre)
- Setiap card berisi:
  - Icon emoji genre
  - Nama genre
  - Status badge (🔥 Panas / ⬆️ Naik / ➡️ Stabil)
  - Meter bar aktivitas
- Genre yang tersedia:
  - Pop (🎤) - Panas 92%
  - Rock (🎸) - Naik 78%
  - Hip-Hop (🎧) - Panas 88%
  - Electronic (🎹) - Stabil 65%
  - Indie (🎵) - Naik 72%
  - Jazz (🎺) - Stabil 58%

**Interaksi**: Click genre untuk filter lagu (future feature)

### 4. Active Tracks Section
**Tujuan**: Menampilkan lagu yang sedang sering diputar

**Komponen**:
- List cards (6 lagu)
- Setiap card berisi:
  - Cover album (60x60px)
  - Play button overlay (muncul saat hover)
  - Judul lagu
  - Nama artis
  - Activity indicator (dot hijau + play count)
- Lagu yang ditampilkan:
  - Timeless - The Weeknd (2.4K plays)
  - Say You Won't Let Go - James Arthur (1.8K plays)
  - Fix You - Coldplay (1.6K plays)
  - Night Changes - One Direction (1.5K plays)
  - The Night We Met - Lord Huron (1.3K plays)
  - Evaluasi - Hindia (1.2K plays)

**Interaksi**: Click lagu untuk play

### 5. Artists In Motion Section
**Tujuan**: Menampilkan artis yang sedang naik

**Komponen**:
- Grid cards (6 artis)
- Setiap card berisi:
  - Avatar circular (80x80px)
  - Nama artis
  - Activity badge (⬆️ +percentage)
- Artis yang ditampilkan:
  - The Weeknd (+45%)
  - James Arthur (+38%)
  - Coldplay (+32%)
  - One Direction (+28%)
  - Lord Huron (+25%)
  - Hindia (+22%)

**Interaksi**: Click artis untuk detail (future feature)

## Gaya Visual

### Colors
- Background: Transparan dengan glassmorphism
- Border: rgba(255, 255, 255, 0.08)
- Text: White dengan opacity variations
- Accent: Gradasi putih untuk bars dan meters

### Typography
- Headings: Space Grotesk (geometric, modern)
- Body: DM Sans (clean, readable)

### Effects
- Glassmorphism: rgba(255, 255, 255, 0.03) background
- Hover: Slight lift (translateY(-2px/-4px))
- Animations: Pulse glow, activity dot pulse
- Transitions: 0.3s ease

### Layout
- Responsive grid
- Mobile-friendly
- Smooth scrolling

## File Structure

```
hot-frequencies.html    - HTML structure
hot-frequencies.css     - Styling
script.js              - Page mapping
floating-sidebar.js    - Navigation handler
index.html             - CSS link
```

## Navigation
- Tombol: "Hot Frequencies" (ikon petir ⚡)
- Posisi: Sidebar kedua dari atas
- Action: Load halaman Hot Frequencies

## Perbedaan dari Halaman Lain

### vs Home (Pulse)
- Home: Now Playing, Recently Played, Albums
- Hot Frequencies: Trend data, Genre analysis, Activity metrics

### vs Library (Vault)
- Library: Personal collection, History, Queue
- Hot Frequencies: Global trends, Popular tracks, Rising artists

### vs Liked Songs
- Liked Songs: Personal favorites list
- Hot Frequencies: Trending music dashboard

## Future Enhancements
1. Real-time data updates
2. Genre filter functionality
3. Time range selector (Today, Week, Month)
4. Regional trends toggle
5. Artist detail pages
6. Genre detail pages
7. Export trend reports
8. Playlist creation from trends

## Responsive Design
- Desktop: Full grid layout
- Tablet: Adjusted grid columns
- Mobile: Single column, stacked layout

## Accessibility
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly labels
- High contrast text

## Performance
- Lightweight CSS
- Minimal JavaScript
- Optimized images
- Smooth animations with GPU acceleration
