// ============================================
// CONTOH FORMAT LYRICS DENGAN TIMESTAMP
// ============================================
// 
// Untuk membuat synchronized lyrics seperti Spotify,
// Anda perlu menambahkan timestamp untuk setiap baris lirik.
//
// Format:
// { time: [detik], text: "[teks lirik]" }
//
// Cara mendapatkan timestamp:
// 1. Putar video/lagu
// 2. Catat waktu (dalam detik) ketika setiap baris lirik mulai dinyanyikan
// 3. Masukkan ke format array seperti contoh di bawah
//
// ============================================

// CONTOH untuk lagu "Timeless":
const exampleLyrics = {
    'videos/timeless.mp4': {
        title: 'Timeless - The Weeknd ft. Playboi Carti',
        lyrics: [
            { time: 0, text: "Sun is shinin', it's over" },
            { time: 3, text: "It's tomorrow" },
            { time: 5, text: "Bathe yourself in the light, in your love" },
            { time: 9, text: "XO" },
            { time: 11, text: "" }, // Baris kosong untuk jeda
            { time: 13, text: "Ooh, yeah, ooh, yeah, no" },
            { time: 16, text: "Ever since I was a jit knew I was the shit" },
            // ... tambahkan baris berikutnya dengan timestamp masing-masing
        ]
    }
};

// ============================================
// CARA MENGGUNAKAN:
// ============================================
// 
// 1. Buka file script.js
// 2. Cari bagian "const lyricsDatabase = {"
// 3. Ganti format lyrics dari string menjadi array seperti contoh di atas
// 4. Untuk setiap lagu, tambahkan timestamp
//
// TIPS:
// - Gunakan baris kosong (text: "") untuk jeda antar bagian
// - Timestamp dalam detik (contoh: 1:30 = 90 detik)
// - Semakin akurat timestamp, semakin smooth sinkronisasinya
// - Anda bisa klik baris lirik untuk jump ke waktu tersebut
//
// ============================================

// Format LAMA (static, tidak synchronized):
const oldFormat = {
    'videos/song.mp4': {
        title: 'Song Title',
        lyrics: `Baris 1
Baris 2
Baris 3`
    }
};

// Format BARU (synchronized, seperti Spotify):
const newFormat = {
    'videos/song.mp4': {
        title: 'Song Title',
        lyrics: [
            { time: 0, text: "Baris 1" },
            { time: 3, text: "Baris 2" },
            { time: 6, text: "Baris 3" }
        ]
    }
};

// ============================================
// FITUR YANG SUDAH TERSEDIA:
// ============================================
// ✅ Auto-scroll mengikuti lirik aktif
// ✅ Lirik yang sudah lewat: abu-abu
// ✅ Lirik yang sedang aktif: putih + garis putih di kiri + lebih besar
// ✅ Lirik yang belum: abu-abu
// ✅ Klik baris lirik untuk jump ke waktu tersebut
// ✅ Font besar dan bold seperti Spotify
// ✅ Smooth scrolling
// ✅ Mendukung format lama (string) dan baru (array)
