# Time-Based Adaptive UI - NeonWave

## Konsep

UI NeonWave berubah secara halus berdasarkan waktu nyata (real-world time). Perubahan sangat subtle, tetap minimal dan monokrom, membuat pengalaman terasa kontekstual dan hidup.

---

## Pembagian Waktu

### 🌅 PAGI (05:00 - 10:59)
**Karakteristik:** Lebih terang, bersih, kontras tinggi

**Perubahan Visual:**
- Background: `#181818` (lebih terang dari default)
- Grain: Lebih ringan (opacity 0.015)
- Background shapes: Lebih terlihat (opacity 0.6)
- Text: Lebih tajam dan bersih
  - Heading: `rgba(255,255,255,0.98)`
  - Body: `rgba(255,255,255,0.75)`
- Player bar: Sedikit lebih terang
- Kontras: +2% (`filter: contrast(1.02)`)

**Filosofi:** Pagi = energi baru, lebih cerah, lebih fokus

---

### ☀️ SIANG (11:00 - 17:59)
**Karakteristik:** Mode default, balanced

**Perubahan Visual:**
- Background: `#111111` (default)
- Grain: Normal (opacity 0.02)
- Background shapes: Default (opacity 0.5)
- Text: Balanced
- Player bar: Default
- Kontras: Neutral (100%)

**Filosofi:** Siang = mode standar, tidak ada penyesuaian khusus

---

### 🌙 MALAM (18:00 - 04:59)
**Karakteristik:** Lebih dalam, redup, lambat

**Perubahan Visual:**
- Background: `#0A0A0A` (lebih gelap)
- Grain: Lebih kuat (opacity 0.03)
- Background shapes: Lebih redup (opacity 0.4)
- Text: Sedikit dimmer
  - Heading: `rgba(255,255,255,0.92)`
  - Body: `rgba(255,255,255,0.6)`
- Player bar: Lebih dalam
- Animasi: Lebih lambat
  - Circle: 20s → 25s
  - Triangle: 18s → 23s
  - Square: 22s → 28s
  - Hexagon: 20s → 26s
- Kontras: -2% (`filter: contrast(0.98)`)
- Global opacity: 0.95 (sedikit redup)

**Filosofi:** Malam = tenang, sunyi, tidak mengganggu mata

---

## Cara Kerja Teknis

### 1. Deteksi Waktu
```javascript
function getTimePeriod() {
    const now = new Date()
    const hour = now.getHours()
    
    if (hour >= 5 && hour < 11) return 'morning'
    if (hour >= 11 && hour < 18) return 'day'
    return 'night'
}
```

### 2. Apply Theme
```javascript
function applyTimeTheme(period) {
    document.body.classList.remove('time-morning', 'time-day', 'time-night')
    document.body.classList.add(`time-${period}`)
}
```

### 3. CSS Classes
```css
body.time-morning { /* Pagi styles */ }
body.time-day { /* Siang styles */ }
body.time-night { /* Malam styles */ }
```

### 4. Auto Check
- Cek pertama kali saat page load
- Cek ulang setiap 5 menit
- Tidak pakai interval cepat (hemat performa)

---

## Transisi Smooth

Semua perubahan menggunakan transisi 0.5 detik:

```css
body {
    transition: background 0.5s ease-in-out, 
                filter 0.5s ease-in-out;
}

body * {
    transition: opacity 0.5s ease-in-out;
}
```

**Hasil:** Pergantian mode tidak terasa "loncat", tapi smooth dan natural.

---

## Contoh Skenario

### Skenario 1: Pagi ke Siang (10:59 → 11:00)
```
10:59 AM - Mode PAGI
- Background: #181818 (terang)
- Shapes: opacity 0.6
- Kontras: 102%

[5 menit kemudian...]

11:00 AM - Mode SIANG
- Background: #111111 (default)
- Shapes: opacity 0.5
- Kontras: 100%

Transisi: 0.5 detik smooth
```

### Skenario 2: Siang ke Malam (17:59 → 18:00)
```
17:59 PM - Mode SIANG
- Background: #111111
- Shapes: opacity 0.5
- Animasi: normal speed

[5 menit kemudian...]

18:00 PM - Mode MALAM
- Background: #0A0A0A (gelap)
- Shapes: opacity 0.4
- Animasi: slower (25% lebih lambat)

Transisi: 0.5 detik smooth
```

### Skenario 3: Malam ke Pagi (04:59 → 05:00)
```
04:59 AM - Mode MALAM
- Background: #0A0A0A (gelap)
- Grain: kuat (0.03)
- Kontras: 98%

[5 menit kemudian...]

05:00 AM - Mode PAGI
- Background: #181818 (terang)
- Grain: ringan (0.015)
- Kontras: 102%

Transisi: 0.5 detik smooth
```

---

## Optimasi Performa

### 1. Check Interval: 5 Menit
```javascript
setInterval(checkAndUpdateTimePeriod, 300000) // 5 minutes
```
- Tidak perlu cek setiap detik
- Hemat CPU dan battery

### 2. Conditional Update
```javascript
if (newPeriod !== currentPeriod) {
    applyTimeTheme(newPeriod)
}
```
- Hanya update jika period berubah
- Tidak trigger reflow jika tidak perlu

### 3. CSS Transitions
- Pakai GPU acceleration
- Smooth tanpa JavaScript animation loop

---

## Debugging

### Console Commands

**Cek period saat ini:**
```javascript
getCurrentPeriodInfo()
// Output:
// {
//   currentTime: "14:30:00",
//   period: "day",
//   hour: 14,
//   nextCheck: "5 minutes"
// }
```

**Force change period (testing):**
```javascript
// Simulasi pagi
document.body.classList.remove('time-day', 'time-night')
document.body.classList.add('time-morning')

// Simulasi malam
document.body.classList.remove('time-morning', 'time-day')
document.body.classList.add('time-night')
```

**Stop time adaptive:**
```javascript
stopTimeAdaptive()
```

**Restart time adaptive:**
```javascript
initTimeAdaptive()
```

---

## Perbedaan dengan Dark/Light Mode

| Dark/Light Mode | Time-Based Adaptive |
|-----------------|---------------------|
| User toggle manual | Otomatis berdasarkan waktu |
| 2 mode (dark/light) | 3 period (morning/day/night) |
| Perubahan drastis | Perubahan subtle |
| Warna berubah total | Tetap monokrom, hanya nuansa |
| Untuk preferensi user | Untuk konteks waktu |

**Keduanya bisa jalan bersamaan!**
- Dark/Light Mode = preferensi warna
- Time Adaptive = nuansa berdasarkan waktu

---

## Batasan & Aturan

### ✅ Yang Boleh Berubah:
- Background darkness
- Grain intensity
- Opacity levels
- Animation speed
- Contrast filter

### ❌ Yang TIDAK Boleh Berubah:
- Layout structure
- Element positions
- Font sizes
- Warna selain grayscale
- Functionality

---

## Kesimpulan

Time-Based Adaptive UI membuat NeonWave terasa:
- ✅ Hidup dan kontekstual
- ✅ Menyesuaikan dengan waktu pengguna
- ✅ Tidak mengganggu (subtle)
- ✅ Tetap minimal dan elegan
- ✅ Performa optimal (check setiap 5 menit)

**Filosofi:** UI yang baik tidak hanya responsif terhadap user input, tapi juga terhadap konteks waktu.

---

## File Terkait

- `time-adaptive.js` - Logic deteksi waktu dan apply theme
- `styles.css` - CSS untuk setiap time period
- `index.html` - Load script

## Console Logs

Saat load:
```
🕐 [Time Adaptive] Module Loading...
🕐 Initializing Time-Based Adaptive UI...
🕐 Time period: MORNING
📊 Visual adjustments: { background: '#181818 (lighter)', ... }
✅ Time-Based Adaptive UI initialized
⏰ Checking time period every 5 minutes
✅ [Time Adaptive] Module Loaded
```

Saat period berubah:
```
🔄 Time period changed: morning → day
🕐 Time period: DAY
📊 Visual adjustments: { background: '#111111 (default)', ... }
```
