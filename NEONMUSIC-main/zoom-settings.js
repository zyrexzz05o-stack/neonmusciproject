// ========================================
// ZOOM LEVEL SETTINGS
// ========================================

// Zoom state
let currentZoom = 100;

// Initialize Zoom Settings
function initZoomSettings() {
    console.log('🔍 Initializing Zoom Settings...');
    
    // Load saved zoom
    loadZoomSettings();
    
    // Check if we're on settings page
    const zoomSection = document.querySelector('.zoom-settings-section');
    if (zoomSection) {
        console.log('⚙️ On settings page, attaching listeners');
        attachZoomListeners();
    }
    
    // Apply zoom
    applyZoom(currentZoom);
    
    // Setup keyboard shortcuts
    setupZoomKeyboardShortcuts();
}

// Load zoom from localStorage
function loadZoomSettings() {
    const saved = localStorage.getItem('neonwave_zoom_level');
    
    if (saved) {
        currentZoom = parseInt(saved);
        console.log('✅ Zoom loaded:', currentZoom + '%');
    }
}

// Save zoom to localStorage
function saveZoomSettings() {
    localStorage.setItem('neonwave_zoom_level', currentZoom.toString());
    console.log('💾 Zoom saved:', currentZoom + '%');
}

// Attach event listeners
function attachZoomListeners() {
    console.log('🔧 Attaching zoom listeners...');
    
    // Preset cards
    const presetCards = document.querySelectorAll('.zoom-preset-card');
    console.log(`✅ Found ${presetCards.length} preset cards`);
    
    presetCards.forEach(card => {
        card.addEventListener('click', () => {
            const zoom = parseInt(card.getAttribute('data-zoom'));
            console.log('🔍 Preset clicked:', zoom + '%');
            setZoom(zoom);
        });
    });
    
    // Zoom slider
    const zoomSlider = document.getElementById('zoomSlider');
    const zoomCurrentValue = document.getElementById('zoomCurrentValue');
    
    if (zoomSlider) {
        console.log('✅ Zoom slider found');
        
        // Update value display while dragging
        zoomSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (zoomCurrentValue) {
                zoomCurrentValue.textContent = value + '%';
            }
            updateZoomLabels(value);
        });
        
        // Apply zoom when released
        zoomSlider.addEventListener('change', (e) => {
            const value = parseInt(e.target.value);
            console.log('🔍 Slider changed:', value + '%');
            setZoom(value);
        });
        
        // Set initial value
        zoomSlider.value = currentZoom;
        if (zoomCurrentValue) {
            zoomCurrentValue.textContent = currentZoom + '%';
        }
        updateZoomLabels(currentZoom);
    }
    
    // Reset button
    const resetBtn = document.getElementById('zoomResetBtn');
    if (resetBtn) {
        console.log('✅ Reset button found');
        resetBtn.addEventListener('click', () => {
            console.log('🔍 Reset to 100%');
            setZoom(100);
        });
    }
    
    console.log('✅ Zoom listeners attached');
}

// Set zoom level
function setZoom(zoom) {
    currentZoom = zoom;
    
    // Update UI
    updateZoomUI(zoom);
    
    // Apply zoom
    applyZoom(zoom);
    
    // Save
    saveZoomSettings();
    
    console.log('🔍 Zoom set to:', zoom + '%');
}

// Update zoom UI
function updateZoomUI(zoom) {
    // Update preset cards
    const presetCards = document.querySelectorAll('.zoom-preset-card');
    presetCards.forEach(card => {
        const cardZoom = parseInt(card.getAttribute('data-zoom'));
        if (cardZoom === zoom) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    
    // Update slider
    const zoomSlider = document.getElementById('zoomSlider');
    if (zoomSlider) {
        zoomSlider.value = zoom;
    }
    
    // Update current value
    const zoomCurrentValue = document.getElementById('zoomCurrentValue');
    if (zoomCurrentValue) {
        zoomCurrentValue.textContent = zoom + '%';
    }
    
    // Update labels
    updateZoomLabels(zoom);
}

// Update zoom labels
function updateZoomLabels(zoom) {
    const labels = document.querySelectorAll('.zoom-label');
    labels.forEach(label => {
        const labelText = label.textContent.trim();
        const labelValue = parseInt(labelText);
        
        if (labelValue === zoom) {
            label.classList.add('current');
        } else {
            label.classList.remove('current');
        }
    });
}

// Apply zoom to entire app
function applyZoom(zoom) {
    const zoomDecimal = zoom / 100;
    
    // Apply to body
    document.body.style.zoom = zoomDecimal;
    
    // Alternative method for Firefox (doesn't support zoom)
    if (typeof document.body.style.zoom === 'undefined') {
        document.body.style.transform = `scale(${zoomDecimal})`;
        document.body.style.transformOrigin = 'top left';
        document.body.style.width = `${100 / zoomDecimal}%`;
        document.body.style.height = `${100 / zoomDecimal}%`;
    }
    
    console.log('✅ Zoom applied:', zoom + '%');
}

// Setup keyboard shortcuts (Ctrl + / Ctrl -)
function setupZoomKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Plus (zoom in)
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
            e.preventDefault();
            const newZoom = Math.min(currentZoom + 10, 130);
            setZoom(newZoom);
            console.log('⌨️ Keyboard: Zoom in to', newZoom + '%');
        }
        
        // Ctrl/Cmd + Minus (zoom out)
        if ((e.ctrlKey || e.metaKey) && e.key === '-') {
            e.preventDefault();
            const newZoom = Math.max(currentZoom - 10, 70);
            setZoom(newZoom);
            console.log('⌨️ Keyboard: Zoom out to', newZoom + '%');
        }
        
        // Ctrl/Cmd + 0 (reset to 100%)
        if ((e.ctrlKey || e.metaKey) && e.key === '0') {
            e.preventDefault();
            setZoom(100);
            console.log('⌨️ Keyboard: Reset to 100%');
        }
    });
    
    console.log('✅ Keyboard shortcuts enabled (Ctrl +/- and Ctrl 0)');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZoomSettings);
} else {
    setTimeout(initZoomSettings, 100);
}

// Export functions
window.zoomSettings = {
    init: initZoomSettings,
    setZoom: setZoom,
    getZoom: () => currentZoom,
    reset: () => setZoom(100)
};

// Make init function globally available
window.initZoomSettings = initZoomSettings;

console.log('✅ Zoom Settings module loaded');
