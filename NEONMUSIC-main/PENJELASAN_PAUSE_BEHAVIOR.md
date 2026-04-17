# Perilaku Background Shapes Saat Lagu Di-Pause

## Ringkasan Cepat

Saat lagu di-pause:
- ✅ **Animasi dasar shapes tetap jalan** (naik-turun, bergerak)
- ❌ **Beat reactive motion berhenti** (tidak lagi mengikuti musik)

---

## Penjelasan Detail

### Ada 2 Jenis Gerakan pada Background Shapes:

#### 1️⃣ Animasi CSS Dasar (Selalu Aktif)
```css
/* Di styles.css */
.circle {
    animation: fall-down 20s infinite linear;
}

.triangle {
    animation: rise-up 18s infinite linear;
}
```

**Karakteristik:**
- Gerakan naik-turun konstan
- Tidak terpengaruh musik
- Tidak pernah berhenti (selalu loop)
- Kecepatan tetap

**Status saat pause:** ✅ TETAP JALAN

---

#### 2️⃣ Beat Reactive Motion (Aktif Saat Play)
```javascript
// Di beat-reactive.js
const scale = 1.0 + (energy * 0.03)  // 1.00 → 1.03
const opacity = 0.85 + (energy * 0.15)  // 0.85 → 1.0
```

**Karakteristik:**
- Scale shapes mengikuti musik
- Opacity pulse mengikuti musik
- Hanya aktif saat musik play
- Berhenti saat musik pause

**Status saat pause:** ❌ BERHENTI

---

## Contoh Visual

### Saat Lagu PLAY:
```
Background Shapes:
├─ Animasi CSS: Bergerak naik-turun ✅
└─ Beat Reactive: Scale 1.0→1.03, pulse mengikuti beat ✅

Hasil: Shapes bergerak naik-turun + membesar-mengecil mengikuti musik
```

### Saat Lagu PAUSE:
```
Background Shapes:
├─ Animasi CSS: Bergerak naik-turun ✅
└─ Beat Reactive: STOP, kembali ke scale 1.0 ❌

Hasil: Shapes hanya bergerak naik-turun (gerakan dasar)
```

---

## Alur Teknis Saat Pause

```javascript
// 1. User klik pause
videoPlayer.pause()

// 2. Event listener terpicu
videoPlayer.addEventListener('pause', () => {
    stopBeatReactive()  // ← Dipanggil di sini
})

// 3. stopBeatReactive() dijalankan
function stopBeatReactive() {
    // Stop animation loop
    cancelAnimationFrame(animationFrameId)
    
    // Reset scale ke normal
    shapes.style.transform = 'scale(1)'
    
    // Reset opacity ke default CSS
    shapes.style.opacity = ''
    
    // Hapus glow dari song title
    songTitle.style.textShadow = ''
}

// 4. Shapes kembali ke state normal
// - Scale: 1.0 (ukuran normal)
// - Opacity: default dari CSS
// - Animasi CSS: tetap jalan
```

---

## Transisi Smooth

Saat pause, reset tidak langsung "snap", tapi smooth:

```javascript
// Transition 0.15s linear sudah di-set saat start
shape.style.transition = 'transform 0.15s linear, opacity 0.15s linear'

// Saat pause, shapes smooth kembali ke scale 1.0
// Durasi: 0.15 detik (150ms)
```

**Hasil:** Shapes tidak "loncat" kembali, tapi smooth transition.

---

## Kenapa Animasi CSS Tidak Di-Pause?

### Alasan Desain:
1. **Konsistensi Visual** - Background tetap hidup meskipun musik pause
2. **Tidak Mengganggu** - Gerakan dasar sangat lambat (20 detik per cycle)
3. **Estetika** - Lebih bagus daripada background yang "mati" total
4. **Pembeda** - Saat play = gerakan kompleks, saat pause = gerakan sederhana

### Alternatif (Jika Ingin Pause Total):
Jika kamu ingin shapes benar-benar berhenti saat pause, bisa tambahkan:

```javascript
// Di stopBeatReactive()
backgroundShapes.forEach(shape => {
    shape.style.animationPlayState = 'paused'  // Pause CSS animation
})

// Di startBeatReactive()
backgroundShapes.forEach(shape => {
    shape.style.animationPlayState = 'running'  // Resume CSS animation
})
```

Tapi ini **TIDAK DIREKOMENDASIKAN** karena background jadi terlalu "mati".

---

## Kesimpulan

| State | Animasi CSS | Beat Reactive | Hasil Visual |
|-------|-------------|---------------|--------------|
| **Play** | ✅ Jalan | ✅ Aktif | Shapes bergerak + pulse mengikuti musik |
| **Pause** | ✅ Jalan | ❌ Stop | Shapes hanya bergerak dasar (lambat) |
| **Tab Hidden** | ✅ Jalan | ⏸️ Pause | Shapes bergerak, beat reactive pause (hemat CPU) |

**Filosofi:** Background tetap "hidup" tapi tidak "reaktif" saat musik pause.
