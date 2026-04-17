// ========================================
// LISTENING RITUAL MODE
// Cinematic experience when clicking a song
// ========================================

console.log('🎭 [Listening Ritual] Module Loading...');

// Ritual state
let isRitualActive = false;
let ritualCallback = null;

/**
 * Start the listening ritual
 * @param {string} songTitle - Title of the song
 * @param {string} artistName - Name of the artist
 * @param {function} onComplete - Callback to execute after ritual
 */
function startListeningRitual(songTitle, artistName, onComplete) {
    if (isRitualActive) {
        console.log('⚠️ Ritual already active, skipping');
        return;
    }
    
    console.log('🎭 Starting Listening Ritual:', songTitle, '-', artistName);
    
    isRitualActive = true;
    ritualCallback = onComplete;
    
    const overlay = document.getElementById('ritual-overlay');
    const titleEl = overlay.querySelector('.ritual-song-title');
    const artistEl = overlay.querySelector('.ritual-artist-name');
    
    // Set content
    titleEl.textContent = songTitle;
    artistEl.textContent = artistName;
    
    // Step 1: Fade to black & hide UI
    document.body.classList.add('ritual-active');
    overlay.classList.add('active');
    
    // Step 2-4: Hold for 1 second (0.6s fade in + 0.4s hold)
    setTimeout(() => {
        // Step 5: Start playback
        if (ritualCallback) {
            console.log('🎵 Starting playback...');
            ritualCallback();
        }
        
        // Step 6: Fade out ritual overlay (after 0.5s)
        setTimeout(() => {
            endListeningRitual();
        }, 500);
        
    }, 1000); // 0.6s fade + 0.4s hold
}

/**
 * End the listening ritual
 */
function endListeningRitual() {
    console.log('🎭 Ending Listening Ritual');
    
    const overlay = document.getElementById('ritual-overlay');
    
    // Fade out overlay
    overlay.classList.remove('active');
    
    // Wait for fade out, then restore UI
    setTimeout(() => {
        document.body.classList.remove('ritual-active');
        isRitualActive = false;
        ritualCallback = null;
        console.log('✅ Ritual complete');
    }, 600); // Match CSS transition duration
}

/**
 * Check if ritual is currently active
 */
function isRitualRunning() {
    return isRitualActive;
}

// Export functions to global scope
window.startListeningRitual = startListeningRitual;
window.endListeningRitual = endListeningRitual;
window.isRitualRunning = isRitualRunning;

console.log('✅ [Listening Ritual] Module Loaded');
