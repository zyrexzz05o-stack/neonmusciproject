/* ========================================
   NOW PLAYING POPUP - JAVASCRIPT
   Always visible during playback
   ======================================== */

class MusicPopupNotification {
    constructor() {
        this.container = null;
        this.isShowing = false;
        this.isDraggingProgress = false;
        this.isDraggingPopup = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.init();
    }

    init() {
        // Create popup container
        this.container = document.createElement('div');
        this.container.className = 'music-popup-notification';
        this.container.innerHTML = `
            <div class="music-popup-card">
                <div class="music-popup-content">
                    <div class="music-popup-top">
                        <div class="music-popup-cover">
                            <img src="" alt="Album Cover" id="popupCoverImg">
                        </div>
                        <div class="music-popup-info">
                            <div class="music-popup-label">NOW PLAYING</div>
                            <div class="music-popup-title" id="popupTitle">Song Title</div>
                            <div class="music-popup-artist" id="popupArtist">Artist Name</div>
                        </div>
                    </div>
                    
                    <div class="music-popup-controls">
                        <button class="music-popup-control-btn prev-btn" id="popupPrevBtn" aria-label="Previous">
                            <svg viewBox="0 0 24 24">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                            </svg>
                        </button>
                        <button class="music-popup-control-btn play-btn" id="popupPlayBtn" aria-label="Play/Pause">
                            <svg viewBox="0 0 24 24" id="popupPlayIcon">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <svg viewBox="0 0 24 24" id="popupPauseIcon" style="display: none;">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
                            </svg>
                        </button>
                        <button class="music-popup-control-btn next-btn" id="popupNextBtn" aria-label="Next">
                            <svg viewBox="0 0 24 24">
                                <path d="M16 18h2V6h-2zm-11-7l8.5-6v12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="music-popup-progress-section">
                        <div class="music-popup-time">
                            <span id="popupCurrentTime">0:00</span>
                            <span id="popupDuration">0:00</span>
                        </div>
                        <div class="music-popup-progress" id="popupProgressBar">
                            <div class="music-popup-progress-fill" id="popupProgressFill"></div>
                        </div>
                    </div>
                </div>
                <button class="music-popup-close" id="popupCloseBtn" aria-label="Close"></button>
            </div>
        `;

        // Append to body
        document.body.appendChild(this.container);

        // Setup event listeners
        this.setupEventListeners();
        this.setupDragListeners();

        console.log('✅ Now Playing Popup initialized');
    }

    setupDragListeners() {
        const card = this.container.querySelector('.music-popup-card');

        // Mouse events
        card.addEventListener('mousedown', (e) => this.dragStart(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.dragEnd());

        // Touch events
        card.addEventListener('touchstart', (e) => this.dragStart(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        document.addEventListener('touchend', () => this.dragEnd());
    }

    dragStart(e) {
        // Don't drag if clicking on buttons or progress bar
        if (e.target.closest('button') || e.target.closest('.music-popup-progress')) {
            return;
        }

        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        this.isDraggingPopup = true;
        this.container.classList.add('dragging');
    }

    drag(e) {
        if (this.isDraggingPopup) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.setTranslate(this.currentX, this.currentY);
        }
    }

    dragEnd() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.isDraggingPopup = false;
        this.container.classList.remove('dragging');
    }

    setTranslate(xPos, yPos) {
        this.container.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    setupEventListeners() {
        // Close button
        const closeBtn = this.container.querySelector('#popupCloseBtn');
        closeBtn.addEventListener('click', () => this.hide());

        // Play/Pause button
        const playBtn = this.container.querySelector('#popupPlayBtn');
        playBtn.addEventListener('click', () => this.togglePlayPause());

        // Previous button
        const prevBtn = this.container.querySelector('#popupPrevBtn');
        prevBtn.addEventListener('click', () => this.playPrevious());

        // Next button
        const nextBtn = this.container.querySelector('#popupNextBtn');
        nextBtn.addEventListener('click', () => this.playNext());

        // Progress bar - click to seek
        const progressBar = this.container.querySelector('#popupProgressBar');
        progressBar.addEventListener('click', (e) => this.seekTo(e));

        // Progress bar - drag to seek
        progressBar.addEventListener('mousedown', (e) => {
            this.isDraggingProgress = true;
            this.seekTo(e);
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDraggingProgress) {
                this.seekTo(e);
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDraggingProgress = false;
        });

        // Sync with video player
        this.syncWithPlayer();
    }

    togglePlayPause() {
        const videoPlayer = document.getElementById('videoPlayer');
        const playBtn = document.querySelector('.play-btn');
        
        if (videoPlayer) {
            if (videoPlayer.paused) {
                videoPlayer.play();
                this.updatePlayPauseIcon(false);
                if (playBtn) playBtn.textContent = '⏸';
                console.log('▶️ Playing from popup');
            } else {
                videoPlayer.pause();
                this.updatePlayPauseIcon(true);
                if (playBtn) playBtn.textContent = '▶';
                console.log('⏸ Paused from popup');
            }
        }
    }

    playPrevious() {
        if (typeof window.playPreviousTrack === 'function') {
            window.playPreviousTrack();
            console.log('⏮ Previous track from popup');
        } else {
            console.warn('⚠️ Previous track function not found');
        }
    }

    playNext() {
        if (typeof window.playNextTrack === 'function') {
            window.playNextTrack();
            console.log('⏭ Next track from popup');
        } else {
            console.warn('⚠️ Next track function not found');
        }
    }

    updatePlayPauseIcon(isPlaying) {
        const playIcon = this.container.querySelector('#popupPlayIcon');
        const pauseIcon = this.container.querySelector('#popupPauseIcon');
        
        if (isPlaying) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
    }

    seekTo(e) {
        const progressBar = this.container.querySelector('#popupProgressBar');
        const videoPlayer = document.getElementById('videoPlayer');
        
        if (!videoPlayer || !videoPlayer.duration) return;

        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const seekTime = pos * videoPlayer.duration;
        
        videoPlayer.currentTime = Math.max(0, Math.min(seekTime, videoPlayer.duration));
        
        console.log('⏩ Seeked to:', this.formatTime(seekTime));
    }

    syncWithPlayer() {
        const videoPlayer = document.getElementById('videoPlayer');
        
        if (!videoPlayer) {
            console.warn('⚠️ Video player not found');
            return;
        }

        // Update progress and time
        videoPlayer.addEventListener('timeupdate', () => {
            if (!this.isDraggingProgress) {
                this.updateProgress();
            }
        });

        // Update play/pause state
        videoPlayer.addEventListener('play', () => {
            this.updatePlayPauseIcon(false);
        });

        videoPlayer.addEventListener('pause', () => {
            this.updatePlayPauseIcon(true);
        });

        // Update duration when loaded
        videoPlayer.addEventListener('loadedmetadata', () => {
            this.updateDuration();
        });

        // Auto-hide when video ends
        videoPlayer.addEventListener('ended', () => {
            this.updatePlayPauseIcon(true);
        });

        console.log('✅ Synced with video player');
    }

    updateProgress() {
        const videoPlayer = document.getElementById('videoPlayer');
        const progressFill = this.container.querySelector('#popupProgressFill');
        const currentTimeEl = this.container.querySelector('#popupCurrentTime');
        
        if (!videoPlayer || !videoPlayer.duration) return;

        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressFill.style.width = progress + '%';
        
        currentTimeEl.textContent = this.formatTime(videoPlayer.currentTime);
    }

    updateDuration() {
        const videoPlayer = document.getElementById('videoPlayer');
        const durationEl = this.container.querySelector('#popupDuration');
        
        if (!videoPlayer || !videoPlayer.duration) return;

        durationEl.textContent = this.formatTime(videoPlayer.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Show popup - stays visible during playback
     * @param {string} title - Song title
     * @param {string} artist - Artist name
     * @param {string} cover - Cover image URL
     */
    show(title, artist, cover) {
        // Update content
        const coverImg = this.container.querySelector('#popupCoverImg');
        const titleEl = this.container.querySelector('#popupTitle');
        const artistEl = this.container.querySelector('#popupArtist');

        if (cover) coverImg.src = cover;
        if (title) titleEl.textContent = title;
        if (artist) artistEl.textContent = artist;

        // Sync play state
        const videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer) {
            this.updatePlayPauseIcon(videoPlayer.paused);
            this.updateDuration();
            this.updateProgress();
        }

        // Show with animation (preserve drag position)
        setTimeout(() => {
            this.container.classList.add('show');
            this.container.classList.remove('hide');
            this.isShowing = true;
            
            // Restore drag position if exists
            if (this.xOffset !== 0 || this.yOffset !== 0) {
                this.setTranslate(this.xOffset, this.yOffset);
            }
            
            console.log('🎵 Now Playing popup shown:', title);
        }, 100);
    }

    hide() {
        this.container.classList.remove('show');
        this.container.classList.add('hide');
        this.isShowing = false;
        console.log('👋 Now Playing popup hidden');
    }

    toggle() {
        if (this.isShowing) {
            this.hide();
        } else {
            // Get current track info from main player
            const playerTrackName = document.getElementById('playerTrackName');
            const playerArtistName = document.getElementById('playerArtistName');
            const playerAlbumCover = document.getElementById('playerAlbumCover');
            
            if (playerTrackName && playerArtistName && playerAlbumCover) {
                this.show(
                    playerTrackName.textContent,
                    playerArtistName.textContent,
                    playerAlbumCover.src
                );
            }
        }
    }
}

// Create global instance
window.musicPopup = new MusicPopupNotification();

// Expose global function for easy use
window.showMusicPopup = (title, artist, cover) => {
    window.musicPopup.show(title, artist, cover);
};

window.hideMusicPopup = () => {
    window.musicPopup.hide();
};

window.toggleMusicPopup = () => {
    window.musicPopup.toggle();
};

console.log('🎵 Now Playing Popup module loaded');
