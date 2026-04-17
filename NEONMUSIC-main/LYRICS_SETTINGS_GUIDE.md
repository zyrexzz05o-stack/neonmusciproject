# Lyrics Settings Guide

## 📝 Overview
Lyrics Settings memungkinkan kamu untuk mengkustomisasi tampilan lirik lagu sesuai preferensi.

---

## ✨ Fitur-Fitur

### 1. **Show Lyrics Toggle** 🔘
Aktifkan/nonaktifkan tampilan lirik.

**Cara Pakai:**
- Toggle ON: Lirik ditampilkan
- Toggle OFF: Lirik disembunyikan

---

### 2. **Font Size** 📏
Atur ukuran teks lirik.

**Pilihan:**
- **Small**: Untuk layar kecil atau banyak teks
- **Medium**: Ukuran standar (recommended)
- **Large**: Lebih mudah dibaca
- **Extra Large**: Untuk presentasi atau jarak jauh

**Efek:**
- Small: 14px (active: 18px)
- Medium: 18px (active: 24px)
- Large: 22px (active: 30px)
- XLarge: 26px (active: 36px)

---

### 3. **Position** 📍
Atur posisi lirik di layar.

**Pilihan:**
- **Top**: Lirik di bagian atas
- **Center**: Lirik di tengah (recommended)
- **Bottom**: Lirik di bagian bawah

**Kapan Pakai:**
- Top: Kalau video di bawah
- Center: Untuk fokus maksimal
- Bottom: Kalau ada elemen penting di atas

---

### 4. **Auto-scroll Speed** ⚡
Atur kecepatan scroll otomatis lirik.

**Pilihan:**
- **Slow**: Scroll pelan (1.5x)
- **Normal**: Kecepatan standar (1.0x)
- **Fast**: Scroll cepat (0.7x)

**Catatan:** Fitur ini bekerja saat lirik synchronized (ada timestamp)

---

### 5. **Background Opacity** 🌫️
Atur transparansi background lirik.

**Range:** 0% - 100%
- **0%**: Transparan penuh
- **30%**: Semi-transparent (recommended)
- **50%**: Medium opacity
- **100%**: Solid black

**Tips:** 
- 20-40% untuk video terang
- 40-60% untuk video gelap
- 60-100% untuk readability maksimal

---

### 6. **Karaoke Mode** 🎤
Mode karaoke dengan efek fill animation.

**Cara Kerja:**
- Lirik aktif akan ter-highlight secara bertahap
- Animasi gradient dari kiri ke kanan
- Seperti karaoke sungguhan!

**Kapan Pakai:**
- Saat bernyanyi bersama
- Untuk latihan vokal
- Pengalaman immersive

---

### 7. **Text Shadow** 🌑
Tambahkan bayangan pada teks untuk readability.

**Efek:**
- ON: Shadow hitam 8px blur
- OFF: Tidak ada shadow

**Kapan Pakai:**
- ON: Video terang atau warna-warni
- OFF: Video gelap atau minimalis

---

## 🎨 Preview Real-time

Preview box menampilkan perubahan secara langsung:
- 3 baris contoh lirik
- Baris tengah = lirik aktif
- Update instant saat ubah setting

---

## 💾 Penyimpanan

Semua setting disimpan di localStorage:
```
Key: neonwave_lyrics_settings
```

Format:
```json
{
  "enabled": true,
  "fontSize": "medium",
  "position": "center",
  "scrollSpeed": "normal",
  "opacity": 30,
  "karaokeMode": false,
  "textShadow": true
}
```

---

## 🎯 Rekomendasi Setting

### **Untuk Video Terang:**
- Font Size: Medium
- Position: Center
- Opacity: 40%
- Text Shadow: ON
- Karaoke Mode: OFF

### **Untuk Video Gelap:**
- Font Size: Large
- Position: Center
- Opacity: 20%
- Text Shadow: OFF
- Karaoke Mode: OFF

### **Untuk Karaoke:**
- Font Size: Large
- Position: Center
- Opacity: 50%
- Text Shadow: ON
- Karaoke Mode: ON

### **Untuk Presentasi:**
- Font Size: Extra Large
- Position: Center
- Opacity: 60%
- Text Shadow: ON
- Karaoke Mode: OFF

### **Untuk Mobile:**
- Font Size: Small
- Position: Bottom
- Opacity: 40%
- Text Shadow: ON
- Karaoke Mode: OFF

---

## 🔧 Technical Details

### CSS Classes Applied:
```css
.lyrics-box-content {
  font-size: [14px|18px|22px|26px];
  justify-content: [flex-start|center|flex-end];
}

.lyrics-box {
  background: rgba(0, 0, 0, [opacity/100]);
}

.lyric-line {
  text-shadow: [0 2px 8px rgba(0,0,0,0.8)|none];
}

.karaoke-mode .lyric-line.active {
  animation: karaoke-fill-lyrics 3s linear infinite;
}
```

### JavaScript API:
```javascript
// Get current settings
const settings = window.lyricsSettings.getSettings();

// Apply settings
window.lyricsSettings.apply();

// Update preview
window.lyricsSettings.updatePreview();

// Re-initialize
window.lyricsSettings.init();
```

---

## 🐛 Troubleshooting

### Lirik tidak muncul?
- Cek toggle "Show Lyrics" aktif
- Pastikan lagu punya lirik di database
- Refresh halaman (F5)

### Preview tidak update?
- Cek console untuk error
- Clear cache browser
- Re-initialize: `window.initLyricsSettings()`

### Karaoke mode tidak animasi?
- Pastikan lirik aktif (sedang playing)
- Cek browser support CSS animations
- Coba browser lain (Chrome recommended)

### Font size tidak berubah?
- Pastikan apply ke lyrics box yang benar
- Cek CSS tidak di-override
- Inspect element untuk debug

---

## 📱 Mobile Responsive

Settings otomatis adjust untuk mobile:
- Font size lebih kecil
- Touch-friendly controls
- Optimized layout

---

## 🚀 Future Enhancements

- [ ] Custom font family
- [ ] Color customization
- [ ] Multiple karaoke styles
- [ ] Lyrics translation toggle
- [ ] Romanization for non-Latin scripts
- [ ] Export lyrics as text
- [ ] Share lyrics as image

---

## 💡 Tips & Tricks

1. **Kombinasi dengan Mood Engine** untuk pengalaman maksimal
2. **Gunakan Karaoke Mode** saat latihan vokal
3. **Opacity 30-40%** paling nyaman untuk mata
4. **Text Shadow ON** untuk video warna-warni
5. **Position Center** paling fokus
6. **Font Size Medium** paling balanced

---

Selamat menikmati fitur Lyrics Settings! 🎵✨
