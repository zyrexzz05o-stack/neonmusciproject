# Floating Mini Player - User Guide

## Overview
Floating Mini Player adalah window mini yang dapat di-drag untuk kontrol musik cepat. Player ini muncul di pojok kanan bawah layar dan tetap terlihat saat Anda scroll atau navigate ke halaman lain.

## Features

### 1. Always Visible
- Muncul di pojok kanan bawah layar
- Tetap terlihat saat scroll atau navigate
- Glassmorphism design dengan neon glow

### 2. Draggable
- Klik dan drag pada header "MINI PLAYER" untuk memindahkan
- Posisi bebas di mana saja di layar
- Smooth drag animation

### 3. Music Controls
- **Previous Button (⏮)**: Putar lagu sebelumnya
- **Play/Pause Button (▶️/⏸)**: Toggle play/pause
- **Next Button (⏭)**: Putar lagu berikutnya

### 4. Track Information
- Album cover (64x64px)
- Song title
- Artist name

### 5. Progress Bar
- Mini progress bar di bagian bawah
- Sinkron otomatis dengan main player
- Smooth animation

### 6. Picture-in-Picture (PiP)
- Tombol PiP tersedia jika browser support
- Klik untuk enable video PiP mode
- Video tetap terlihat di atas semua window

## How to Use

### Show/Hide Mini Player

**Otomatis:**
- Mini player muncul otomatis saat lagu diputar

**Manual:**
- Tekan tombol `M` di keyboard untuk toggle show/hide
- Atau gunakan JavaScript: `toggleMiniPlayer()`

**Close:**
- Klik tombol close (×) di pojok kanan atas mini player

### Drag Mini Player
1. Klik dan tahan pada area "MINI PLAYER" (header)
2. Drag ke posisi yang diinginkan
3. Lepas untuk menetapkan posisi

### Control Music
- Klik tombol Previous/Play/Next untuk kontrol musik
- State play/pause sinkron dengan main player
- Progress bar update real-time

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `M` | Toggle show/hide mini player |

## Technical Details

### Browser Compatibility
- Chrome/Edge: Full support (termasuk PiP)
- Firefox: Full support (termasuk PiP)
- Safari: Full support (PiP terbatas)

### Limitations
1. **Not True "Always on Top"**
   - Mini player hanya visible dalam browser window
   - Tidak bisa muncul di atas aplikasi lain (WhatsApp, etc)
   - Untuk true always-on-top, perlu Electron app

2. **Picture-in-Picture Alternative**
   - Gunakan PiP button untuk video always-on-top
   - PiP window bisa muncul di atas aplikasi lain
   - Hanya untuk video, tidak termasuk controls

### Design Specifications
- **Size**: 320px width, auto height
- **Position**: Bottom-right (24px from edges)
- **Background**: rgba(15, 15, 15, 0.92) + blur(24px)
- **Border Radius**: 24px
- **Glow**: Purple/Cyan gradient with pulse animation
- **Font**: Space Grotesk (title), DM Sans (artist)

## JavaScript API

### Global Functions

```javascript
// Show mini player
showMiniPlayer(title, artist, coverUrl);

// Hide mini player
hideMiniPlayer();

// Toggle show/hide
toggleMiniPlayer();
```

### Access Instance

```javascript
// Access mini player instance
window.floatingMiniPlayer

// Methods
window.floatingMiniPlayer.show(title, artist, cover);
window.floatingMiniPlayer.hide();
window.floatingMiniPlayer.toggle();
window.floatingMiniPlayer.updateFromMainPlayer();
```

## Customization

### Change Position
Edit CSS in `floating-mini-player.css`:

```css
.floating-mini-player {
    bottom: 24px;  /* Change this */
    right: 24px;   /* Change this */
}
```

### Change Size
```css
.floating-mini-player {
    width: 320px;  /* Change this */
}
```

### Change Colors
```css
.mini-player-card::after {
    background: linear-gradient(
        135deg,
        rgba(138, 43, 226, 0.4) 0%,  /* Purple */
        rgba(0, 255, 255, 0.3) 100%  /* Cyan */
    );
}
```

## Troubleshooting

### Mini Player Not Showing
1. Check if `floating-mini-player.js` is loaded
2. Check console for errors
3. Try manual toggle with `M` key
4. Check if `showMiniPlayer()` function exists

### Drag Not Working
1. Make sure you're dragging from the header area
2. Check if `dragging` class is added during drag
3. Clear browser cache and reload

### Controls Not Working
1. Check if main player functions exist:
   - `window.playPreviousTrack`
   - `window.playNextTrack`
2. Check if video player element exists
3. Check console for errors

### Progress Bar Not Updating
1. Check if video player has `timeupdate` event listener
2. Check if video is actually playing
3. Verify video duration is valid

## Integration with Other Features

### Works With:
- ✅ Music Popup Notification
- ✅ Main Player Controls
- ✅ Keyboard Shortcuts
- ✅ Page Navigation (stays visible)
- ✅ Black Screen Mode
- ✅ Behavior Modes

### Conflicts:
- ❌ None known

## Future Enhancements

### Possible Improvements:
1. **Electron App**: True always-on-top across all apps
2. **Resize Handle**: Allow user to resize mini player
3. **Themes**: Multiple color themes
4. **Lyrics Display**: Show current lyric line
5. **Visualizer**: Mini audio visualizer
6. **Playlist View**: Show next tracks
7. **Volume Control**: Slider in mini player
8. **Seek Bar**: Clickable progress bar for seeking

## Files

- `floating-mini-player.css` - Styles
- `floating-mini-player.js` - Logic and functionality
- `FLOATING_MINI_PLAYER_GUIDE.md` - This guide

## Credits

Created for NeonWave Music Player
Dark Glassmorphism Design
Drag & Drop Functionality
