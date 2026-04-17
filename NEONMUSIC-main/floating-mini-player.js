/* ========================================
   FLOATING MINI MUSIC PLAYER - JAVASCRIPT
   Always-on-top mini player with drag support
   ======================================== */

class FloatingMiniPlayer {
    constructor() {
        this.container = null;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.progressInterval = null;
        this.isShowing = false;
        this.init();
    }

    init() {
        // Create mini player container
        this.container = document.createElement('div');
        this.container.className = 'floating-mini-player';
        this.container.innerHTML = `
            <div class="mini-player-card">
                <div class="mini-player-header">
                    <div class="mini-player-drag-handle">
                        <div class="drag-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>MINI PLAYER</span>
                    </div>
                    <button class="mini-player-close" id="miniPlayerCloseBtn" aria-label="Close"></button>
                </div>
                
                <div class="mini-player-content">
                    <div class="mini-player-info">
                        <div class="mini-player-cover">
                            <img src="" alt="Album Cover" id="miniPlayerCover">
                        </div>
                        <div class="mini-player-text">
                            <div class="mini-player-title" id="miniPlayerTitle">Song Title</div>
                            <div class="mini-player-artist" id="miniPlayerArtist">Artist Name</div>
                        </div>
                    </div>
                    
                    <div class="mini-player-controls">
                        <button class="mini-control-btn prev" id="miniPrevBtn" aria-label="Previous">
                            <svg viewBox="0 0 24 24">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                            </svg>
                        </button>
                        <button class="mini-control-btn play" id="miniPlayBtn" aria-label="Play/Pause">
                            <svg viewBox="0 0 24 24" id="miniPlayIcon">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            <svg viewBox="0 0 24 24" id="miniPauseIcon" style="display: none;">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
                            </svg>
                        </button>
                        <button class="mini-control-btn next" id="miniNextBtn" aria-label="Next">
                            <svg viewBox="0 0 24 24">
                                <path d="M16 18h2V6h-2zm-11-7l8.5-6v12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="mini-player-progress">
                        <div class="mini-player-progress-fill" id="miniPlayerProgressFill"></div>
                    </div>
                </div>
                
                <button class="mini-pip-btn" id="miniPipBtn" title="Picture-in-Picture" style="display: none;">
                    <svg viewBox="0 0 24 24">
                        <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/>
                    </svg>
                </button>
            </div>
        `;

        // Append to body
        document.body.appendChild(this.container);

        // Setup event listeners
        this.setupEventListeners();
        this.setupDragListeners();

        console.log('✅ Floating Mini Player initialized');
    }

    setupEventListeners() {
        // Close button
        const closeBtn = this.container.querySelector('#miniPlayerCloseBtn');
        closeBtn.addEventListener('click', () => this.hide());

        // Play/Pause button
        const playBtn = this.container.querySelector('#miniPlayBtn');
        playBtn.addEventListener('click', () => this.togglePlayPause());

        // Previous button
        const prevBtn = this.container.querySelector('#miniPrevBtn');
        prevBtn.addEventListener('click', () => this.playPrevious());

        // Next button
        const nextBtn = this.container.querySelector('#miniNextBtn');
        nextBtn.addEventListener('click', () => this.playNext());

        // PiP button (if supported)
        const pipBtn = this.container.querySelector('#miniPipBtn');
        if (document.pictureInPictureEnabled) {
            pipBtn.style.display = 'flex';
            pipBtn.addEventListener('click', () => this.togglePiP());
        }

        // Listen to main player state changes
        this.syncWithMainPlayer();
    }

    setupDragListeners() {
        const card = this.container.querySelector('.mini-player-card');
        const dragHandle = this.container.querySelector('.mini-player-drag-handle');

        // Mouse events
        dragHandle.addEventListener('mousedown', (e) => this.dragStart(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.dragEnd());

        // Touch events
        dragHandle.addEventListener('touchstart', (e) => this.dragStart(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        document.addEventListener('touchend', () => this.dragEnd());
    }

    dragStart(e) {
        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        if (e.target.closest('.mini-player-drag-handle')) {
            this.isDragging = true;
            this.container.classList.add('dragging');
        }
    }

    drag(e) {
        if (this.isDragging) {
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
        this.isDragging = false;
        this.container.classList.remove('dragging');
    }

    setTranslate(xPos, yPos) {
        this.container.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    togglePlayPause() {
        const videoPlayer = document.getElementById('videoPlayer');
        const playBtn = document.querySelector('.play-btn');
        
        if (videoPlayer) {
            if (videoPlayer.paused) {
                videoPlayer.play();
                this.updatePlayPauseIcon(false);
                if (playBtn) playBtn.textContent = '⏸';
                console.log('▶️ Playing from mini player');
            } else {
                videoPlayer.pause();
                this.updatePlayPauseIcon(true);
                if (playBtn) playBtn.textContent = '▶';
                console.log('⏸ Paused from mini player');
            }
        }
    }

    playPrevious() {
        if (typeof window.playPreviousTrack === 'function') {
            window.playPreviousTrack();
            console.log('⏮ Previous track from mini player');
        } else {
            console.warn('⚠️ Previous track function not found');
        }
    }

    playNext() {
        if (typeof window.playNextTrack === 'function') {
            window.playNextTrack();
            console.log('⏭ Next track from mini player');
        } else {
            console.warn('⚠️ Next track function not found');
        }
    }

    updatePlayPauseIcon(isPlaying) {
        const playIcon = this.container.querySelector('#miniPlayIcon');
        const pauseIcon = this.container.querySelector('#miniPauseIcon');
        
        if (isPlaying) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
    }

    async togglePiP() {
        const videoPlayer = document.getElementById('videoPlayer');
        
        if (!videoPlayer) return;

        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                console.log('📺 Exited Picture-in-Picture');
            } else {
                await videoPlayer.requestPictureInPicture();
                console.log('📺 Entered Picture-in-Picture');
            }
        } catch (error) {
            console.error('❌ PiP error:', error);
        }
    }

    syncWithMainPlayer() {
        // Listen to video player events
        const videoPlayer = document.getElementById('videoPlayer');
        
        if (videoPlayer) {
            // Update progress bar
            videoPlayer.addEventListener('timeupdate', () => {
                if (videoPlayer.duration) {
                    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
                    const progressFill = this.container.querySelector('#miniPlayerProgressFill');
                    if (progressFill) {
                        progressFill.style.width = progress + '%';
                    }
                }
            });

            // Sync play/pause state
            videoPlayer.addEventListener('play', () => {
                this.updatePlayPauseIcon(false);
            });

            videoPlayer.addEventListener('pause', () => {
                this.updatePlayPauseIcon(true);
            });

            // Update on track change
            videoPlayer.addEventListener('loadedmetadata', () => {
                this.updateFromMainPlayer();
            });
        }

        // Initial sync
        this.updateFromMainPlayer();
    }

    updateFromMainPlayer() {
        const videoPlayer = document.getElementById('videoPlayer');
        const playerAlbumCover = document.getElementById('playerAlbumCover');
        const playerTrackName = document.getElementById('playerTrackName');
        const playerArtistName = document.getElementById('playerArtistName');

        // Update cover, title, artist
        const miniCover = this.container.querySelector('#miniPlayerCover');
        const miniTitle = this.container.querySelector('#miniPlayerTitle');
        const miniArtist = this.container.querySelector('#miniPlayerArtist');

        if (playerAlbumCover && miniCover) {
            miniCover.src = playerAlbumCover.src;
        }
        if (playerTrackName && miniTitle) {
            miniTitle.textContent = playerTrackName.textContent;
        }
        if (playerArtistName && miniArtist) {
            miniArtist.textContent = playerArtistName.textContent;
        }

        // Update play/pause icon
        if (videoPlayer) {
            this.updatePlayPauseIcon(videoPlayer.paused);
        }
    }

    /**
     * Show mini player
     * @param {string} title - Song title
     * @param {string} artist - Artist name
     * @param {string} cover - Cover image URL
     */
    show(title, artist, cover) {
        // Update content
        const miniCover = this.container.querySelector('#miniPlayerCover');
        const miniTitle = this.container.querySelector('#miniPlayerTitle');
        const miniArtist = this.container.querySelector('#miniPlayerArtist');

        if (cover) miniCover.src = cover;
        if (title) miniTitle.textContent = title;
        if (artist) miniArtist.textContent = artist;

        // Sync play state
        const videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer) {
            this.updatePlayPauseIcon(videoPlayer.paused);
        }

        // Show with animation
        setTimeout(() => {
            this.container.classList.add('show');
            this.isShowing = true;
            console.log('🎵 Mini player shown:', title);
        }, 100);
    }

    hide() {
        this.container.classList.remove('show');
        this.isShowing = false;
        console.log('👋 Mini player hidden');
    }

    toggle() {
        if (this.isShowing) {
            this.hide();
        } else {
            this.updateFromMainPlayer();
            this.show();
        }
    }
}

// Create global instance
window.floatingMiniPlayer = new FloatingMiniPlayer();

// Expose global functions
window.showMiniPlayer = (title, artist, cover) => {
    window.floatingMiniPlayer.show(title, artist, cover);
};

window.hideMiniPlayer = () => {
    window.floatingMiniPlayer.hide();
};

window.toggleMiniPlayer = () => {
    window.floatingMiniPlayer.toggle();
};

console.log('🎵 Floating Mini Player module loaded');
