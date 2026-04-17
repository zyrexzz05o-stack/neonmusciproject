// ========================================
// SEAMLESS TRACK TRANSITION
// Cinematic transitions between tracks
// ========================================

console.log('🎬 [Track Transition] Module Loading...');

// Transition state
let isTransitioning = false;
let transitionTimeout = null;

/**
 * Perform seamless track transition
 * @param {Function} callback - Function to execute during transition (load new track)
 */
function performTrackTransition(callback) {
    if (isTransitioning) {
        console.log('⚠️ Transition already in progress, skipping...');
        return;
    }
    
    isTransitioning = true;
    console.log('🎬 Starting track transition...');
    
    // Get elements
    const albumHighlight = document.getElementById('albumHighlight');
    const nowPlayingText = document.querySelector('.now-playing-text');
    const videoContainer = document.getElementById('videoContainer');
    const nowPlayingImage = document.getElementById('nowPlayingImage');
    const lyricsBox = document.getElementById('lyricsBox');
    
    // Phase 1: Fade out current track (400ms)
    fadeOutTrack(albumHighlight, nowPlayingText, videoContainer, nowPlayingImage, lyricsBox);
    
    // Phase 2: Background micro shift (starts at 200ms, peaks at 400ms)
    setTimeout(() => {
        backgroundMicroShift(albumHighlight);
    }, 200);
    
    // Phase 3: Load new track (at 400ms)
    setTimeout(() => {
        if (callback && typeof callback === 'function') {
            callback();
        }
    }, 400);
    
    // Phase 4: Fade in new track (starts at 500ms, completes at 1000ms)
    setTimeout(() => {
        fadeInTrack(albumHighlight, nowPlayingText, videoContainer, nowPlayingImage, lyricsBox);
    }, 500);
    
    // Phase 5: Reset transition state (at 1100ms)
    transitionTimeout = setTimeout(() => {
        isTransitioning = false;
        console.log('✅ Track transition complete');
    }, 1100);
}

/**
 * Fade out current track elements
 */
function fadeOutTrack(albumHighlight, nowPlayingText, videoContainer, nowPlayingImage, lyricsBox) {
    // Album highlight - subtle opacity drop
    if (albumHighlight) {
        albumHighlight.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        albumHighlight.style.opacity = '0.3';
    }
    
    // Now playing text - fade out
    if (nowPlayingText) {
        nowPlayingText.style.transition = 'opacity 0.4s ease-out';
        nowPlayingText.style.opacity = '0.4';
    }
    
    // Video/Image - fade out
    if (videoContainer) {
        videoContainer.style.transition = 'opacity 0.4s ease-out';
        videoContainer.style.opacity = '0.3';
    }
    if (nowPlayingImage) {
        nowPlayingImage.style.transition = 'opacity 0.4s ease-out';
        nowPlayingImage.style.opacity = '0.3';
    }
    
    // Lyrics box - fade out
    if (lyricsBox) {
        lyricsBox.style.transition = 'opacity 0.4s ease-out';
        lyricsBox.style.opacity = '0.3';
    }
}

/**
 * Background micro shift animation
 */
function backgroundMicroShift(albumHighlight) {
    if (!albumHighlight) return;
    
    // Scale up slightly (1 → 1.02)
    albumHighlight.style.transition = 'transform 0.3s ease-in-out';
    albumHighlight.style.transform = 'scale(1.02)';
    
    // Scale back to normal (1.02 → 1)
    setTimeout(() => {
        albumHighlight.style.transform = 'scale(1)';
    }, 300);
}

/**
 * Fade in new track elements
 */
function fadeInTrack(albumHighlight, nowPlayingText, videoContainer, nowPlayingImage, lyricsBox) {
    // Album highlight - fade in
    if (albumHighlight) {
        albumHighlight.style.transition = 'opacity 0.5s ease-in';
        albumHighlight.style.opacity = '1';
    }
    
    // Now playing text - fade in
    if (nowPlayingText) {
        nowPlayingText.style.transition = 'opacity 0.5s ease-in';
        nowPlayingText.style.opacity = '1';
    }
    
    // Video/Image - fade in
    if (videoContainer) {
        videoContainer.style.transition = 'opacity 0.5s ease-in';
        videoContainer.style.opacity = '1';
    }
    if (nowPlayingImage) {
        nowPlayingImage.style.transition = 'opacity 0.5s ease-in';
        nowPlayingImage.style.opacity = '1';
    }
    
    // Lyrics box - fade in
    if (lyricsBox) {
        lyricsBox.style.transition = 'opacity 0.5s ease-in';
        lyricsBox.style.opacity = '1';
    }
}

/**
 * Quick transition for same track (play/pause toggle)
 * No transition needed, just instant
 */
function isPlayPauseToggle(currentTrack, newTrack) {
    return currentTrack === newTrack && newTrack !== '';
}

/**
 * Cleanup transition
 */
function cleanupTransition() {
    if (transitionTimeout) {
        clearTimeout(transitionTimeout);
        transitionTimeout = null;
    }
    isTransitioning = false;
}

/**
 * Initialize track transition system
 */
function initTrackTransition() {
    console.log('🎬 Initializing Track Transition System...');
    
    // Ensure all elements have initial opacity
    const elements = [
        document.getElementById('albumHighlight'),
        document.querySelector('.now-playing-text'),
        document.getElementById('videoContainer'),
        document.getElementById('nowPlayingImage'),
        document.getElementById('lyricsBox')
    ];
    
    elements.forEach(el => {
        if (el) {
            el.style.opacity = '1';
        }
    });
    
    console.log('✅ Track Transition System initialized');
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrackTransition);
} else {
    initTrackTransition();
}

// Export functions to global scope
window.performTrackTransition = performTrackTransition;
window.isPlayPauseToggle = isPlayPauseToggle;
window.cleanupTransition = cleanupTransition;

console.log('✅ [Track Transition] Module Loaded');
