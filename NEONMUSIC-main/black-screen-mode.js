// ========================================
// BLACK SCREEN MODE
// Pure listening experience - only music
// ========================================

console.log('⬛ [Black Screen Mode] Module Loading...');

// State
let isBlackMode = false;
let mouseIdleTimeout = null;
let lastMouseMove = 0;

/**
 * Enter Black Screen Mode
 */
function enterBlackMode() {
    if (isBlackMode) return;
    
    console.log('⬛ Entering Black Screen Mode...');
    isBlackMode = true;
    
    // Add class to body
    document.body.classList.add('black-mode');
    
    // Hide cursor initially
    document.body.style.cursor = 'none';
    
    // Setup mouse movement listener
    document.addEventListener('mousemove', handleMouseMove);
    
    // Show minimal controls briefly
    showMinimalControls();
    
    console.log('✅ Black Screen Mode active');
}

/**
 * Exit Black Screen Mode
 */
function exitBlackMode() {
    if (!isBlackMode) return;
    
    console.log('⬛ Exiting Black Screen Mode...');
    isBlackMode = false;
    
    // Remove class from body
    document.body.classList.remove('black-mode');
    
    // Show cursor
    document.body.style.cursor = '';
    
    // Remove mouse movement listener
    document.removeEventListener('mousemove', handleMouseMove);
    
    // Clear timeout
    if (mouseIdleTimeout) {
        clearTimeout(mouseIdleTimeout);
        mouseIdleTimeout = null;
    }
    
    // Hide minimal controls
    hideMinimalControls();
    
    console.log('✅ Black Screen Mode exited');
}

/**
 * Toggle Black Screen Mode
 */
function toggleBlackMode() {
    if (isBlackMode) {
        exitBlackMode();
    } else {
        enterBlackMode();
    }
}

/**
 * Handle mouse movement
 */
function handleMouseMove(e) {
    if (!isBlackMode) return;
    
    const now = Date.now();
    
    // Throttle mouse move events (every 100ms)
    if (now - lastMouseMove < 100) return;
    lastMouseMove = now;
    
    // Show cursor
    document.body.style.cursor = 'default';
    
    // Show minimal controls
    showMinimalControls();
    
    // Clear existing timeout
    if (mouseIdleTimeout) {
        clearTimeout(mouseIdleTimeout);
    }
    
    // Hide controls after 2 seconds of idle
    mouseIdleTimeout = setTimeout(() => {
        hideMinimalControls();
        document.body.style.cursor = 'none';
    }, 2000);
}

/**
 * Show minimal controls
 */
function showMinimalControls() {
    const controls = document.getElementById('blackModeControls');
    if (controls) {
        controls.classList.add('visible');
    }
}

/**
 * Hide minimal controls
 */
function hideMinimalControls() {
    const controls = document.getElementById('blackModeControls');
    if (controls) {
        controls.classList.remove('visible');
    }
}

/**
 * Setup keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Press 'B' to toggle Black Screen Mode
        if (e.key === 'b' || e.key === 'B') {
            e.preventDefault();
            
            // Toggle: If already in black mode, exit. Otherwise, enter.
            if (isBlackMode) {
                console.log('⬛ Toggling OFF Black Screen Mode');
                exitBlackMode();
            } else {
                console.log('⬛ Toggling ON Black Screen Mode');
                enterBlackMode();
            }
        }
        
        // Press 'ESC' to exit Black Screen Mode
        if (e.key === 'Escape' && isBlackMode) {
            e.preventDefault();
            exitBlackMode();
        }
    });
}

/**
 * Initialize Black Screen Mode
 */
function initBlackScreenMode() {
    console.log('⬛ Initializing Black Screen Mode...');
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Create minimal controls overlay
    createMinimalControlsOverlay();
    
    console.log('✅ Black Screen Mode initialized');
    console.log('💡 Press B to enter, ESC to exit');
}

/**
 * Create minimal controls overlay
 */
function createMinimalControlsOverlay() {
    // Check if already exists
    if (document.getElementById('blackModeControls')) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'blackModeControls';
    overlay.className = 'black-mode-controls';
    
    // Create controls container
    const container = document.createElement('div');
    container.className = 'black-mode-controls-container';
    
    // Song info
    const songInfo = document.createElement('div');
    songInfo.className = 'black-mode-song-info';
    songInfo.innerHTML = `
        <div class="black-mode-song-title" id="blackModeSongTitle">No song playing</div>
        <div class="black-mode-song-artist" id="blackModeSongArtist">Select a song</div>
    `;
    
    // Playback controls
    const controls = document.createElement('div');
    controls.className = 'black-mode-playback-controls';
    controls.innerHTML = `
        <button class="black-mode-btn" id="blackModePrevBtn" title="Previous">⏮</button>
        <button class="black-mode-btn black-mode-play-btn" id="blackModePlayBtn" title="Play/Pause">▶</button>
        <button class="black-mode-btn" id="blackModeNextBtn" title="Next">⏭</button>
    `;
    
    // Exit hint
    const hint = document.createElement('div');
    hint.className = 'black-mode-hint';
    hint.textContent = 'Press ESC to exit';
    
    // Append elements
    container.appendChild(songInfo);
    container.appendChild(controls);
    container.appendChild(hint);
    overlay.appendChild(container);
    
    // Add to body
    document.body.appendChild(overlay);
    
    // Setup control button listeners
    setupMinimalControlButtons();
}

/**
 * Setup minimal control buttons
 */
function setupMinimalControlButtons() {
    // Play/Pause button
    const playBtn = document.getElementById('blackModePlayBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            const mainPlayBtn = document.querySelector('.play-btn');
            if (mainPlayBtn) mainPlayBtn.click();
        });
    }
    
    // Previous button
    const prevBtn = document.getElementById('blackModePrevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const mainPrevBtn = document.getElementById('prevBtn');
            if (mainPrevBtn) mainPrevBtn.click();
        });
    }
    
    // Next button
    const nextBtn = document.getElementById('blackModeNextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const mainNextBtn = document.getElementById('nextBtn');
            if (mainNextBtn) mainNextBtn.click();
        });
    }
}

/**
 * Update minimal controls with current track info
 */
function updateBlackModeInfo(title, artist, isPlaying) {
    const titleEl = document.getElementById('blackModeSongTitle');
    const artistEl = document.getElementById('blackModeSongArtist');
    const playBtn = document.getElementById('blackModePlayBtn');
    
    if (titleEl) titleEl.textContent = title || 'No song playing';
    if (artistEl) artistEl.textContent = artist || 'Select a song';
    if (playBtn) playBtn.textContent = isPlaying ? '⏸' : '▶';
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlackScreenMode);
} else {
    initBlackScreenMode();
}

// Export functions to global scope
window.enterBlackMode = enterBlackMode;
window.exitBlackMode = exitBlackMode;
window.toggleBlackMode = toggleBlackMode;
window.updateBlackModeInfo = updateBlackModeInfo;

console.log('✅ [Black Screen Mode] Module Loaded');
