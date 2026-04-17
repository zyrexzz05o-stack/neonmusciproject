# Background Shapes Settings - User Guide

## Overview
Background Shapes Settings memungkinkan Anda mengontrol elemen animasi di background aplikasi NeonWave Music Player. Anda bisa mengatur visibility, opacity, kecepatan animasi, dan memilih jenis shapes yang ditampilkan.

## Fitur

### 1. Enable/Disable Shapes
- Toggle untuk show/hide semua background shapes
- Saat disabled, semua shapes akan hilang
- Meningkatkan performa jika dinonaktifkan

### 2. Shapes Opacity
- Slider untuk mengatur transparansi shapes
- Range: 0% - 100%
- Default: 30%
- Opacity rendah = shapes lebih transparan
- Opacity tinggi = shapes lebih terlihat

### 3. Animation Speed
- Slider untuk mengatur kecepatan animasi
- Range: 0.25x - 2x
- Default: 1x (normal speed)
- Speed rendah = animasi lebih lambat
- Speed tinggi = animasi lebih cepat

### 4. Shape Types
Pilih jenis shapes yang ingin ditampilkan:
- **Circles (⚪)**: Lingkaran dengan glow effect
- **Triangles (🔺)**: Segitiga futuristik
- **Squares (⬜)**: Kotak transparan dengan blur
- **Hexagons (⬡)**: Hexagon shapes

Setiap jenis bisa di-enable/disable secara individual.

### 5. Reset to Defaults
- Button untuk mengembalikan semua pengaturan ke default
- Default settings:
  - Enabled: Yes
  - Opacity: 30%
  - Speed: 1x
  - All shape types: Enabled

## Cara Menggunakan

### Akses Settings:
1. Buka Settings page
2. Scroll ke section "Background Shapes"

### Mengatur Opacity:
1. Drag slider "Shapes Opacity"
2. Nilai akan update real-time
3. Perubahan langsung terlihat di background

### Mengatur Speed:
1. Drag slider "Animation Speed"
2. Nilai ditampilkan dalam format "1x", "1.5x", dll
3. Animasi akan langsung berubah kecepatannya

### Memilih Shape Types:
1. Centang/uncheck checkbox untuk setiap jenis shape
2. Perubahan langsung terlihat
3. Minimal 1 jenis shape harus aktif (recommended)

### Reset Settings:
1. Klik button "Reset to Defaults"
2. Semua pengaturan kembali ke nilai default
3. Button akan menampilkan "✓ Reset!" sebagai konfirmasi

## Technical Details

### Shapes yang Tersedia:
- **4 Circles**: Berbagai ukuran (100px - 200px)
- **3 Triangles**: Berbagai rotasi dan ukuran
- **4 Squares**: Dengan blur effect
- **2 Hexagons**: Dengan border effect

### Animation Types:
- **fall-down**: Shapes jatuh dari atas ke bawah
- **rise-up**: Shapes naik dari bawah ke atas
- **rotate**: Shapes berputar 360 derajat

### Performance Impact:
- Shapes disabled: Performa terbaik
- Opacity rendah: Performa baik
- Speed tinggi: Sedikit impact pada performa
- Semua shapes enabled: Normal performance

## Settings Storage

### LocalStorage:
Settings disimpan di localStorage dengan key:
```
neonwave_shapes_settings
```

### Data Structure:
```json
{
  "enabled": true,
  "opacity": 0.3,
  "speed": 1,
  "circles": true,
  "triangles": true,
  "squares": true,
  "hexagons": true
}
```

### Persistence:
- Settings tersimpan otomatis saat diubah
- Settings di-load saat page refresh
- Settings berlaku di semua pages

## Rekomendasi

### Untuk Performa Terbaik:
- Opacity: 20-30%
- Speed: 0.5x - 1x
- Enable hanya 2-3 jenis shapes

### Untuk Visual Terbaik:
- Opacity: 30-40%
- Speed: 1x
- Enable semua jenis shapes

### Untuk Minimal Distraction:
- Opacity: 10-20%
- Speed: 0.5x
- Enable hanya circles atau squares

### Untuk Clean Look:
- Disable semua shapes
- Atau opacity: 5-10%

## Troubleshooting

### Shapes Tidak Muncul:
1. Check toggle "Enable Background Shapes" aktif
2. Check opacity tidak 0%
3. Check minimal 1 jenis shape di-enable
4. Refresh page

### Animasi Terlalu Cepat/Lambat:
1. Adjust slider "Animation Speed"
2. Recommended range: 0.5x - 1.5x
3. Extreme values (0.25x atau 2x) mungkin terlihat tidak natural

### Settings Tidak Tersimpan:
1. Check browser localStorage enabled
2. Check tidak dalam incognito/private mode
3. Clear browser cache dan coba lagi

### Performa Lambat:
1. Reduce opacity ke 20% atau kurang
2. Reduce speed ke 0.5x
3. Disable beberapa jenis shapes
4. Atau disable shapes completely

## Browser Compatibility

### Fully Supported:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Features:
- ✅ CSS backdrop-filter (blur effect)
- ✅ CSS animations
- ✅ LocalStorage
- ✅ Range input sliders
- ✅ Checkbox inputs

## Files

- `shapes-settings.js` - Logic dan functionality
- `settings.css` - Styling (shapes settings section)
- `styles.css` - Shapes animations dan styling
- `settings.html` - HTML structure
- `SHAPES_SETTINGS_GUIDE.md` - This guide

## API

### Global Functions:

```javascript
// Initialize shapes settings
window.initShapesSettings();

// Apply current settings
window.shapesSettings.apply();

// Reset to defaults
window.shapesSettings.reset();

// Get current settings
const settings = window.shapesSettings.getSettings();
```

### Settings Object:

```javascript
{
    enabled: boolean,    // Show/hide shapes
    opacity: number,     // 0-1 (0% - 100%)
    speed: number,       // 0.25-2 (0.25x - 2x)
    circles: boolean,    // Show circles
    triangles: boolean,  // Show triangles
    squares: boolean,    // Show squares
    hexagons: boolean    // Show hexagons
}
```

## Future Enhancements

### Possible Improvements:
1. **Custom Colors**: Choose shape colors
2. **More Shapes**: Stars, diamonds, etc
3. **Density Control**: Number of shapes
4. **Direction Control**: Animation direction
5. **Size Control**: Shape sizes
6. **Blur Control**: Blur intensity
7. **Glow Control**: Glow intensity
8. **Presets**: Quick settings presets
9. **Random Mode**: Random shapes and animations
10. **Music Reactive**: Shapes react to music

## Credits

Created for: NeonWave Music Player
Feature: Background Shapes Customization
Technology: Vanilla JavaScript + CSS3 Animations
