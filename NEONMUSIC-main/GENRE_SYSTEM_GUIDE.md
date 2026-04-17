# Genre System Guide - Hot Frequencies

## Overview
Sistem genre dengan dua cara akses: **Genre on Fire** (trending otomatis) dan **Search Genre** (pencarian manual), yang mengarah ke satu halaman hasil genre yang sama.

## Struktur Sistem

### 1. Genre on Fire (Trending Otomatis)
**Lokasi**: Hot Frequencies page, section kedua

**Fitur**:
- Menampilkan 6 genre trending otomatis
- Setiap genre memiliki:
  - Icon emoji
  - Nama genre
  - Status badge (🔥 On Fire / ↑ Rising / → Stable / ↓ Cooling)
  - Meter bar popularitas
- Urutan berdasarkan tingkat popularitas
- Click genre → buka halaman genre dengan sorting "Trending"

**Genre yang ditampilkan**:
1. Pop (🎤) - 🔥 On Fire - 92%
2. Hip-Hop (🎧) - 🔥 On Fire - 88%
3. Rock (🎸) - ↑ Rising - 78%
4. Indie (🎵) - ↑ Rising - 72%
5. Electronic (🎹) - → Stable - 65%
6. Jazz (🎺) - ↓ Cooling - 58%

### 2. Search Genre (Pencarian Manual)
**Lokasi**: Hot Frequencies page, section ketiga

**Fitur**:
- Search bar untuk input manual
- Enter key support
- Search button
- Popular genre chips untuk quick search
- Click genre chip → buka halaman genre dengan sorting "Default"

**Popular Genres**:
- Rock, Pop, Hip-Hop, Electronic, Jazz, Indie, R&B, Country

**Cara Kerja**:
1. User ketik genre di search bar
2. Tekan Enter atau click Search button
3. System cari genre yang cocok
4. Jika ditemukan → buka halaman genre
5. Jika tidak ditemukan → tampilkan alert dengan saran

### 3. Halaman Hasil Genre (Single Page)
**File**: `genre-page.html`

**Struktur**:

#### A. Header
- Back button (← Back to Hot Frequencies)
- Genre icon large (64px emoji)
- Genre title (nama genre)
- Status badge (🔥 On Fire / ↑ Rising / → Stable / ↓ Cooling)
- Track count (jumlah lagu)

#### B. Time Filter
- Filter buttons: Today / This Week / This Month
- Sort indicator: "Sorted by: Trending" atau "Sorted by: Relevance"
- Perbedaan sorting:
  - Dari Genre on Fire → "Trending"
  - Dari Search Genre → "Relevance"

#### C. Top Active Tracks
- List lagu paling sering diputar (5 lagu)
- Setiap item berisi:
  - Ranking (#1, #2, #3...)
  - Cover album (50x50px)
  - Play button overlay (hover)
  - Judul lagu
  - Nama artis
  - Play count
  - Trend indicator (↑ +12% / → 0%)

#### D. Rising Artists
- Grid artis yang sedang naik (5 artis)
- Setiap card berisi:
  - Avatar circular (70x70px)
  - Nama artis
  - Trend badge (↑ +percentage)

#### E. Related Sub-Genres
- Chips untuk eksplorasi genre terkait
- Click chip → buka halaman genre baru
- Contoh: Alternative Rock, Indie Rock, Punk Rock, Classic Rock, Hard Rock

## Data Flow

### Flow 1: Genre on Fire → Genre Page
```
User clicks genre card
  ↓
openGenrePage(genreId, 'trending')
  ↓
Store in sessionStorage:
  - currentGenre: genreId
  - genreSortMode: 'trending'
  ↓
loadPage('Genre')
  ↓
initGenrePage()
  ↓
Display genre page with trending sort
```

### Flow 2: Search Genre → Genre Page
```
User types genre + Enter/Click Search
  ↓
searchGenre()
  ↓
Find matching genre
  ↓
openGenrePage(genreId, 'default')
  ↓
Store in sessionStorage:
  - currentGenre: genreId
  - genreSortMode: 'default'
  ↓
loadPage('Genre')
  ↓
initGenrePage()
  ↓
Display genre page with default sort
```

### Flow 3: Quick Search Chip → Genre Page
```
User clicks suggestion chip
  ↓
quickSearchGenre(genreId)
  ↓
openGenrePage(genreId, 'default')
  ↓
Same as Flow 2
```

## Genre Data Structure

```javascript
const genreData = {
    'genreId': {
        name: 'Genre Name',
        icon: '🎵',
        status: '🔥 On Fire',
        statusClass: 'fire',
        trackCount: '2,450'
    }
}
```

**Available Genres**:
- pop, rock, hiphop, electronic, indie, jazz, rnb, country

**Status Classes**:
- `fire` - 🔥 On Fire (sangat naik)
- `rising` - ↑ Rising (naik)
- `stable` - → Stable (stabil)
- `cooling` - ↓ Cooling (turun)

## File Structure

```
hot-frequencies.html    - Genre on Fire + Search Genre sections
genre-page.html         - Single genre result page
hot-frequencies.css     - Styling untuk semua genre UI
genre-handler.js        - Logic untuk genre navigation
script.js              - Page mapping + initialization
index.html             - Script loading
```

## Functions

### Main Functions (genre-handler.js)

**openGenrePage(genreId, sortMode)**
- Open genre page dengan genre dan sort mode tertentu
- Parameters:
  - `genreId`: ID genre (string)
  - `sortMode`: 'trending' atau 'default'
- Menyimpan data ke sessionStorage
- Memanggil loadPage('Genre')

**searchGenre()**
- Search genre dari input field
- Validasi input
- Cari genre yang cocok
- Panggil openGenrePage dengan sortMode 'default'
- Tampilkan alert jika tidak ditemukan

**quickSearchGenre(genreId)**
- Quick search dari suggestion chip
- Langsung panggil openGenrePage dengan sortMode 'default'

**backToHotFrequencies()**
- Kembali ke halaman Hot Frequencies
- Panggil loadPage('Hot Frequencies')

**initGenrePage()**
- Initialize genre page setelah load
- Ambil data dari sessionStorage
- Update header (icon, title, status, count)
- Update sort indicator
- Setup filter button listeners

## Styling

### Colors
- Fire status: rgba(255, 100, 100, 0.15) / rgba(255, 150, 150, 1)
- Rising status: rgba(100, 200, 255, 0.15) / rgba(150, 220, 255, 1)
- Stable status: rgba(200, 200, 200, 0.15) / rgba(200, 200, 200, 1)
- Cooling status: rgba(100, 150, 255, 0.15) / rgba(150, 180, 255, 1)

### Effects
- Glassmorphism background
- Hover lift effect
- Smooth transitions (0.3s ease)
- Border glow on hover

## User Experience

### Navigation Flow
1. User di Hot Frequencies page
2. Lihat Genre on Fire (trending) atau Search Genre (manual)
3. Click genre → buka genre page
4. Explore tracks, artists, sub-genres
5. Click back button → kembali ke Hot Frequencies

### Key Features
- Single page untuk semua genre (tidak duplikasi)
- Sorting berbeda berdasarkan sumber (trending vs default)
- Time filter untuk granularity
- Related sub-genres untuk eksplorasi
- Consistent UI dengan Hot Frequencies

## Future Enhancements
1. Real-time genre trending data
2. User preference tracking
3. Genre playlist creation
4. Genre history
5. Genre recommendations
6. Advanced filters (mood, tempo, era)
7. Genre mixing/crossover suggestions
8. Social features (genre followers, discussions)

## Responsive Design
- Desktop: Full grid layout
- Tablet: Adjusted columns
- Mobile: Single column, stacked

## Accessibility
- Keyboard navigation (Enter key for search)
- Semantic HTML
- Screen reader friendly
- High contrast text

## Performance
- Lightweight data structure
- SessionStorage for state management
- Minimal DOM manipulation
- Optimized CSS animations
