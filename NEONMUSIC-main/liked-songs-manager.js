// ========================================
// LIKED SONGS MANAGER
// ========================================

class LikedSongsManager {
    constructor() {
        this.storageKey = 'neonwave_liked_songs';
        this.likedSongs = this.loadFromStorage();
        this.init();
    }

    init() {
        console.log('❤️ Liked Songs Manager initialized');
        console.log('❤️ Current liked songs:', this.likedSongs.length);
        
        // Update UI on page load
        this.updateAllLikeButtons();
        
        // Listen for page changes to update buttons
        document.addEventListener('pageLoaded', () => {
            setTimeout(() => this.updateAllLikeButtons(), 100);
        });
        
        // Setup event delegation for like buttons
        this.setupLikeButtonListeners();
    }
    
    // Setup event delegation for like buttons
    setupLikeButtonListeners() {
        document.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('[data-like-btn]');
            if (!likeBtn) return;
            
            e.stopPropagation();
            e.preventDefault();
            
            const artist = likeBtn.getAttribute('data-artist');
            const song = likeBtn.getAttribute('data-song');
            const image = likeBtn.getAttribute('data-image');
            const video = likeBtn.getAttribute('data-video');
            
            if (artist && song && image && video) {
                this.toggleLike({ artist, song, image, video });
            }
        });
    }

    // Load liked songs from localStorage
    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading liked songs:', error);
            return [];
        }
    }

    // Save liked songs to localStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.likedSongs));
            console.log('💾 Liked songs saved:', this.likedSongs.length);
        } catch (error) {
            console.error('Error saving liked songs:', error);
        }
    }

    // Check if song is liked
    isLiked(videoPath) {
        return this.likedSongs.some(song => song.video === videoPath);
    }

    // Toggle like status
    toggleLike(songData) {
        const { artist, song, image, video } = songData;
        
        console.log('🔄 Toggle like called:', { artist, song, video });
        
        if (this.isLiked(video)) {
            // Remove from liked
            this.likedSongs = this.likedSongs.filter(s => s.video !== video);
            console.log('💔 Removed from liked:', song);
        } else {
            // Add to liked
            this.likedSongs.push({
                artist,
                song,
                image,
                video,
                likedAt: Date.now()
            });
            console.log('❤️ Added to liked:', song);
        }
        
        this.saveToStorage();
        this.updateAllLikeButtons();
        this.updateLikedSongsPage();
        
        console.log('💾 Total liked songs:', this.likedSongs.length);
        
        return this.isLiked(video);
    }

    // Get all liked songs
    getLikedSongs() {
        return [...this.likedSongs];
    }

    // Get liked songs count
    getCount() {
        return this.likedSongs.length;
    }

    // Sort liked songs
    sortLikedSongs(sortType) {
        const songs = [...this.likedSongs];
        
        switch(sortType) {
            case 'recent':
                return songs.sort((a, b) => b.likedAt - a.likedAt);
            case 'oldest':
                return songs.sort((a, b) => a.likedAt - b.likedAt);
            case 'title':
                return songs.sort((a, b) => a.song.localeCompare(b.song));
            case 'artist':
                return songs.sort((a, b) => a.artist.localeCompare(b.artist));
            default:
                return songs;
        }
    }

    // Update all like buttons in the page
    updateAllLikeButtons() {
        const likeButtons = document.querySelectorAll('[data-like-btn]');
        likeButtons.forEach(btn => {
            const videoPath = btn.getAttribute('data-video');
            if (videoPath) {
                this.updateLikeButton(btn, this.isLiked(videoPath));
            }
        });
    }

    // Update single like button
    updateLikeButton(button, isLiked) {
        if (isLiked) {
            button.classList.add('liked');
            button.innerHTML = '❤️';
            button.title = 'Remove from liked songs';
        } else {
            button.classList.remove('liked');
            button.innerHTML = '🤍';
            button.title = 'Add to liked songs';
        }
    }

    // Update liked songs page if currently viewing
    updateLikedSongsPage() {
        const likedSongsContainer = document.getElementById('songsListModern');
        if (!likedSongsContainer) return;
        
        const sortSelect = document.getElementById('sortLiked');
        const sortType = sortSelect ? sortSelect.value : 'recent';
        
        this.renderLikedSongsPage(sortType);
    }

    // Render liked songs page
    renderLikedSongsPage(sortType = 'recent') {
        console.log('🎨 Rendering liked songs page, sortType:', sortType);
        
        const container = document.getElementById('songsListModern');
        const countElement = document.querySelector('.page-subtitle');
        
        console.log('📦 Container found:', !!container);
        console.log('📊 Count element found:', !!countElement);
        
        if (!container) {
            console.error('❌ Container #songsListModern not found!');
            return;
        }
        
        const songs = this.sortLikedSongs(sortType);
        
        console.log('🎵 Songs to render:', songs.length);
        
        // Update count
        if (countElement) {
            countElement.textContent = `${songs.length} lagu dalam koleksi`;
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Empty state
        if (songs.length === 0) {
            container.innerHTML = `
                <div style="padding: 60px 20px; text-align: center; color: rgba(255,255,255,.5);">
                    <div style="font-size: 48px; margin-bottom: 16px;">❤️</div>
                    <h3 style="font-size: 20px; margin-bottom: 8px; color: rgba(255,255,255,.8);">Belum ada lagu yang kamu sukai</h3>
                    <p style="font-size: 14px;">Tekan ❤️ pada lagu untuk menambahkannya ke sini.</p>
                </div>
            `;
            console.log('📭 Showing empty state');
            return;
        }
        
        console.log('✅ Rendering', songs.length, 'songs...');
        
        // Render songs
        songs.forEach((track, index) => {
            console.log(`  ${index + 1}. ${track.song} - ${track.artist}`);
            
            const songItem = document.createElement('div');
            songItem.className = 'song-item-modern';
            songItem.setAttribute('data-artist', track.artist);
            songItem.setAttribute('data-song', track.song);
            songItem.setAttribute('data-image', track.image);
            songItem.setAttribute('data-video', track.video);
            songItem.style.cursor = 'pointer';
            
            songItem.innerHTML = `
                <div class="song-item-left">
                    <img src="${track.image}" alt="${track.song}" class="song-thumb">
                    <div class="song-details">
                        <p class="song-title-modern">${track.song}</p>
                        <p class="song-artist-modern">${track.artist}</p>
                    </div>
                </div>
                <div class="song-item-right">
                    <button class="song-action-btn like-btn liked" data-like-btn data-video="${track.video}" title="Remove from liked songs">❤️</button>
                    <button class="song-action-btn play-btn-mini" data-play-btn title="Play">▶</button>
                </div>
            `;
            
            container.appendChild(songItem);
            
            // Add click to play
            songItem.addEventListener('click', (e) => {
                if (e.target.closest('.song-action-btn')) return;
                this.playSong(track);
            });
            
            // Like button
            const likeBtn = songItem.querySelector('[data-like-btn]');
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLike(track);
            });
            
            // Play button
            const playBtn = songItem.querySelector('[data-play-btn]');
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playSong(track);
            });
        });
        
        console.log('✅ Rendering complete!');
    }

    // Play song
    playSong(track) {
        console.log('🎵 playSong called:', track.song);
        console.log('🔍 loadPage available:', typeof loadPage);
        console.log('🔍 playTrack available:', typeof playTrack);
        
        try {
            console.log('✅ Navigating to home...');
            loadPage('home');
            setTimeout(() => {
                console.log('✅ Playing track:', track.song);
                playTrack(track.artist, track.song, track.image, track.video);
            }, 800);
        } catch (error) {
            console.error('❌ Error playing song:', error);
        }
    }

    // Play all liked songs
    playAll() {
        const songs = this.sortLikedSongs('recent');
        if (songs.length === 0) return;
        
        this.playSong(songs[0]);
    }

    // Search liked songs
    searchLikedSongs(query) {
        const container = document.getElementById('songsListModern');
        if (!container) return;
        
        const items = container.querySelectorAll('.song-item-modern');
        const searchLower = query.toLowerCase();
        
        items.forEach(item => {
            const title = item.querySelector('.song-title-modern')?.textContent.toLowerCase() || '';
            const artist = item.querySelector('.song-artist-modern')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchLower) || artist.includes(searchLower)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Initialize global instance
window.likedSongsManager = new LikedSongsManager();

console.log('✅ Liked Songs Manager loaded');
