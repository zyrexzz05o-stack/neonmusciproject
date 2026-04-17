# 🎵 Music Popup Notification Component

Premium dark futuristic glassmorphism popup notification component untuk music web app dengan tema NeonWave.

## 📦 Files

- `music-popup-notification.css` - Styling lengkap
- `music-popup-notification.js` - JavaScript logic
- `music-popup-notification.html` - Demo & usage example

## ✨ Features

### Design
- ✅ Dark glassmorphism background dengan backdrop blur 20px
- ✅ Multi-layer soft neon glow (purple & cyan)
- ✅ Border radius 20px dengan border transparan
- ✅ Inner glass highlight layer
- ✅ Subtle pulse animation (5 detik loop)
- ✅ Premium hover effects dengan lift & glow

### Functionality
- ✅ Smooth entrance animation (300ms delay)
- ✅ Auto-hide setelah 4 detik (customizable)
- ✅ Smart replace - tidak stack spam
- ✅ Mini progress bar 2px dengan animasi smooth
- ✅ Close button dengan hover glow
- ✅ **Play/Pause button** - Control playback dari popup
- ✅ **Previous button** - Skip ke lagu sebelumnya
- ✅ **Next button** - Skip ke lagu berikutnya
- ✅ Browser notification support (untuk tab inactive)
- ✅ Responsive design

### Technical
- ✅ Reusable function: `showMusicPopup()`
- ✅ Class-based architecture
- ✅ No external dependencies
- ✅ Production ready
- ✅ Clean modular structure
- ✅ Auto-sync play/pause state dengan main player

## 🚀 Installation

### 1. Add CSS
```html
<link rel="stylesheet" href="music-popup-notification.css">
```

### 2. Add JavaScript
```html
<script src="music-popup-notification.js"></script>
```

### 3. Add Fonts (if not already included)
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 📖 Usage

### Basic Usage
```javascript
// Simple function call
showMusicPopup(
    'Timeless',                    // Song title
    'The Weeknd',                  // Artist name
    'images/TIMELESS.jpeg',        // Cover image URL
    4000                           // Duration (optional, default 4000ms)
);
```

### Using Class Methods
```javascript
// Show popup
window.musicPopup.show('Song Title', 'Artist', 'cover.jpg', 5000);

// Hide popup manually
window.musicPopup.hide();

// Smart notification (popup + browser notification if tab inactive)
window.musicPopup.smartNotify('Song', 'Artist', 'cover.jpg');

// Request browser notification permission
await window.musicPopup.requestPermission();

// Show browser notification only
window.musicPopup.showBrowserNotification('Song', 'Artist', 'cover.jpg');
```

### Integration Example
```javascript
// In your music player code
function playTrack(artist, song, cover, videoPath) {
    // ... your existing play logic ...
    
    // Show popup notification
    showMusicPopup(song, artist, cover);
}

// Or with custom duration
function playTrack(artist, song, cover, videoPath) {
    // ... your existing play logic ...
    
    // Show popup for 6 seconds
    showMusicPopup(song, artist, cover, 6000);
}
```

## 🎨 Customization

### CSS Variables
```css
:root {
    --popup-glow-primary: rgba(138, 43, 226, 0.6);      /* Purple glow */
    --popup-glow-secondary: rgba(0, 255, 255, 0.4);     /* Cyan glow */
    --popup-glass-bg: rgba(20, 20, 20, 0.85);           /* Background */
    --popup-border: rgba(255, 255, 255, 0.12);          /* Border color */
}
```

### Change Glow Colors
```javascript
// In your code, after showing popup
const card = document.querySelector('.music-popup-card');
card.style.setProperty('--popup-glow-primary', 'rgba(255, 0, 128, 0.6)');
card.style.setProperty('--popup-glow-secondary', 'rgba(0, 255, 128, 0.4)');
```

### Change Position
```css
.music-popup-notification {
    top: 24px;      /* Change vertical position */
    right: 24px;    /* Change horizontal position */
    /* Or use left: 24px; for left side */
}
```

### Change Size
```css
.music-popup-notification {
    width: 380px;   /* Change width */
}

.music-popup-cover {
    width: 72px;    /* Change cover size */
    height: 72px;
}
```

## 🔧 Advanced Features

### Control Buttons
Popup sekarang dilengkapi dengan tombol kontrol:

```javascript
// Tombol otomatis terhubung dengan main player
// Play/Pause - Toggle playback
// Previous - Panggil playPreviousTrack()
// Next - Panggil playNextTrack()
```

**Untuk integrasi dengan aplikasi utama:**
```javascript
// Pastikan fungsi ini ada di aplikasi utama
function playPreviousTrack() {
    // Logic untuk play lagu sebelumnya
}

function playNextTrack() {
    // Logic untuk play lagu berikutnya
}

// Popup akan otomatis memanggil fungsi ini saat tombol diklik
```

### Smart Notification
Automatically shows in-app popup when tab is active, and browser notification when tab is inactive:

```javascript
window.musicPopup.smartNotify('Song Title', 'Artist', 'cover.jpg');
```

### Quick Song Changes
Component automatically handles rapid song changes without stacking popups:

```javascript
// These will replace each other smoothly, not stack
showMusicPopup('Song 1', 'Artist 1', 'cover1.jpg');
showMusicPopup('Song 2', 'Artist 2', 'cover2.jpg');  // Replaces Song 1
showMusicPopup('Song 3', 'Artist 3', 'cover3.jpg');  // Replaces Song 2
```

### Browser Notification Permission
```javascript
// Request permission
const granted = await window.musicPopup.requestPermission();

if (granted) {
    console.log('Notification permission granted');
    // Now you can show browser notifications
    window.musicPopup.showBrowserNotification('Song', 'Artist', 'cover.jpg');
}
```

## 📱 Responsive Behavior

- Desktop: 380px width, positioned top-right
- Mobile: Full width minus 32px padding, adapts to screen size
- Cover size reduces on mobile (72px → 60px)
- Font sizes adjust for better readability

## 🎭 Animation Details

### Entrance
- Delay: 300ms
- Transform: translateY(-20px) → translateY(0)
- Scale: 0.95 → 1
- Opacity: 0 → 1
- Easing: cubic-bezier(0.22, 1, 0.36, 1)
- Duration: 0.6s

### Exit
- Transform: translateY(-10px)
- Scale: 0.98
- Opacity: 0
- Duration: 0.4s

### Hover
- Lift: translateY(-4px)
- Glow intensity increases
- Duration: 0.4s

### Pulse
- Subtle glow pulse every 5 seconds
- Smooth ease-in-out

## 🐛 Troubleshooting

### Popup not showing
1. Check if CSS and JS files are loaded
2. Check console for errors
3. Verify image URLs are correct
4. Make sure fonts are loaded

### Browser notifications not working
1. Check if permission is granted: `Notification.permission`
2. Request permission first: `await window.musicPopup.requestPermission()`
3. Check if browser supports notifications: `'Notification' in window`

### Popup appears behind other elements
1. Check z-index of other elements
2. Popup uses z-index: 99999
3. Make sure no parent has higher z-index

### Progress bar not animating
1. Check if duration parameter is provided
2. Verify JavaScript is loaded correctly
3. Check console for errors

## 📊 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ Browser notifications require HTTPS (except localhost)

## 🎯 Best Practices

1. **Always provide cover image** - Use placeholder if not available
2. **Keep titles short** - Long titles will be truncated with ellipsis
3. **Use appropriate duration** - 4-6 seconds is optimal
4. **Request notification permission on user action** - Don't request on page load
5. **Test on mobile** - Ensure responsive behavior works

## 💡 Tips

- Use `smartNotify()` for best user experience
- Request notification permission after first play
- Provide fallback cover image for missing artwork
- Test with rapid song changes to ensure smooth replacement
- Consider user's reduced motion preferences

## 🔗 Integration with Existing Code

### Replace existing popup notifications
```javascript
// Old code
if (window.popupNotifications) {
    window.popupNotifications.showMusicNotification(song, artist, cover);
}

// New code
showMusicPopup(song, artist, cover);
```

### Keep both systems
```javascript
// Show both old and new popup
if (window.popupNotifications) {
    window.popupNotifications.showMusicNotification(song, artist, cover);
}
showMusicPopup(song, artist, cover);
```

## 📝 Notes

- Component is completely standalone
- Does not modify existing page layout
- Does not interfere with other components
- Can be easily removed by deleting CSS/JS files
- No dependencies on other libraries

## 🎉 Demo

Open `music-popup-notification.html` in browser to see live demo with test buttons.

---

**Created for NeonWave Music App**  
Premium dark futuristic design with glassmorphism and neon aesthetics.
