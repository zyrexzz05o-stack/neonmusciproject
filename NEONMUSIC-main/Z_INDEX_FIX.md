# Fix: Logo Menghalangi Foto Profil

## Masalah
Logo di sidebar floating (kiri atas) menghalangi foto profil di header (kanan atas).

## Penyebab
Z-index tidak diatur dengan benar:
- Sidebar floating: `z-index: 1000`
- Header: tidak ada z-index (default: auto)
- Profile button: tidak ada z-index

Karena sidebar memiliki z-index lebih tinggi, logo bisa overlap dengan foto profil.

## Solusi

### 1. Header Z-Index
```css
.header {
    position: relative;
    z-index: 1001; /* Above sidebar */
}
```

### 2. Profile Button Z-Index
```css
.profile-btn {
    position: relative;
    z-index: 1002; /* Above header and sidebar */
}
```

## Hierarki Z-Index

```
Layer 1: Sidebar (z-index: 1000)
    ↓
Layer 2: Header (z-index: 1001)
    ↓
Layer 3: Profile Button (z-index: 1002) ← Paling atas
```

## Hasil

✅ Foto profil sekarang selalu di atas logo
✅ Tidak ada overlap
✅ Semua elemen tetap clickable
✅ Tidak merusak layout lain

## Testing

1. Buka browser
2. Cek foto profil di kanan atas
3. Logo di sidebar kiri tidak boleh menutupi foto profil
4. Foto profil harus bisa diklik
