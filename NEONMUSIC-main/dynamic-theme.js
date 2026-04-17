// ========================================
// DYNAMIC THEME SYSTEM
// ========================================

// Theme state
let themeMode = 'manual'; // 'manual', 'auto-time', 'genre'
let customGradient = {
    color1: '#1a0a2e',
    color2: '#6b3d7a'
};
let autoTimeInterval = null;

// Genre color mappings
const genreThemes = {
    'rock': { color1: '#ff0844', color2: '#ffb199' },
    'pop': { color1: '#fa709a', color2: '#fee140' },
    'electronic': { color1: '#30cfd0', color2: '#330867' },
    'jazz': { color1: '#f8b500', color2: '#fceabb' },
    'hiphop': { color1: '#667eea', color2: '#764ba2' },
    'default': { color1: '#1a0a2e', color2: '#6b3d7a' }
};

// Time-based themes
const timeThemes = {
    morning: { color1: '#ffd89b', color2: '#19547b' },    // 6-12
    afternoon: { color1: '#f093fb', color2: '#f5576c' },  // 12-18
    evening: { color1: '#4facfe', color2: '#00f2fe' },    // 18-22
    night: { color1: '#0f0c29', color2: '#302b63' }       // 22-6
};

// Initialize Dynamic Theme System
function initDynamicTheme() {
    console.log('🎨 Initializing Dynamic Theme System...');
    
    // Load saved settings
    loadThemeSettings();
    
    // Attach event listeners
    attachThemeListeners();
    
    // Apply current theme
    applyCurrentTheme();
    
    console.log('✅ Dynamic Theme System initialized');
}

// Load theme settings from localStorage
function loadThemeSettings() {
    const saved = localStorage.getItem('neonwave_theme_settings');
    
    if (saved) {
        const settings = JSON.parse(saved);
        themeMode = settings.themeMode || 'manual';
        customGradient = settings.customGradient || customGradient;
        
        // Update UI
        document.querySelectorAll('.theme-mode-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-theme-mode') === themeMode) {
                opt.classList.add('active');
            }
        });
        
        // Update color pickers
        const color1Input = document.getElementById('color1');
        const color2Input = document.getElementById('color2');
        if (color1Input) color1Input.value = customGradient.color1;
        if (color2Input) color2Input.value = customGradient.color2;
        
        updateColorHex();
        updateGradientPreview();
        
        console.log('✅ Theme settings loaded:', settings);
    }
}

// Save theme settings
function saveThemeSettings() {
    const settings = {
        themeMode,
        customGradient
    };
    
    localStorage.setItem('neonwave_theme_settings', JSON.stringify(settings));
    console.log('💾 Theme settings saved');
}

// Attach event listeners
function attachThemeListeners() {
    console.log('🔧 Attaching theme listeners...');
    
    // Theme mode selector
    const themeModeOptions = document.querySelectorAll('.theme-mode-option');
    console.log(`✅ Found ${themeModeOptions.length} theme mode options`);
    
    themeModeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const mode = option.getAttribute('data-theme-mode');
            console.log(`🎨 Theme mode clicked: ${mode}`);
            selectThemeMode(mode);
        });
    });
    
    // Color pickers
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    
    console.log('Color pickers:', color1Input ? '✅ Color1 found' : '❌ Color1 not found', 
                                    color2Input ? '✅ Color2 found' : '❌ Color2 not found');
    
    if (color1Input) {
        color1Input.addEventListener('input', (e) => {
            customGradient.color1 = e.target.value;
            console.log('🎨 Color1 changed:', e.target.value);
            updateColorHex();
            updateGradientPreview();
        });
    }
    
    if (color2Input) {
        color2Input.addEventListener('input', (e) => {
            customGradient.color2 = e.target.value;
            console.log('🎨 Color2 changed:', e.target.value);
            updateColorHex();
            updateGradientPreview();
        });
    }
    
    // Preset buttons
    const presetButtons = document.querySelectorAll('.preset-btn');
    console.log(`✅ Found ${presetButtons.length} preset buttons`);
    
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const colors = btn.getAttribute('data-colors').split(',');
            console.log('🎨 Preset clicked:', colors);
            customGradient.color1 = colors[0];
            customGradient.color2 = colors[1];
            
            if (color1Input) color1Input.value = colors[0];
            if (color2Input) color2Input.value = colors[1];
            
            updateColorHex();
            updateGradientPreview();
        });
    });
    
    // Apply button
    const applyBtn = document.getElementById('applyGradientBtn');
    console.log('Apply button:', applyBtn ? '✅ Found' : '❌ Not found');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            console.log('🎨 Apply button clicked!');
            applyGradient(customGradient.color1, customGradient.color2);
            saveThemeSettings();
            
            // Show confirmation
            applyBtn.textContent = '✓ Applied!';
            setTimeout(() => {
                applyBtn.textContent = 'Apply Gradient';
            }, 2000);
        });
    }
    
    console.log('✅ Theme listeners attached');
}

// Select theme mode
function selectThemeMode(mode) {
    themeMode = mode;
    
    // Update UI
    document.querySelectorAll('.theme-mode-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-theme-mode') === mode) {
            opt.classList.add('active');
        }
    });
    
    // Show/hide relevant sections
    const gradientBuilder = document.getElementById('gradientBuilder');
    const autoTimeSettings = document.getElementById('autoTimeSettings');
    const genreSettings = document.getElementById('genreThemeSettings');
    
    if (gradientBuilder) gradientBuilder.style.display = mode === 'manual' ? 'block' : 'none';
    if (autoTimeSettings) autoTimeSettings.style.display = mode === 'auto-time' ? 'block' : 'none';
    if (genreSettings) genreSettings.style.display = mode === 'genre' ? 'block' : 'none';
    
    // Apply theme based on mode
    applyCurrentTheme();
    saveThemeSettings();
    
    console.log(`🎨 Theme mode changed to: ${mode}`);
}

// Update color hex display
function updateColorHex() {
    const color1Hex = document.getElementById('color1Hex');
    const color2Hex = document.getElementById('color2Hex');
    
    if (color1Hex) color1Hex.textContent = customGradient.color1;
    if (color2Hex) color2Hex.textContent = customGradient.color2;
}

// Update gradient preview
function updateGradientPreview() {
    const preview = document.getElementById('gradientPreview');
    if (preview) {
        preview.style.background = `linear-gradient(135deg, ${customGradient.color1} 0%, ${customGradient.color2} 100%)`;
    }
}

// Apply current theme
function applyCurrentTheme() {
    switch (themeMode) {
        case 'manual':
            applyGradient(customGradient.color1, customGradient.color2);
            stopAutoTime();
            break;
            
        case 'auto-time':
            startAutoTime();
            break;
            
        case 'genre':
            applyGenreTheme();
            stopAutoTime();
            break;
    }
}

// Apply gradient to body
function applyGradient(color1, color2) {
    document.body.style.transition = 'background 0.8s ease';
    document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--theme-color-1', color1);
    document.documentElement.style.setProperty('--theme-color-2', color2);
    
    console.log(`🎨 Gradient applied: ${color1} → ${color2}`);
}

// Start auto time-based theme
function startAutoTime() {
    console.log('⏰ Starting auto time-based theme');
    
    // Apply immediately
    applyTimeBasedTheme();
    
    // Update every minute
    if (autoTimeInterval) clearInterval(autoTimeInterval);
    autoTimeInterval = setInterval(applyTimeBasedTheme, 60000);
}

// Stop auto time
function stopAutoTime() {
    if (autoTimeInterval) {
        clearInterval(autoTimeInterval);
        autoTimeInterval = null;
        console.log('⏰ Auto time stopped');
    }
}

// Apply time-based theme
function applyTimeBasedTheme() {
    const hour = new Date().getHours();
    let theme;
    
    if (hour >= 6 && hour < 12) {
        theme = timeThemes.morning;
        console.log('🌅 Morning theme');
    } else if (hour >= 12 && hour < 18) {
        theme = timeThemes.afternoon;
        console.log('☀️ Afternoon theme');
    } else if (hour >= 18 && hour < 22) {
        theme = timeThemes.evening;
        console.log('🌆 Evening theme');
    } else {
        theme = timeThemes.night;
        console.log('🌙 Night theme');
    }
    
    applyGradient(theme.color1, theme.color2);
}

// Apply genre-based theme
function applyGenreTheme(genre = 'default') {
    const theme = genreThemes[genre] || genreThemes.default;
    applyGradient(theme.color1, theme.color2);
    console.log(`🎵 Genre theme applied: ${genre}`);
}

// Export functions
window.dynamicTheme = {
    init: initDynamicTheme,
    applyGradient,
    selectThemeMode,
    applyGenreTheme,
    getCurrentMode: () => themeMode
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicTheme);
} else {
    // Check if we're on settings page
    setTimeout(() => {
        if (document.querySelector('.dynamic-theme-section')) {
            initDynamicTheme();
        }
    }, 100);
}

// Make init function globally available for re-initialization
window.initDynamicTheme = initDynamicTheme;

console.log('✅ Dynamic Theme module loaded');
