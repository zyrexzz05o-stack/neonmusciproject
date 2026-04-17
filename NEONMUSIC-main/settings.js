// ========================================
// SETTINGS PAGE - MOOD ENGINE
// ========================================

// Mood Engine State
let moodEngineEnabled = true;
let currentMoodMode = null;
let moodAudioContext = null;  // Renamed to avoid conflict
let moodAudioSource = null;   // Renamed to avoid conflict
let moodGainNode = null;      // Renamed to avoid conflict
let moodBassBoostFilter = null;  // Renamed to avoid conflict
let moodTrebleFilter = null;     // Renamed to avoid conflict
let isMoodAudioContextInitialized = false;  // Renamed to avoid conflict

// Initialize Settings when page loads
function initSettings() {
    console.log('🚀 Initializing settings...');
    
    // Check if we're on settings page
    const settingsContainer = document.querySelector('.settings-container');
    if (!settingsContainer) {
        // Not on settings page, just load settings from localStorage
        console.log('📄 Not on settings page, loading settings from storage');
        loadSettingsFromStorage();
        return;
    }
    
    console.log('⚙️ On settings page, doing full initialization');
    // On settings page, do full initialization
    loadSettings();
    attachEventListeners();
    applyMoodMode(currentMoodMode);
    
    // Initialize shapes settings
    if (typeof initShapesSettings === 'function') {
        setTimeout(() => {
            initShapesSettings();
        }, 200);
    }
}

// Load settings from localStorage (for all pages)
function loadSettingsFromStorage() {
    const savedSettings = localStorage.getItem('neonwave_settings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        moodEngineEnabled = settings.moodEngineEnabled !== undefined ? settings.moodEngineEnabled : true;
        currentMoodMode = settings.currentMoodMode || null;
        
        // Apply mood mode if enabled
        if (moodEngineEnabled && currentMoodMode) {
            applyMoodMode(currentMoodMode);
        }
        
        // Apply display settings
        applyDisplaySettings(settings.showVisualizer, settings.showLyrics);
        applyAnimationSpeed(settings.animationSpeed || 'normal');
    }
}

// Load Settings from localStorage (for settings page)
function loadSettings() {
    const savedSettings = localStorage.getItem('neonwave_settings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Mood Engine
        moodEngineEnabled = settings.moodEngineEnabled !== undefined ? settings.moodEngineEnabled : true;
        currentMoodMode = settings.currentMoodMode || null;
        
        // Audio Quality
        const audioQuality = settings.audioQuality || 'medium';
        const volumeNormalization = settings.volumeNormalization !== undefined ? settings.volumeNormalization : true;
        const crossfadeDuration = settings.crossfadeDuration || 5;
        
        // Display
        const showVisualizer = settings.showVisualizer !== undefined ? settings.showVisualizer : true;
        const showLyrics = settings.showLyrics !== undefined ? settings.showLyrics : true;
        const animationSpeed = settings.animationSpeed || 'normal';
        
        // Apply to UI elements if they exist
        const moodEngineToggle = document.getElementById('moodEngineToggle');
        const audioQualitySelect = document.getElementById('audioQuality');
        const volumeNormalizationToggle = document.getElementById('volumeNormalization');
        const crossfadeSlider = document.getElementById('crossfadeDuration');
        const crossfadeValueSpan = document.getElementById('crossfadeValue');
        const showVisualizerToggle = document.getElementById('showVisualizer');
        const showLyricsToggle = document.getElementById('showLyrics');
        const animationSpeedSelect = document.getElementById('animationSpeed');
        
        if (moodEngineToggle) moodEngineToggle.checked = moodEngineEnabled;
        if (audioQualitySelect) audioQualitySelect.value = audioQuality;
        if (volumeNormalizationToggle) volumeNormalizationToggle.checked = volumeNormalization;
        if (crossfadeSlider) crossfadeSlider.value = crossfadeDuration;
        if (crossfadeValueSpan) crossfadeValueSpan.textContent = crossfadeDuration + 's';
        if (showVisualizerToggle) showVisualizerToggle.checked = showVisualizer;
        if (showLyricsToggle) showLyricsToggle.checked = showLyrics;
        if (animationSpeedSelect) animationSpeedSelect.value = animationSpeed;
        
        // Update Mood Engine UI
        updateMoodEngineUI();
        
        // Mark active mood mode
        if (currentMoodMode) {
            const moodCard = document.querySelector(`.mood-mode-card[data-mode="${currentMoodMode}"]`);
            if (moodCard) {
                moodCard.classList.add('active');
                const currentMoodNameSpan = document.getElementById('currentMoodName');
                if (currentMoodNameSpan) {
                    currentMoodNameSpan.textContent = getMoodName(currentMoodMode);
                }
            }
        }
        
        // Apply display settings
        applyDisplaySettings(showVisualizer, showLyrics);
        applyAnimationSpeed(animationSpeed);
    }
}

// Save Settings to localStorage
function saveSettings() {
    const audioQualitySelect = document.getElementById('audioQuality');
    const volumeNormalizationToggle = document.getElementById('volumeNormalization');
    const crossfadeSlider = document.getElementById('crossfadeDuration');
    const showVisualizerToggle = document.getElementById('showVisualizer');
    const showLyricsToggle = document.getElementById('showLyrics');
    const animationSpeedSelect = document.getElementById('animationSpeed');
    
    const settings = {
        moodEngineEnabled: moodEngineEnabled,
        currentMoodMode: currentMoodMode,
        audioQuality: audioQualitySelect ? audioQualitySelect.value : 'medium',
        volumeNormalization: volumeNormalizationToggle ? volumeNormalizationToggle.checked : true,
        crossfadeDuration: crossfadeSlider ? parseInt(crossfadeSlider.value) : 5,
        showVisualizer: showVisualizerToggle ? showVisualizerToggle.checked : true,
        showLyrics: showLyricsToggle ? showLyricsToggle.checked : true,
        animationSpeed: animationSpeedSelect ? animationSpeedSelect.value : 'normal'
    };
    
    localStorage.setItem('neonwave_settings', JSON.stringify(settings));
    console.log('✅ Settings saved:', settings);
}

// Attach Event Listeners
function attachEventListeners() {
    console.log('🔧 Attaching event listeners...');
    
    // Mood Engine Toggle
    const moodEngineToggle = document.getElementById('moodEngineToggle');
    if (moodEngineToggle) {
        console.log('✅ Mood Engine Toggle found');
        moodEngineToggle.addEventListener('change', (e) => {
            moodEngineEnabled = e.target.checked;
            console.log('🎛️ Mood Engine:', moodEngineEnabled ? 'enabled' : 'disabled');
            updateMoodEngineUI();
            saveSettings();
            
            if (!moodEngineEnabled) {
                removeMoodEffects();
            } else if (currentMoodMode) {
                applyMoodMode(currentMoodMode);
            }
        });
    } else {
        console.warn('⚠️ Mood Engine Toggle not found');
    }
    
    // Mood Mode Cards
    const moodCards = document.querySelectorAll('.mood-mode-card');
    console.log(`✅ Found ${moodCards.length} mood cards`);
    
    if (moodCards.length === 0) {
        console.error('❌ No mood cards found! Check if .mood-mode-card elements exist in DOM');
        return;
    }
    
    moodCards.forEach((card, index) => {
        const mode = card.getAttribute('data-mode');
        console.log(`🎯 Attaching listener to card ${index + 1}: ${mode}`);
        
        card.addEventListener('click', function(e) {
            console.log(`🎭 Mood card clicked: ${mode}`);
            console.log(`🎛️ Mood Engine enabled: ${moodEngineEnabled}`);
            
            if (!moodEngineEnabled) {
                console.log('⚠️ Mood Engine is disabled');
                alert('Please enable Mood Engine first by toggling the switch at the top right.');
                return;
            }
            
            const currentMoodNameSpan = document.getElementById('currentMoodName');
            
            // Toggle mode (click again to disable)
            if (currentMoodMode === mode) {
                console.log(`🔄 Disabling current mode: ${mode}`);
                currentMoodMode = null;
                removeMoodEffects();
                document.querySelectorAll('.mood-mode-card').forEach(c => c.classList.remove('active'));
                updateActiveModeDisplay('None');
            } else {
                console.log(`🎨 Activating mode: ${mode}`);
                currentMoodMode = mode;
                applyMoodMode(mode);
                
                // Remove active from all cards
                document.querySelectorAll('.mood-mode-card').forEach(c => {
                    c.classList.remove('active');
                    // Remove checkmark from all
                    const indicator = c.querySelector('.mood-mode-indicator');
                    if (indicator) {
                        indicator.textContent = '';
                        indicator.style.background = 'rgba(255, 255, 255, 0.3)';
                    }
                });
                
                // Add active to clicked card
                card.classList.add('active');
                
                // Add checkmark to active card
                const activeIndicator = card.querySelector('.mood-mode-indicator');
                if (activeIndicator) {
                    activeIndicator.textContent = '✓';
                    activeIndicator.style.background = 'rgba(255, 255, 255, 1)';
                    activeIndicator.style.color = '#000';
                    activeIndicator.style.fontSize = '12px';
                    activeIndicator.style.display = 'flex';
                    activeIndicator.style.alignItems = 'center';
                    activeIndicator.style.justifyContent = 'center';
                }
                
                // Update Active Mode display
                const modeName = getMoodName(mode);
                updateActiveModeDisplay(modeName);
                
                // Show alert as confirmation
                console.log(`✅ ${modeName} mode activated!`);
            }
            
            saveSettings();
        });
        
        console.log(`✅ Listener attached to ${mode} card`);
    });
    
    // Crossfade Slider
    const crossfadeSlider = document.getElementById('crossfadeDuration');
    const crossfadeValue = document.getElementById('crossfadeValue');
    if (crossfadeSlider && crossfadeValue) {
        crossfadeSlider.addEventListener('input', (e) => {
            crossfadeValue.textContent = e.target.value + 's';
        });
        crossfadeSlider.addEventListener('change', saveSettings);
    }
    
    // Audio Quality
    const audioQualitySelect = document.getElementById('audioQuality');
    if (audioQualitySelect) {
        audioQualitySelect.addEventListener('change', saveSettings);
    }
    
    // Volume Normalization
    const volumeNormalizationToggle = document.getElementById('volumeNormalization');
    if (volumeNormalizationToggle) {
        volumeNormalizationToggle.addEventListener('change', saveSettings);
    }
    
    // Show Visualizer
    const showVisualizerToggle = document.getElementById('showVisualizer');
    if (showVisualizerToggle) {
        showVisualizerToggle.addEventListener('change', (e) => {
            applyVisualizerSetting(e.target.checked);
            saveSettings();
        });
    }
    
    // Show Lyrics
    const showLyricsToggle = document.getElementById('showLyrics');
    if (showLyricsToggle) {
        showLyricsToggle.addEventListener('change', (e) => {
            applyLyricsSetting(e.target.checked);
            saveSettings();
        });
    }
    
    // Animation Speed
    const animationSpeedSelect = document.getElementById('animationSpeed');
    if (animationSpeedSelect) {
        animationSpeedSelect.addEventListener('change', (e) => {
            applyAnimationSpeed(e.target.value);
            saveSettings();
        });
    }
    
    // Reset Button
    const resetButton = document.getElementById('resetSettings');
    if (resetButton) {
        resetButton.addEventListener('click', resetSettings);
    }
}

// Update Mood Engine UI
function updateMoodEngineUI() {
    const moodEngineContent = document.getElementById('moodEngineContent');
    
    if (moodEngineContent) {
        if (moodEngineEnabled) {
            moodEngineContent.classList.remove('disabled');
        } else {
            moodEngineContent.classList.add('disabled');
        }
    }
}

// Get Mood Name
function getMoodName(mode) {
    const names = {
        'energize': 'Energize',
        'midnight': 'Midnight Calm',
        'rainy': 'Rainy Focus',
        'hyper': 'Hyper'
    };
    return names[mode] || 'None';
}

// Update Active Mode Display (with aggressive update)
function updateActiveModeDisplay(modeName) {
    console.log(`🔄 Updating Active Mode Display to: ${modeName}`);
    
    // Method 1: Direct getElementById
    const element1 = document.getElementById('currentMoodName');
    if (element1) {
        element1.textContent = modeName;
        element1.innerHTML = modeName;
        console.log(`✅ Method 1 - Updated via getElementById`);
    }
    
    // Method 2: querySelector
    const element2 = document.querySelector('#currentMoodName');
    if (element2) {
        element2.textContent = modeName;
        element2.innerHTML = modeName;
        console.log(`✅ Method 2 - Updated via querySelector`);
    }
    
    // Method 3: Find by class
    const element3 = document.querySelector('.current-mood-name');
    if (element3) {
        element3.textContent = modeName;
        element3.innerHTML = modeName;
        console.log(`✅ Method 3 - Updated via class selector`);
    }
    
    // Method 4: Replace entire display
    const displayContainer = document.querySelector('.current-mood-display');
    if (displayContainer) {
        displayContainer.innerHTML = `
            <span class="current-mood-label">Active Mode:</span>
            <span class="current-mood-name" id="currentMoodName">${modeName}</span>
        `;
        console.log(`✅ Method 4 - Replaced entire container`);
    }
    
    console.log(`✅ All update methods completed for: ${modeName}`);
}

// Apply Mood Mode
function applyMoodMode(mode) {
    if (!mode || !moodEngineEnabled) return;
    
    console.log(`🎭 Applying Mood Mode: ${mode}`);
    
    // Remove previous mood classes
    document.body.classList.remove('mood-energize', 'mood-midnight', 'mood-rainy', 'mood-hyper');
    
    // Apply new mood class
    document.body.classList.add(`mood-${mode}`);
    
    // Apply audio effects
    applyAudioEffects(mode);
    
    // Apply visual effects
    applyVisualEffects(mode);
    
    // Apply animation effects
    applyAnimationEffects(mode);
}

// Remove Mood Effects
function removeMoodEffects() {
    document.body.classList.remove('mood-energize', 'mood-midnight', 'mood-rainy', 'mood-hyper');
    
    // Reset audio effects
    if (moodAudioContext && moodGainNode) {
        moodGainNode.gain.setValueAtTime(1.0, moodAudioContext.currentTime);
    }
    if (moodBassBoostFilter) {
        moodBassBoostFilter.gain.setValueAtTime(0, moodAudioContext.currentTime);
    }
    if (moodTrebleFilter) {
        moodTrebleFilter.gain.setValueAtTime(0, moodAudioContext.currentTime);
    }
    
    // Reset visual effects
    document.body.style.filter = '';
    
    // Reset animation effects
    const shapes = document.querySelectorAll('.bg-shapes > *');
    shapes.forEach(shape => {
        shape.style.animationDuration = '';
        shape.style.opacity = '';
    });
    
    console.log('🎭 Mood effects removed');
}

// Apply Audio Effects using Web Audio API
function applyAudioEffects(mode) {
    // Get audio/video player
    const videoPlayer = document.getElementById('videoPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    const activePlayer = (videoPlayer && !videoPlayer.paused) ? videoPlayer : 
                        (audioPlayer && !audioPlayer.paused) ? audioPlayer : null;
    
    if (!activePlayer) {
        console.log('⚠️ No active audio source, will apply when playback starts');
        return;
    }
    
    try {
        // Initialize Audio Context if not exists
        if (!isMoodAudioContextInitialized) {
            moodAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            moodAudioSource = moodAudioContext.createMediaElementSource(activePlayer);
            moodGainNode = moodAudioContext.createGain();
            moodBassBoostFilter = moodAudioContext.createBiquadFilter();
            moodTrebleFilter = moodAudioContext.createBiquadFilter();
            
            // Setup filter types
            moodBassBoostFilter.type = 'lowshelf';
            moodBassBoostFilter.frequency.value = 200;
            
            moodTrebleFilter.type = 'highshelf';
            moodTrebleFilter.frequency.value = 3000;
            
            // Connect nodes
            moodAudioSource.connect(moodBassBoostFilter);
            moodBassBoostFilter.connect(moodTrebleFilter);
            moodTrebleFilter.connect(moodGainNode);
            moodGainNode.connect(moodAudioContext.destination);
            
            isMoodAudioContextInitialized = true;
            console.log('✅ Audio Context initialized');
        }
        
        // Apply mode-specific effects
        switch (mode) {
            case 'energize':
                moodBassBoostFilter.gain.setValueAtTime(8, moodAudioContext.currentTime);
                moodTrebleFilter.gain.setValueAtTime(0, moodAudioContext.currentTime);
                moodGainNode.gain.setValueAtTime(1.1, moodAudioContext.currentTime);
                console.log('🔊 Energize: Bass boosted');
                break;
                
            case 'midnight':
                moodBassBoostFilter.gain.setValueAtTime(-3, moodAudioContext.currentTime);
                moodTrebleFilter.gain.setValueAtTime(4, moodAudioContext.currentTime);
                moodGainNode.gain.setValueAtTime(0.9, moodAudioContext.currentTime);
                console.log('🌙 Midnight: Treble enhanced');
                break;
                
            case 'rainy':
                moodBassBoostFilter.gain.setValueAtTime(0, moodAudioContext.currentTime);
                moodTrebleFilter.gain.setValueAtTime(-2, moodAudioContext.currentTime);
                moodGainNode.gain.setValueAtTime(0.7, moodAudioContext.currentTime);
                console.log('🌧️ Rainy: Volume reduced');
                break;
                
            case 'hyper':
                moodBassBoostFilter.gain.setValueAtTime(6, moodAudioContext.currentTime);
                moodTrebleFilter.gain.setValueAtTime(5, moodAudioContext.currentTime);
                moodGainNode.gain.setValueAtTime(1.2, moodAudioContext.currentTime);
                console.log('🚀 Hyper: Full boost');
                break;
        }
    } catch (error) {
        console.error('❌ Error applying audio effects:', error);
    }
}

// Apply Visual Effects
function applyVisualEffects(mode) {
    const body = document.body;
    
    switch (mode) {
        case 'energize':
            body.style.filter = 'brightness(1.1) contrast(1.05) saturate(1.1)';
            break;
            
        case 'midnight':
            body.style.filter = 'brightness(0.85) contrast(1.1) saturate(0.9)';
            break;
            
        case 'rainy':
            body.style.filter = 'brightness(0.7) contrast(0.95) saturate(0.8)';
            break;
            
        case 'hyper':
            body.style.filter = 'brightness(1.15) contrast(1.15) saturate(1.2)';
            break;
    }
}

// Apply Animation Effects
function applyAnimationEffects(mode) {
    const shapes = document.querySelectorAll('.bg-shapes > *');
    
    if (!shapes.length) return;
    
    const speedMultipliers = {
        'energize': 0.7,
        'midnight': 1.5,
        'rainy': 2.0,
        'hyper': 0.5
    };
    
    const multiplier = speedMultipliers[mode] || 1.0;
    
    shapes.forEach(shape => {
        // Get original animation duration or use default
        let duration = parseFloat(shape.getAttribute('data-original-duration'));
        if (!duration) {
            duration = parseFloat(getComputedStyle(shape).animationDuration) || 20;
            shape.setAttribute('data-original-duration', duration);
        }
        
        shape.style.animationDuration = (duration * multiplier) + 's';
        
        if (mode === 'rainy') {
            shape.style.opacity = '0.3';
        } else {
            shape.style.opacity = '';
        }
    });
}

// Apply Display Settings
function applyDisplaySettings(showVisualizer, showLyrics) {
    if (showVisualizer !== undefined) applyVisualizerSetting(showVisualizer);
    if (showLyrics !== undefined) applyLyricsSetting(showLyrics);
}

// Apply Visualizer Setting
function applyVisualizerSetting(show) {
    const visualizers = document.querySelectorAll('.audio-visualizer, #miniVisualizer, #experimentalVisualizer');
    visualizers.forEach(viz => {
        if (viz) {
            viz.style.display = show ? '' : 'none';
        }
    });
    console.log(`👁️ Visualizer: ${show ? 'shown' : 'hidden'}`);
}

// Apply Lyrics Setting
function applyLyricsSetting(show) {
    const lyricsBox = document.getElementById('lyricsBox');
    const lyricsOverlay = document.getElementById('lyricsOverlay');
    
    if (lyricsBox) {
        lyricsBox.style.display = show ? '' : 'none';
    }
    if (lyricsOverlay) {
        lyricsOverlay.style.display = show ? '' : 'none';
    }
    console.log(`📝 Lyrics: ${show ? 'shown' : 'hidden'}`);
}

// Apply Animation Speed
function applyAnimationSpeed(speed) {
    const shapes = document.querySelectorAll('.bg-shapes > *');
    
    const speedMultipliers = {
        'slow': 1.5,
        'normal': 1.0,
        'fast': 0.7
    };
    
    const multiplier = speedMultipliers[speed] || 1.0;
    
    shapes.forEach(shape => {
        let duration = parseFloat(shape.getAttribute('data-base-duration'));
        if (!duration) {
            duration = parseFloat(getComputedStyle(shape).animationDuration) || 20;
            shape.setAttribute('data-base-duration', duration);
        }
        
        shape.style.animationDuration = (duration * multiplier) + 's';
    });
    
    console.log(`⚡ Animation speed: ${speed}`);
}

// Reset Settings
function resetSettings() {
    if (!confirm('Are you sure you want to reset all settings to default?')) {
        return;
    }
    
    // Clear localStorage
    localStorage.removeItem('neonwave_settings');
    
    // Reset to defaults
    moodEngineEnabled = true;
    currentMoodMode = null;
    
    // Reset UI
    const moodEngineToggle = document.getElementById('moodEngineToggle');
    const audioQualitySelect = document.getElementById('audioQuality');
    const volumeNormalizationToggle = document.getElementById('volumeNormalization');
    const crossfadeSlider = document.getElementById('crossfadeDuration');
    const crossfadeValueSpan = document.getElementById('crossfadeValue');
    const showVisualizerToggle = document.getElementById('showVisualizer');
    const showLyricsToggle = document.getElementById('showLyrics');
    const animationSpeedSelect = document.getElementById('animationSpeed');
    
    if (moodEngineToggle) moodEngineToggle.checked = true;
    if (audioQualitySelect) audioQualitySelect.value = 'medium';
    if (volumeNormalizationToggle) volumeNormalizationToggle.checked = true;
    if (crossfadeSlider) crossfadeSlider.value = 5;
    if (crossfadeValueSpan) crossfadeValueSpan.textContent = '5s';
    if (showVisualizerToggle) showVisualizerToggle.checked = true;
    if (showLyricsToggle) showLyricsToggle.checked = true;
    if (animationSpeedSelect) animationSpeedSelect.value = 'normal';
    
    // Remove mood effects
    removeMoodEffects();
    document.querySelectorAll('.mood-mode-card').forEach(c => c.classList.remove('active'));
    const currentMoodNameSpan = document.getElementById('currentMoodName');
    if (currentMoodNameSpan) currentMoodNameSpan.textContent = 'None';
    
    updateMoodEngineUI();
    
    // Reset display settings
    applyDisplaySettings(true, true);
    applyAnimationSpeed('normal');
    
    console.log('✅ Settings reset to default');
    alert('Settings have been reset to default values.');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSettings);
} else {
    // DOM already loaded, but wait a bit for dynamic content
    setTimeout(initSettings, 100);
}

// Also re-initialize when navigating to settings page
window.addEventListener('load', () => {
    // Listen for page changes
    const observer = new MutationObserver((mutations) => {
        const settingsContainer = document.querySelector('.settings-container');
        if (settingsContainer && !settingsContainer.hasAttribute('data-initialized')) {
            settingsContainer.setAttribute('data-initialized', 'true');
            console.log('🔄 Settings page detected, re-initializing...');
            setTimeout(initSettings, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Export functions for use in main app
window.neonwaveSettings = {
    applyMoodMode,
    removeMoodEffects,
    getCurrentMode: () => currentMoodMode,
    isEnabled: () => moodEngineEnabled,
    loadSettings: loadSettingsFromStorage,
    saveSettings,
    init: initSettings  // Export init function
};

// Make initSettings available globally
window.initSettings = initSettings;

console.log('✅ Settings module loaded');
