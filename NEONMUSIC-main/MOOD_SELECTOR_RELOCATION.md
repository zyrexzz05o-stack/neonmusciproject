# Mood Selector Relocation - Ke Header

## Perubahan

Memindahkan 3 tombol mood selector (🌊 Chill, 🎯 Focus, 🌙 Night) dari posisi fixed di kanan atas ke dalam header, sebelah kiri foto profil.

---

## Before (Sebelum)

```
┌─────────────────────────────────────┐
│                    [🌊][🎯][🌙]  [👤] │ ← Fixed position, terpisah
│                                     │
│  [🔍 Search]                        │
│                                     │
└─────────────────────────────────────┘
```

---

## After (Sesudah)

```
┌─────────────────────────────────────┐
│  [🔍 Search]    [🌊][🎯][🌙]  [👤]   │ ← Dalam header, sebelah profil
│                                     │
└─────────────────────────────────────┘
```

---

## Perubahan HTML

### Struktur Baru:
```html
<header class="header">
    <div class="search-bar">...</div>
    
    <div class="header-right">
        <!-- Mood Selector -->
        <div class="mood-selector-bar" id="moodSelector">
            <button class="mood-btn active" data-mood="chill">🌊</button>
            <button class="mood-btn" data-mood="focus">🎯</button>
            <button class="mood-btn" data-mood="night">🌙</button>
        </div>
        
        <!-- Profile Button -->
        <button class="profile-btn">
            <img src="..." class="profile-img">
        </button>
    </div>
</header>
```

---

## Perubahan CSS

### 1. Header Right Container
```css
.header-right {
    display: flex;
    align-items: center;
    gap: 12px; /* Space between mood selector and profile */
}
```

### 2. Mood Selector Bar
**Before:**
```css
.mood-selector-bar {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 8px;
}
```

**After:**
```css
.mood-selector-bar {
    display: flex;
    gap: 8px;
    padding: 6px; /* Slightly smaller */
    /* No position: fixed */
}
```

### 3. Mood Buttons
**Before:**
```css
.mood-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
}
```

**After:**
```css
.mood-btn {
    width: 36px;
    height: 36px;
    font-size: 18px; /* Slightly smaller to fit header */
}
```

---

## Keuntungan

### ✅ Lebih Compact
- Semua kontrol di satu tempat (header)
- Tidak ada elemen floating terpisah

### ✅ Lebih Intuitif
- Mood selector dekat dengan profile
- Mudah diakses tanpa mencari

### ✅ Lebih Rapi
- Layout lebih terorganisir
- Tidak ada overlap dengan elemen lain

### ✅ Responsive
- Lebih mudah di-adjust untuk mobile
- Semua dalam satu container

---

## Layout Hierarchy

```
Header
├── Search Bar (kiri)
└── Header Right (kanan)
    ├── Mood Selector (3 tombol)
    └── Profile Button
```

---

## Visual Spacing

```
[🔍 Search Music]  ←→  [🌊][🎯][🌙]  ←→  [👤]
     ↑                      ↑              ↑
  Search bar          Mood selector    Profile
                      (gap: 8px)      (gap: 12px)
```

---

## Functionality

Semua fungsi tetap sama:
- ✅ Klik mood button untuk ganti mode
- ✅ Active state tetap bekerja
- ✅ Hover effect tetap ada
- ✅ Monochrome filter tetap aktif
- ✅ Display: none saat tidak ada lagu playing

---

## Testing

1. Buka browser
2. Klik lagu untuk play
3. Mood selector akan muncul di header (sebelah kiri foto profil)
4. Klik tombol mood untuk ganti mode
5. Tombol active akan highlight

---

## File yang Diubah

- `index.html` - Pindahkan mood selector ke dalam header
- `styles.css` - Update positioning dan sizing
