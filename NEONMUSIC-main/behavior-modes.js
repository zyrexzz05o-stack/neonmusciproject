// ========================================
// BEHAVIOR MODES (Prompt #5)
// Changes HOW people experience music
// ========================================

console.log('🎵 [Behavior Modes] Module Loading...');

// ========================================
// 1. WAVE PROGRESS BEHAVIOR (DISABLED - using standard bar)
// ========================================

function initWaveProgress() {
    // Wave progress disabled, using standard progress bar instead
    console.log('⚠️ Wave progress disabled - using standard bar');
}

// ========================================
// 2. MOOD SELECTOR BEHAVIOR - CINEMATIC UPGRADE
// ========================================

function initMoodSelector() {
    const videoPlayer = document.getElementById('videoPlayer');
    const moodSelector = document.getElementById('moodSelector');
    const moodBtns = document.querySelectorAll('.mood-btn');
    
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.getAttribute('data-mood');
            
            // Remove all mood classes
            document.body.classList.remove('mood-focus', 'mood-chill', 'mood-night');
            moodBtns.forEach(b => b.classList.remove('active'));
            
            // Add new mood class
            if (mood) {
                document.body.classList.add(`mood-${mood}`);
                btn.classList.add('active');
                
                // Trigger cinematic transition
                triggerMoodTransition(mood);
            }
            
            console.log(`🎭 Mood: ${mood}`);
        });
    });
    
    console.log('✅ Mood selector initialized (Cinematic)');
}

// Cinematic mood transition effects
function triggerMoodTransition(mood) {
    // Add transition class to body
    document.body.style.transition = 'background 0.8s ease, filter 0.8s ease';
    
    // Adjust background shapes animation speed based on mood
    const shapes = document.querySelectorAll('.bg-shapes .circle, .bg-shapes .square');
    shapes.forEach(shape => {
        if (mood === 'focus') {
            shape.style.animationDuration = '35s';
        } else if (mood === 'chill') {
            shape.style.animationDuration = '45s';
        } else if (mood === 'night') {
            shape.style.animationDuration = '55s';
        }
    });
    
    // Subtle flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.background = 'rgba(255, 255, 255, 0.03)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9999';
    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.8s ease';
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            flash.remove();
        }, 800);
    }, 50);
    
    // Adjust grain texture opacity
    const bodyAfter = document.body;
    if (mood === 'focus') {
        bodyAfter.style.setProperty('--grain-opacity', '0.6');
    } else if (mood === 'chill') {
        bodyAfter.style.setProperty('--grain-opacity', '0.5');
    } else if (mood === 'night') {
        bodyAfter.style.setProperty('--grain-opacity', '0.7');
    }
}

// ========================================
// 3. LYRICS FOCUS MODE - DISABLED
// ========================================

// DISABLED: Lyrics Focus Mode (Karaoke) has been removed
function initLyricsFocusMode() {
    console.log('🎤 Lyrics Focus Mode: DISABLED');
    // Feature disabled by user request
}

function updateLyricsFocus() {
    // Feature disabled
}

// ========================================
// 4. MINIMAL MODE
// ========================================

function initMinimalMode() {
    const btn = document.getElementById('minimalModeBtn');
    const overlay = document.getElementById('minimalModeOverlay');
    const exitBtn = document.getElementById('exitMinimalMode');
    
    console.log('◻️ Minimal Mode:', { btn: !!btn, overlay: !!overlay });
    
    if (btn && overlay) {
        btn.addEventListener('click', () => {
            console.log('◻️ Button clicked!');
            
            // Toggle: If already active, close it
            if (overlay.classList.contains('active')) {
                console.log('◻️ Closing Minimal Mode');
                overlay.classList.remove('active');
                btn.classList.remove('active');
                document.body.style.overflow = '';
                return;
            }
            
            console.log('◻️ Opening Minimal Mode');
            
            // Close lyrics focus if open
            const lyricsOverlay = document.getElementById('lyricsFocusOverlay');
            const lyricsBtn = document.getElementById('lyricsFocusBtn');
            if (lyricsOverlay && lyricsOverlay.classList.contains('active')) {
                lyricsOverlay.classList.remove('active');
                if (lyricsBtn) lyricsBtn.classList.remove('active');
            }
            
            // Open minimal mode
            overlay.classList.add('active');
            btn.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateMinimalMode();
        });
    }
    
    if (exitBtn && overlay) {
        exitBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            if (btn) btn.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Sync controls
    const playBtn = document.getElementById('minimalPlayBtn');
    const prevBtn = document.getElementById('minimalPrevBtn');
    const nextBtn = document.getElementById('minimalNextBtn');
    
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            document.querySelector('.play-btn')?.click();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            document.getElementById('prevBtn')?.click();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            document.getElementById('nextBtn')?.click();
        });
    }
}

function updateMinimalMode() {
    const title = document.getElementById('minimalSongTitle');
    const artist = document.getElementById('minimalSongArtist');
    const img = document.getElementById('minimalAlbumImg');
    const nowTitle = document.querySelector('.now-playing-text h2');
    const nowArtist = document.querySelector('.now-playing-text p');
    const nowImg = document.querySelector('.now-playing-image img');
    
    if (nowTitle && title) title.textContent = nowTitle.textContent;
    if (nowArtist && artist) artist.textContent = nowArtist.textContent;
    if (nowImg && img) img.src = nowImg.src;
}

// ========================================
// 5. KEYBOARD SHORTCUTS
// ========================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const isInput = document.activeElement.tagName === 'INPUT';
        if (isInput) return;
        
        // L - Lyrics Focus Mode - DISABLED
        // if (e.key === 'l' || e.key === 'L') {
        //     e.preventDefault();
        //     document.getElementById('lyricsFocusBtn')?.click();
        // }
        
        if (e.key === 'm' || e.key === 'M') {
            e.preventDefault();
            document.getElementById('minimalModeBtn')?.click();
        }
        
        if (e.key === 'Escape') {
            // document.getElementById('exitLyricsFocus')?.click(); // DISABLED
            document.getElementById('exitMinimalMode')?.click();
        }
        
        if (e.key === '1') {
            e.preventDefault();
            const btn = document.querySelector('[data-mood="chill"]');
            console.log('🔢 Key 1 pressed, button found:', !!btn);
            if (btn) btn.click();
        }
        if (e.key === '2') {
            e.preventDefault();
            const btn = document.querySelector('[data-mood="focus"]');
            console.log('🔢 Key 2 pressed, button found:', !!btn);
            if (btn) btn.click();
        }
        if (e.key === '3') {
            e.preventDefault();
            const btn = document.querySelector('[data-mood="night"]');
            console.log('🔢 Key 3 pressed, button found:', !!btn);
            if (btn) btn.click();
        }
    });
    
    console.log('✅ Keyboard shortcuts initialized (Lyrics Focus disabled)');
    console.log('🔍 Mood buttons found:', document.querySelectorAll('[data-mood]').length);
}

// ========================================
// 6. AUTO-HIDE BEHAVIOR
// ========================================

function initAutoHide() {
    const videoPlayer = document.getElementById('videoPlayer');
    let hideTimeout;
    
    document.addEventListener('mousemove', () => {
        document.body.classList.remove('focus-mode');
        clearTimeout(hideTimeout);
        
        if (videoPlayer && !videoPlayer.paused) {
            hideTimeout = setTimeout(() => {
                document.body.classList.add('focus-mode');
            }, 3000);
        }
    });
    
    console.log('✅ Auto-hide initialized');
}

// ========================================
// INITIALIZE ALL
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 [Behavior Modes] Initializing...');
    
    setTimeout(() => {
        initWaveProgress();
        initMoodSelector();
        initLyricsFocusMode();
        initMinimalMode();
        initKeyboardShortcuts();
        initAutoHide();
        
        document.body.classList.add('mood-chill');
        
        console.log('✅ [Behavior Modes] All modes ready!');
        console.log('📝 Shortcuts: M (Minimal), 1/2/3 (Moods), Esc (Exit) - Lyrics Focus disabled');
    }, 500);
});

console.log('🎵 [Behavior Modes] Module Loaded');
