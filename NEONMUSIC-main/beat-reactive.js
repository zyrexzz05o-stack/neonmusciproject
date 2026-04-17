// ========================================
// BEAT REACTIVE MICRO MOTION
// Subtle audio-reactive animations
// ========================================

console.log('🎵 [Beat Reactive] Module Loading...');

// Audio context and analyzer
let audioContext = null;
let analyser = null;
let dataArray = null;
let bufferLength = 0;
let source = null;
let isInitialized = false;
let isActive = false;
let animationFrameId = null;

// Target elements
let backgroundShapes = null;
let songTitle = null;

// Energy smoothing
let smoothedEnergy = 0;
const SMOOTHING_FACTOR = 0.15;

/**
 * Initialize Web Audio API
 */
function initAudioContext(videoElement) {
    if (isInitialized) {
        console.log('⚠️ Audio context already initialized');
        return;
    }
    
    try {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create analyser
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Small FFT for performance
        analyser.smoothingTimeConstant = 0.8; // Smooth transitions
        
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        // Create source from video element
        source = audioContext.createMediaElementSource(videoElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        isInitialized = true;
        console.log('✅ Audio context initialized');
        
    } catch (error) {
        console.error('❌ Failed to initialize audio context:', error);
    }
}

/**
 * Get audio energy (focus on low-mid frequencies)
 */
function getAudioEnergy() {
    if (!analyser || !dataArray) return 0;
    
    analyser.getByteFrequencyData(dataArray);
    
    // Focus on low-mid range (bass and mids)
    // Skip very low (0-2) and very high frequencies
    const startIndex = 2;
    const endIndex = Math.floor(bufferLength * 0.4); // First 40% of spectrum
    
    let sum = 0;
    let count = 0;
    
    for (let i = startIndex; i < endIndex; i++) {
        sum += dataArray[i];
        count++;
    }
    
    // Normalize to 0-1 range
    const average = count > 0 ? sum / count : 0;
    const normalized = average / 255;
    
    // Apply smoothing
    smoothedEnergy += (normalized - smoothedEnergy) * SMOOTHING_FACTOR;
    
    return smoothedEnergy;
}

/**
 * Apply micro motion to elements
 */
function applyMicroMotion() {
    if (!isActive || document.hidden) {
        return;
    }
    
    const energy = getAudioEnergy();
    
    // Map energy to subtle scale (1.00 to 1.03)
    const scale = 1.0 + (energy * 0.03);
    
    // Map energy to subtle opacity (0.85 to 1.0)
    const opacity = 0.85 + (energy * 0.15);
    
    // Map energy to subtle glow
    const glowIntensity = energy * 8; // Max 8px blur
    const glowOpacity = energy * 0.3; // Max 0.3 opacity
    
    // Apply to background shapes
    if (backgroundShapes) {
        backgroundShapes.forEach(shape => {
            shape.style.transform = `scale(${scale})`;
            shape.style.opacity = opacity;
        });
    }
    
    // Apply subtle glow to song title
    if (songTitle) {
        const glow = `0 0 ${glowIntensity}px rgba(255, 255, 255, ${glowOpacity})`;
        songTitle.style.textShadow = glow;
    }
    
    // Continue animation loop
    animationFrameId = requestAnimationFrame(applyMicroMotion);
}

/**
 * Start beat reactive motion
 */
function startBeatReactive(videoElement) {
    if (!videoElement) {
        console.error('❌ Video element not provided');
        return;
    }
    
    console.log('🎵 Starting beat reactive motion...');
    
    // Initialize audio context if needed
    if (!isInitialized) {
        initAudioContext(videoElement);
    }
    
    // Resume audio context if suspended
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    // Get target elements
    backgroundShapes = document.querySelectorAll('.circle, .triangle, .square, .hexagon');
    songTitle = document.querySelector('.now-playing-text h2');
    
    // Add will-change for performance
    if (backgroundShapes) {
        backgroundShapes.forEach(shape => {
            shape.style.willChange = 'transform, opacity';
            shape.style.transition = 'transform 0.15s linear, opacity 0.15s linear';
        });
    }
    
    if (songTitle) {
        songTitle.style.willChange = 'text-shadow';
        songTitle.style.transition = 'text-shadow 0.15s linear';
    }
    
    // Start animation loop
    isActive = true;
    applyMicroMotion();
    
    console.log('✅ Beat reactive motion started');
}

/**
 * Stop beat reactive motion
 */
function stopBeatReactive() {
    console.log('🎵 Stopping beat reactive motion...');
    
    isActive = false;
    
    // Cancel animation frame
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    // Reset elements to default state (smooth transition back)
    if (backgroundShapes) {
        backgroundShapes.forEach(shape => {
            shape.style.transform = 'scale(1)';
            shape.style.opacity = ''; // Back to CSS default
            // Keep transition for smooth reset
            setTimeout(() => {
                shape.style.willChange = '';
                shape.style.transition = '';
            }, 200); // After transition completes
        });
    }
    
    if (songTitle) {
        songTitle.style.textShadow = '';
        // Keep transition for smooth reset
        setTimeout(() => {
            songTitle.style.willChange = '';
            songTitle.style.transition = '';
        }, 200); // After transition completes
    }
    
    // Reset smoothed energy
    smoothedEnergy = 0;
    
    console.log('✅ Beat reactive motion stopped');
}

/**
 * Pause beat reactive (when tab hidden)
 */
function pauseBeatReactive() {
    if (isActive) {
        console.log('⏸️ Beat reactive paused (tab hidden)');
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
}

/**
 * Resume beat reactive (when tab visible)
 */
function resumeBeatReactive() {
    if (isActive && !animationFrameId) {
        console.log('▶️ Beat reactive resumed (tab visible)');
        applyMicroMotion();
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseBeatReactive();
    } else {
        resumeBeatReactive();
    }
});

// Export functions to global scope
window.startBeatReactive = startBeatReactive;
window.stopBeatReactive = stopBeatReactive;

console.log('✅ [Beat Reactive] Module Loaded');
