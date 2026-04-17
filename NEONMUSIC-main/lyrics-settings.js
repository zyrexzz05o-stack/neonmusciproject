// ========================================
// LYRICS SETTINGS
// ========================================

// Lyrics settings state
let lyricsSettings = {
    enabled: true,
    fontSize: 'medium',
    position: 'center',
    scrollSpeed: 'normal',
    opacity: 30,
    karaokeMode: false,
    textShadow: true
};

// Initialize Lyrics Settings
function initLyricsSettings() {
    console.log('📝 Initializing Lyrics Settings...');
    
    // Check if we're on settings page
    const lyricsSettingsSection = document.querySelector('.lyrics-settings-section');
    if (!lyricsSettingsSection) {
        console.log('📄 Not on settings page, loading from storage');
        loadLyricsSettingsFromStorage();
        return;
    }
    
    console.log('⚙️ On settings page, doing full initialization');
    loadLyricsSettings();
    attachLyricsListeners();
    updateLyricsPreview();
}

// Load from localStorage
function loadLyricsSettingsFromStorage() {
    const saved = localStorage.getItem('neonwave_lyrics_settings');
    
    if (saved) {
        lyricsSettings = JSON.parse(saved);
        applyLyricsSettings();
        console.log('✅ Lyrics settings loaded from storage');
    }
}

// Load settings (for settings page)
function loadLyricsSettings() {
    const saved = localStorage.getItem('neonwave_lyrics_settings');
    
    if (saved) {
        lyricsSettings = JSON.parse(saved);
    }
    
    // Apply to UI
    const showLyricsToggle = document.getElementById('showLyrics');
    const fontSizeSelect = document.getElementById('lyricsFontSize');
    const positionSelect = document.getElementById('lyricsPosition');
    const scrollSpeedSelect = document.getElementById('lyricsScrollSpeed');
    const opacitySlider = document.getElementById('lyricsOpacity');
    const opacityValue = document.getElementById('lyricsOpacityValue');
    const karaokeModeToggle = document.getElementById('karaokeMode');
    const textShadowToggle = document.getElementById('lyricsTextShadow');
    
    if (showLyricsToggle) showLyricsToggle.checked = lyricsSettings.enabled;
    if (fontSizeSelect) fontSizeSelect.value = lyricsSettings.fontSize;
    if (positionSelect) positionSelect.value = lyricsSettings.position;
    if (scrollSpeedSelect) scrollSpeedSelect.value = lyricsSettings.scrollSpeed;
    if (opacitySlider) opacitySlider.value = lyricsSettings.opacity;
    if (opacityValue) opacityValue.textContent = lyricsSettings.opacity + '%';
    if (karaokeModeToggle) karaokeModeToggle.checked = lyricsSettings.karaokeMode;
    if (textShadowToggle) textShadowToggle.checked = lyricsSettings.textShadow;
    
    updateLyricsContentUI();
    console.log('✅ Lyrics settings loaded:', lyricsSettings);
}

// Save settings
function saveLyricsSettings() {
    localStorage.setItem('neonwave_lyrics_settings', JSON.stringify(lyricsSettings));
    console.log('💾 Lyrics settings saved');
}

// Attach event listeners
function attachLyricsListeners() {
    console.log('🔧 Attaching lyrics listeners...');
    
    // Show Lyrics Toggle
    const showLyricsToggle = document.getElementById('showLyrics');
    if (showLyricsToggle) {
        showLyricsToggle.addEventListener('change', (e) => {
            lyricsSettings.enabled = e.target.checked;
            console.log('📝 Lyrics enabled:', lyricsSettings.enabled);
            updateLyricsContentUI();
            applyLyricsSettings();
            saveLyricsSettings();
        });
    }
    
    // Font Size
    const fontSizeSelect = document.getElementById('lyricsFontSize');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
            lyricsSettings.fontSize = e.target.value;
            console.log('📝 Font size:', lyricsSettings.fontSize);
            updateLyricsPreview();
            applyLyricsSettings();
            saveLyricsSettings();
        });
    }
    
    // Position
    const positionSelect = document.getElementById('lyricsPosition');
    if (positionSelect) {
        positionSelect.addEventListener('change', (e) => {
            lyricsSettings.position = e.target.value;
            console.log('📝 Position:', lyricsSettings.position);
            updateLyricsPreview();
            applyLyricsSettings();
            saveLyricsSettings();
        });
    }
    
    // Scroll Speed
    const scrollSpeedSelect = document.getElementById('lyricsScrollSpeed');
    if (scrollSpeedSelect) {
        scrollSpeedSelect.addEventListener('change', (e) => {
            lyricsSettings.scrollSpeed = e.target.value;
            console.log('📝 Scroll speed:', lyricsSettings.scrollSpeed);
            applyLyricsSettings();
            saveLyricsSettings();
        });
    }
    
    // Opacity Slider
    const opacitySlider = document.getElementById('lyricsOpacity');
    const opacityValue = document.getElementById('lyricsOpacityValue');
    if (opacitySlider && opacityValue) {
        opacitySlider.addEventListener('input', (e) => {
            lyricsSettings.opacity = parseInt(e.target.value);
            opacityValue.textContent = lyricsSettings.opacity + '%';
            updateLyricsPreview();
        });
        
        opacitySlider.addEventListener('change', (e) => {
            applyLyricsSettings();
            saveLyricsSettings();
        });
    }
    
    // Karaoke Mode
    const karaokeModeToggle = document.getElementById('karaokeMode');
    if (karaokeModeToggle) {
        karaokeModeToggle.addEventListener('change', (e) => {
            lyricsSettings.karaokeMode = e.target.checked;
            console.log('📝 Karaoke mode:', lyricsSettings.karaokeMode);
            updateLyricsPreview();
            applyLyricsSettings();
            saveLyricsSettings();
        });
    }
    
    // Text Shadow
    const textShadowToggle = document.getElementById('lyricsTextShadow');
    if (textShadowToggle) {
        textShadowToggle.addEventListener('change', (e) => {
            lyricsSettings.textShadow = e.target.checked;
            console.log('📝 Text shadow:', lyricsSettings.textShadow);
            updateLyricsPreview();
            applyLyricsSettings();
            saveLyricsSettings();
        });
    }
    
    console.log('✅ Lyrics listeners attached');
}

// Update lyrics content UI (enable/disable)
function updateLyricsContentUI() {
    const lyricsContent = document.getElementById('lyricsSettingsContent');
    
    if (lyricsContent) {
        if (lyricsSettings.enabled) {
            lyricsContent.classList.remove('disabled');
        } else {
            lyricsContent.classList.add('disabled');
        }
    }
}

// Update preview
function updateLyricsPreview() {
    const previewBox = document.getElementById('lyricsPreviewBox');
    
    if (!previewBox) return;
    
    // Remove all classes
    previewBox.className = 'lyrics-preview-box';
    
    // Add size class
    previewBox.classList.add(`size-${lyricsSettings.fontSize}`);
    
    // Add position class
    previewBox.classList.add(`position-${lyricsSettings.position}`);
    
    // Add text shadow
    if (lyricsSettings.textShadow) {
        previewBox.classList.add('text-shadow');
    }
    
    // Add karaoke mode
    if (lyricsSettings.karaokeMode) {
        previewBox.classList.add('karaoke-mode');
    }
    
    // Update opacity
    previewBox.style.background = `rgba(0, 0, 0, ${lyricsSettings.opacity / 100})`;
    
    console.log('✅ Preview updated');
}

// Apply settings to actual lyrics
function applyLyricsSettings() {
    const lyricsBox = document.getElementById('lyricsBox');
    const lyricsBoxContent = document.getElementById('lyricsBoxContent');
    
    // Show/hide lyrics
    if (lyricsBox) {
        lyricsBox.style.display = lyricsSettings.enabled ? 'block' : 'none';
    }
    
    if (!lyricsBoxContent) return;
    
    // Apply font size
    const fontSizes = {
        'small': '14px',
        'medium': '18px',
        'large': '22px',
        'xlarge': '26px'
    };
    lyricsBoxContent.style.fontSize = fontSizes[lyricsSettings.fontSize] || '18px';
    
    // Apply position
    const positions = {
        'top': 'flex-start',
        'center': 'center',
        'bottom': 'flex-end'
    };
    lyricsBoxContent.style.justifyContent = positions[lyricsSettings.position] || 'center';
    
    // Apply opacity - DISABLED: No background for lyrics box
    if (lyricsBox) {
        lyricsBox.style.background = 'transparent';
    }
    
    // Apply text shadow
    const lines = lyricsBoxContent.querySelectorAll('.lyric-line');
    lines.forEach(line => {
        if (lyricsSettings.textShadow) {
            line.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.8)';
        } else {
            line.style.textShadow = 'none';
        }
    });
    
    // Apply karaoke mode
    if (lyricsSettings.karaokeMode) {
        lyricsBoxContent.classList.add('karaoke-mode');
    } else {
        lyricsBoxContent.classList.remove('karaoke-mode');
    }
    
    // Apply scroll speed (for auto-scroll)
    const scrollSpeeds = {
        'slow': 1.5,
        'normal': 1.0,
        'fast': 0.7
    };
    window.lyricsScrollSpeed = scrollSpeeds[lyricsSettings.scrollSpeed] || 1.0;
    
    console.log('✅ Lyrics settings applied');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLyricsSettings);
} else {
    setTimeout(initLyricsSettings, 100);
}

// Export functions
window.lyricsSettings = {
    init: initLyricsSettings,
    apply: applyLyricsSettings,
    getSettings: () => lyricsSettings,
    updatePreview: updateLyricsPreview
};

// Make init function globally available
window.initLyricsSettings = initLyricsSettings;

console.log('✅ Lyrics Settings module loaded');
