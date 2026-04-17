// ========================================
// NEONWAVE UNIQUE FEATURES
// ========================================

// ========================================
// 1. LYRICS FOCUS MODE
// ========================================

function initLyricsFocusMode() {
    const lyricsFocusBtn = document.getElementById('lyricsFocusBtn');
    const lyricsFocusMode = document.getElementById('lyricsFocusMode');
    const lyricsFocusExit = document.getElementById('lyricsFocusExit');
    
    if (lyricsFocusBtn) {
        lyricsFocusBtn.addEventListener('click', () => {
            lyricsFocusMode.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (lyricsFocusExit) {
        lyricsFocusExit.addEventListener('click', () => {
            lyricsFocusMode.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Click on lyric line to seek
    const lyricsLines = document.querySelectorAll('.lyrics-line');
    lyricsLines.forEach(line => {
        line.addEventListener('click', () => {
            const time = parseFloat(line.getAttribute('data-time'));
            if (!isNaN(time) && videoPlayer) {
                videoPlayer.currentTime = time;
            }
        });
    });
}

// ========================================
// 2. WAVE PROGRESS VISUAL
// ========================================

function initWaveProgress() {
    const waveContainer = document.getElementById('waveProgressContainer');
    if (!waveContainer) return;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('wave-progress-svg');
    svg.setAttribute('viewBox', '0 0 1000 60');
    svg.setAttribute('preserveAspectRatio', 'none');
    
    // Background wave
    const wavePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    wavePath.classList.add('wave-path');
    const waveData = generateWaveData(1000, 60);
    wavePath.setAttribute('d', waveData);
    
    // Active wave
    const wavePathActive = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    wavePathActive.classList.add('wave-path-active');
    wavePathActive.setAttribute('d', waveData);
    
    svg.appendChild(wavePath);
    svg.appendChild(wavePathActive);
    
    const waveBg = waveContainer.querySelector('.wave-progress-bg');
    waveBg.appendChild(svg);
    
    // Update progress
    if (videoPlayer) {
        videoPlayer.addEventListener('timeupdate', () => {
            if (videoPlayer.duration) {
                const progress = (videoPlayer.currentTime / videoPlayer.duration);
                const dashLength = 1000;
                const offset = dashLength - (dashLength * progress);
                wavePathActive.style.strokeDashoffset = offset;
            }
        });
    }
    
    // Click to seek
    waveContainer.addEventListener('click', (e) => {
        const rect = waveContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        if (videoPlayer && videoPlayer.duration) {
            videoPlayer.currentTime = percent * videoPlayer.duration;
        }
    });
}

function generateWaveData(width, height) {
    const amplitude = height / 3;
    const frequency = 0.02;
    const centerY = height / 2;
    
    let path = `M 0 ${centerY}`;
    
    for (let x = 0; x <= width; x += 10) {
        const y = centerY + Math.sin(x * frequency) * amplitude;
        path += ` L ${x} ${y}`;
    }
    
    return path;
}

// ========================================
// 3. MOOD-BASED LISTENING
// ========================================

function initMoodSelector() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            moodBtns.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            
            // Get mood
            const mood = btn.getAttribute('data-mood');
            
            // Remove all mood classes
            document.body.classList.remove('mood-focus', 'mood-chill', 'mood-night');
            
            // Add selected mood
            if (mood) {
                document.body.classList.add(`mood-${mood}`);
            }
            
            console.log(`🎵 Mood changed to: ${mood}`);
        });
    });
}

// ========================================
// 4. MINIMAL DISTRACTION MODE
// ========================================

function initMinimalMode() {
    const minimalBtn = document.getElementById('minimalModeBtn');
    const minimalMode = document.getElementById('minimalMode');
    const minimalExit = document.getElementById('minimalExit');
    
    if (minimalBtn) {
        minimalBtn.addEventListener('click', () => {
            minimalMode.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateMinimalMode();
        });
    }
    
    if (minimalExit) {
        minimalExit.addEventListener('click', () => {
            minimalMode.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Update minimal mode info
    function updateMinimalMode() {
        const title = document.querySelector('.now-playing-text h2');
        const artist = document.querySelector('.now-playing-text p');
        const albumImg = document.querySelector('.now-playing-image img');
        
        const minimalTitle = document.getElementById('minimalTitle');
        const minimalArtist = document.getElementById('minimalArtist');
        const minimalAlbumImg = document.getElementById('minimalAlbumImg');
        
        if (title && minimalTitle) minimalTitle.textContent = title.textContent;
        if (artist && minimalArtist) minimalArtist.textContent = artist.textContent;
        if (albumImg && minimalAlbumImg) minimalAlbumImg.src = albumImg.src;
    }
    
    // Sync progress
    if (videoPlayer) {
        videoPlayer.addEventListener('timeupdate', () => {
            const minimalFill = document.getElementById('minimalProgressFill');
            const minimalCurrent = document.getElementById('minimalCurrentTime');
            const minimalDuration = document.getElementById('minimalDuration');
            
            if (videoPlayer.duration && minimalFill) {
                const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
                minimalFill.style.width = `${progress}%`;
                
                if (minimalCurrent) {
                    minimalCurrent.textContent = formatTime(videoPlayer.currentTime);
                }
                if (minimalDuration) {
                    minimalDuration.textContent = formatTime(videoPlayer.duration);
                }
            }
        });
    }
}

// ========================================
// 5. FOCUS TIMER
// ========================================

let focusTimerInterval = null;
let focusTimeRemaining = 0;

function initFocusTimer() {
    const focusTimerBtn = document.getElementById('focusTimerBtn');
    const focusTimer = document.getElementById('focusTimer');
    const focusTimerDisplay = document.getElementById('focusTimerDisplay');
    const focusStartBtn = document.getElementById('focusStartBtn');
    const focusResetBtn = document.getElementById('focusResetBtn');
    
    if (focusTimerBtn) {
        focusTimerBtn.addEventListener('click', () => {
            focusTimer.classList.toggle('active');
        });
    }
    
    if (focusStartBtn) {
        focusStartBtn.addEventListener('click', () => {
            if (focusTimerInterval) {
                // Pause
                clearInterval(focusTimerInterval);
                focusTimerInterval = null;
                focusStartBtn.textContent = 'Start';
            } else {
                // Start
                if (focusTimeRemaining === 0) {
                    focusTimeRemaining = 25 * 60; // 25 minutes
                }
                focusTimerInterval = setInterval(updateFocusTimer, 1000);
                focusStartBtn.textContent = 'Pause';
            }
        });
    }
    
    if (focusResetBtn) {
        focusResetBtn.addEventListener('click', () => {
            clearInterval(focusTimerInterval);
            focusTimerInterval = null;
            focusTimeRemaining = 0;
            focusTimerDisplay.textContent = '25:00';
            focusStartBtn.textContent = 'Start';
        });
    }
    
    function updateFocusTimer() {
        if (focusTimeRemaining > 0) {
            focusTimeRemaining--;
            const minutes = Math.floor(focusTimeRemaining / 60);
            const seconds = focusTimeRemaining % 60;
            focusTimerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            clearInterval(focusTimerInterval);
            focusTimerInterval = null;
            focusStartBtn.textContent = 'Start';
            // Notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Focus Session Complete! 🎵', {
                    body: 'Time for a break.',
                    icon: '/images/logo.png'
                });
            }
        }
    }
}

// ========================================
// 6. QUICK ACTIONS
// ========================================

function initQuickActions() {
    const quickActions = document.querySelectorAll('.quick-action-btn');
    
    quickActions.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            
            switch(action) {
                case 'lyrics':
                    document.getElementById('lyricsFocusBtn')?.click();
                    break;
                case 'minimal':
                    document.getElementById('minimalModeBtn')?.click();
                    break;
                case 'timer':
                    document.getElementById('focusTimerBtn')?.click();
                    break;
                case 'shuffle':
                    // Toggle shuffle
                    btn.classList.toggle('active');
                    break;
            }
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // L - Lyrics Focus Mode
        if (e.key === 'l' && !e.ctrlKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                document.getElementById('lyricsFocusBtn')?.click();
            }
        }
        
        // M - Minimal Mode
        if (e.key === 'm' && !e.ctrlKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                document.getElementById('minimalModeBtn')?.click();
            }
        }
        
        // Escape - Exit any mode
        if (e.key === 'Escape') {
            document.getElementById('lyricsFocusExit')?.click();
            document.getElementById('minimalExit')?.click();
        }
    });
}

// ========================================
// INITIALIZE ALL FEATURES
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Initializing NeonWave Features...');
    
    initLyricsFocusMode();
    initWaveProgress();
    initMoodSelector();
    initMinimalMode();
    initFocusTimer();
    initQuickActions();
    initKeyboardShortcuts();
    
    console.log('✅ NeonWave Features Ready!');
    
    // Request notification permission for focus timer
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

console.log('🎵 NeonWave Features Module Loaded');
