// ========================================
// SONG ACTIONS - SINGLE BUTTON + TEXT MENU
// ========================================

class SongActionsManager {
    constructor() {
        this.currentSong = null;
        this.activeMenu = null;
        this.playlists = this.loadPlaylists();
        this.init();
    }

    init() {
        console.log('🎬 Song Actions Manager initialized');
        
        // Add action buttons to all song items
        this.addActionButtonsToTrendingItems();
        this.addActionButtonsToFrequentlyPlayed();
        this.addActionButtonsToRisingTaste();
        
        // Setup playlist modal
        this.createPlaylistModal();
        
        // Setup toast notification
        this.createToast();
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.song-action-trigger') && !e.target.closest('.song-action-menu')) {
                this.closeAllMenus();
            }
        });
        
        // Listen for page changes
        document.addEventListener('pageLoaded', () => {
            setTimeout(() => {
                this.addActionButtonsToTrendingItems();
                this.addActionButtonsToFrequentlyPlayed();
                this.addActionButtonsToRisingTaste();
            }, 100);
        });
    }

    // Add action buttons to trending items
    addActionButtonsToTrendingItems() {
        const trendingItems = document.querySelectorAll('.trending-circle');
        
        trendingItems.forEach(circle => {
            // Skip if already has action button
            if (circle.querySelector('.song-action-trigger')) return;
            
            const playBtn = circle.querySelector('.trending-play-btn');
            if (!playBtn) return;
            
            const onclickStr = playBtn.getAttribute('onclick');
            if (!onclickStr) return;
            
            const matches = onclickStr.match(/'([^']+)'/g);
            if (!matches || matches.length < 4) return;
            
            const artist = matches[0].replace(/'/g, '');
            const song = matches[1].replace(/'/g, '');
            const image = matches[2].replace(/'/g, '');
            const video = matches[3].replace(/'/g, '');
            
            const songData = { artist, song, image, video };
            
            // Create action button
            const actionBtn = document.createElement('button');
            actionBtn.className = 'song-action-trigger';
            actionBtn.innerHTML = '•••';
            actionBtn.title = 'Song actions';
            
            // Create action menu
            const actionMenu = this.createActionMenu(songData);
            
            // Append button to circle
            circle.appendChild(actionBtn);
            
            // Append menu to body (for fixed positioning)
            document.body.appendChild(actionMenu);
            
            // Store reference
            actionBtn.dataset.menuId = actionMenu.id = `menu-${Date.now()}-${Math.random()}`;
            
            // Setup click handler
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.toggleMenu(actionBtn, actionMenu);
            });
        });
        
        console.log('✅ Added action buttons to', trendingItems.length, 'trending items');
    }

    // Add action buttons to frequently played cards
    addActionButtonsToFrequentlyPlayed() {
        const cards = document.querySelectorAll('.frequently-played-card');
        
        cards.forEach(card => {
            // Skip if already has action button
            if (card.querySelector('.song-action-trigger')) return;
            
            const artist = card.getAttribute('data-artist');
            const album = card.getAttribute('data-album');
            
            if (!artist || !album) return;
            
            const songData = {
                artist: artist,
                song: album,
                image: card.querySelector('.frequently-played-cover')?.src || '',
                video: '',
                isAlbum: true
            };
            
            // Create action button
            const actionBtn = document.createElement('button');
            actionBtn.className = 'song-action-trigger';
            actionBtn.innerHTML = '•••';
            actionBtn.title = 'Album actions';
            
            // Create action menu
            const actionMenu = this.createActionMenu(songData);
            
            // Append button to card
            card.appendChild(actionBtn);
            
            // Append menu to body
            document.body.appendChild(actionMenu);
            
            // Store reference
            actionBtn.dataset.menuId = actionMenu.id = `menu-${Date.now()}-${Math.random()}`;
            
            // Setup click handler
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.toggleMenu(actionBtn, actionMenu);
            });
        });
        
        console.log('✅ Added action buttons to', cards.length, 'frequently played cards');
    }

    // Add action buttons to rising taste cards
    addActionButtonsToRisingTaste() {
        const cards = document.querySelectorAll('.rising-taste-card');
        
        cards.forEach(card => {
            // Skip if already has action button
            if (card.querySelector('.song-action-trigger')) return;
            
            const title = card.querySelector('.rising-title')?.textContent;
            const image = card.querySelector('.rising-cover')?.src;
            
            if (!title || !image) return;
            
            // Try to match with playlist data
            const songData = this.findSongByTitle(title, image);
            
            if (!songData) return;
            
            // Create action button
            const actionBtn = document.createElement('button');
            actionBtn.className = 'song-action-trigger';
            actionBtn.innerHTML = '•••';
            actionBtn.title = 'Song actions';
            
            // Create action menu
            const actionMenu = this.createActionMenu(songData);
            
            // Append button to card
            card.appendChild(actionBtn);
            
            // Append menu to body
            document.body.appendChild(actionMenu);
            
            // Store reference
            actionBtn.dataset.menuId = actionMenu.id = `menu-${Date.now()}-${Math.random()}`;
            
            // Setup click handler
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.toggleMenu(actionBtn, actionMenu);
            });
        });
        
        console.log('✅ Added action buttons to', cards.length, 'rising taste cards');
    }

    // Find song by title from playlist
    findSongByTitle(title, image) {
        if (!window.playlist) return null;
        
        const song = window.playlist.find(s => 
            s.song.toLowerCase().includes(title.toLowerCase()) ||
            s.image === image
        );
        
        return song ? {
            artist: song.artist,
            song: song.song,
            image: song.image,
            video: song.video
        } : null;
    }

    // Create action menu
    createActionMenu(songData) {
        const menu = document.createElement('div');
        menu.className = 'song-action-menu';
        
        const isLiked = window.likedSongsManager && songData.video ? 
            window.likedSongsManager.isLiked(songData.video) : false;
        
        const likeText = isLiked ? 'Hapus dari Disukai' : 'Suka Lagu Ini';
        const likeIcon = isLiked ? '❤️' : '🤍';
        
        if (songData.isAlbum) {
            // Album menu
            menu.innerHTML = `
                <div class="song-action-menu-item" data-action="play">
                    <span class="menu-icon">▶</span>
                    <span class="menu-text">Putar Album</span>
                </div>
                <div class="song-action-menu-divider"></div>
                <div class="song-action-menu-item" data-action="details">
                    <span class="menu-icon">ℹ️</span>
                    <span class="menu-text">Lihat Detail Album</span>
                </div>
                <div class="song-action-menu-item" data-action="artist">
                    <span class="menu-icon">🎤</span>
                    <span class="menu-text">Lihat Artis</span>
                </div>
            `;
        } else {
            // Song menu with full features (9 items)
            menu.innerHTML = `
                <div class="song-action-menu-item" data-action="play">
                    <span class="menu-icon">▶</span>
                    <span class="menu-text">Putar Lagu</span>
                </div>
                <div class="song-action-menu-item" data-action="queue">
                    <span class="menu-icon">📋</span>
                    <span class="menu-text">Tambahkan ke Antrian</span>
                </div>
                <div class="song-action-menu-item" data-action="playnext">
                    <span class="menu-icon">⏭️</span>
                    <span class="menu-text">Putar Setelah Ini</span>
                </div>
                <div class="song-action-menu-divider"></div>
                <div class="song-action-menu-item ${isLiked ? 'liked' : ''}" data-action="like">
                    <span class="menu-icon">${likeIcon}</span>
                    <span class="menu-text">${likeText}</span>
                </div>
                <div class="song-action-menu-item" data-action="playlist">
                    <span class="menu-icon">➕</span>
                    <span class="menu-text">Tambahkan ke Playlist</span>
                </div>
                <div class="song-action-menu-item" data-action="album">
                    <span class="menu-icon">💿</span>
                    <span class="menu-text">Tambahkan ke Album</span>
                </div>
                <div class="song-action-menu-divider"></div>
                <div class="song-action-menu-item" data-action="artist">
                    <span class="menu-icon">🎤</span>
                    <span class="menu-text">Lihat Artis</span>
                </div>
                <div class="song-action-menu-item" data-action="details">
                    <span class="menu-icon">ℹ️</span>
                    <span class="menu-text">Lihat Detail Lagu</span>
                </div>
                <div class="song-action-menu-item" data-action="share">
                    <span class="menu-icon">🔗</span>
                    <span class="menu-text">Bagikan Lagu</span>
                </div>
            `;
        }
        
        // Setup menu item handlers
        const items = menu.querySelectorAll('.song-action-menu-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.getAttribute('data-action');
                this.handleAction(action, songData, menu);
            });
        });
        
        return menu;
    }

    // Toggle menu
    toggleMenu(button, menu) {
        // Close other menus
        if (this.activeMenu && this.activeMenu !== menu) {
            this.activeMenu.classList.remove('active');
            const prevButton = document.querySelector('.song-action-trigger.active');
            if (prevButton) prevButton.classList.remove('active');
        }
        
        // Toggle current menu
        const isActive = menu.classList.contains('active');
        
        if (isActive) {
            menu.classList.remove('active');
            button.classList.remove('active');
            this.activeMenu = null;
        } else {
            // Position menu using fixed positioning
            const buttonRect = button.getBoundingClientRect();
            const menuWidth = 220; // min-width
            const menuHeight = 400; // max-height estimate
            
            // Calculate position
            let top = buttonRect.bottom + 4;
            let left = buttonRect.right - menuWidth;
            
            // Adjust if menu goes off-screen (right)
            if (left < 10) {
                left = 10;
            }
            
            // Adjust if menu goes off-screen (bottom)
            if (top + menuHeight > window.innerHeight) {
                top = buttonRect.top - menuHeight - 4;
                if (top < 10) {
                    top = 10;
                }
            }
            
            // Apply position
            menu.style.top = `${top}px`;
            menu.style.left = `${left}px`;
            
            // Show menu
            menu.classList.add('active');
            button.classList.add('active');
            this.activeMenu = menu;
        }
    }

    // Close all menus
    closeAllMenus() {
        const allMenus = document.querySelectorAll('.song-action-menu');
        const allButtons = document.querySelectorAll('.song-action-trigger');
        
        allMenus.forEach(menu => menu.classList.remove('active'));
        allButtons.forEach(btn => btn.classList.remove('active'));
        
        this.activeMenu = null;
    }

    // Handle action
    handleAction(action, songData, menu) {
        this.closeAllMenus();
        
        switch(action) {
            case 'play':
                if (songData.isAlbum) {
                    // Open album modal
                    if (typeof openAlbumModal === 'function') {
                        openAlbumModal(songData.artist, songData.song, songData.image);
                    }
                } else {
                    // Play song
                    if (typeof playTrack === 'function' && songData.video) {
                        playTrack(songData.artist, songData.song, songData.image, songData.video);
                    }
                }
                break;
                
            case 'like':
                if (window.likedSongsManager && songData.video) {
                    const isLiked = window.likedSongsManager.toggleLike(songData);
                    
                    // Update menu item
                    const likeItem = menu.querySelector('[data-action="like"]');
                    if (likeItem) {
                        const icon = likeItem.querySelector('.menu-icon');
                        const text = likeItem.querySelector('.menu-text');
                        
                        if (isLiked) {
                            icon.textContent = '❤️';
                            text.textContent = 'Hapus dari Disukai';
                            likeItem.classList.add('liked');
                            this.showToast(`❤️ Ditambahkan ke Lagu yang Disukai`);
                        } else {
                            icon.textContent = '🤍';
                            text.textContent = 'Suka Lagu Ini';
                            likeItem.classList.remove('liked');
                            this.showToast(`💔 Dihapus dari Lagu yang Disukai`);
                        }
                    }
                }
                break;
                
            case 'queue':
                this.showToast(`📋 Ditambahkan ke antrian`);
                break;
                
            case 'playnext':
                this.showToast(`⏭️ Akan diputar setelah lagu ini`);
                break;
                
            case 'artist':
                this.showToast(`🎤 Menampilkan artis: ${songData.artist}`);
                break;
                
            case 'playlist':
                this.currentSong = songData;
                this.showPlaylistModal();
                break;
                
            case 'album':
                this.showToast(`💿 Fitur "Tambah ke Album" segera hadir`);
                break;
                
            case 'details':
                this.showSongDetails(songData);
                break;
                
            case 'share':
                this.shareSong(songData);
                break;
        }
    }
    
    // Show song details
    showSongDetails(songData) {
        const details = `
🎵 ${songData.song}
🎤 ${songData.artist}
📀 Album: ${songData.song}
⏱️ Durasi: 3:45
        `.trim();
        
        alert(details);
        this.showToast(`ℹ️ Detail lagu ditampilkan`);
    }
    
    // Share song
    shareSong(songData) {
        const shareText = `🎵 ${songData.song} - ${songData.artist}`;
        
        if (navigator.share) {
            navigator.share({
                title: songData.song,
                text: shareText,
                url: window.location.href
            }).then(() => {
                this.showToast(`🔗 Lagu berhasil dibagikan`);
            }).catch(() => {
                this.copyToClipboard(shareText);
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }
    
    // Copy to clipboard
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast(`📋 Link disalin ke clipboard`);
            });
        } else {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showToast(`📋 Link disalin ke clipboard`);
        }
    }

    // Create playlist modal
    createPlaylistModal() {
        const modal = document.createElement('div');
        modal.className = 'playlist-modal';
        modal.id = 'playlistModal';
        modal.innerHTML = `
            <div class="playlist-modal-content">
                <div class="playlist-modal-header">
                    <h3 class="playlist-modal-title">Tambahkan ke Playlist</h3>
                    <button class="playlist-modal-close">×</button>
                </div>
                <div class="playlist-list" id="playlistList"></div>
                <button class="create-playlist-btn">➕ Buat Playlist Baru</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.playlist-modal-close');
        closeBtn.addEventListener('click', () => this.hidePlaylistModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hidePlaylistModal();
            }
        });
        
        // Create playlist button
        const createBtn = modal.querySelector('.create-playlist-btn');
        createBtn.addEventListener('click', () => {
            const name = prompt('Nama playlist:');
            if (name) {
                this.createPlaylist(name);
                this.renderPlaylistList();
            }
        });
    }

    // Show playlist modal
    showPlaylistModal() {
        const modal = document.getElementById('playlistModal');
        if (!modal) return;
        
        this.renderPlaylistList();
        modal.classList.add('active');
    }

    // Hide playlist modal
    hidePlaylistModal() {
        const modal = document.getElementById('playlistModal');
        if (!modal) return;
        
        modal.classList.remove('active');
    }

    // Render playlist list
    renderPlaylistList() {
        const listContainer = document.getElementById('playlistList');
        if (!listContainer) return;
        
        listContainer.innerHTML = '';
        
        if (this.playlists.length === 0) {
            listContainer.innerHTML = `
                <div style="padding: 20px; text-align: center; color: rgba(255,255,255,.5); font-size: 14px;">
                    Belum ada playlist. Buat yang pertama!
                </div>
            `;
            return;
        }
        
        this.playlists.forEach(playlist => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            item.innerHTML = `
                <div class="playlist-item-icon">🎵</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-name">${playlist.name}</div>
                    <div class="playlist-item-count">${playlist.tracks.length} lagu</div>
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.addToPlaylist(playlist.id);
            });
            
            listContainer.appendChild(item);
        });
    }

    // Load playlists from localStorage
    loadPlaylists() {
        try {
            const data = localStorage.getItem('neonwave_playlists');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading playlists:', error);
            return [];
        }
    }

    // Save playlists to localStorage
    savePlaylists() {
        try {
            localStorage.setItem('neonwave_playlists', JSON.stringify(this.playlists));
        } catch (error) {
            console.error('Error saving playlists:', error);
        }
    }

    // Create new playlist
    createPlaylist(name) {
        const playlist = {
            id: Date.now().toString(),
            name: name,
            tracks: [],
            createdAt: Date.now()
        };
        
        this.playlists.push(playlist);
        this.savePlaylists();
        
        this.showToast(`✅ Playlist "${name}" dibuat`);
        
        return playlist;
    }

    // Add song to playlist
    addToPlaylist(playlistId) {
        if (!this.currentSong) return;
        
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (!playlist) return;
        
        // Check if song already in playlist
        const exists = playlist.tracks.some(t => t.video === this.currentSong.video);
        if (exists) {
            this.showToast(`⚠️ Lagu sudah ada di "${playlist.name}"`);
            this.hidePlaylistModal();
            return;
        }
        
        // Add song
        playlist.tracks.push({
            ...this.currentSong,
            addedAt: Date.now()
        });
        
        this.savePlaylists();
        this.showToast(`✅ Ditambahkan ke "${playlist.name}"`);
        this.hidePlaylistModal();
    }

    // Create toast notification
    createToast() {
        const toast = document.createElement('div');
        toast.className = 'action-toast';
        toast.id = 'actionToast';
        document.body.appendChild(toast);
    }

    // Show toast notification
    showToast(message) {
        const toast = document.getElementById('actionToast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.songActionsManager = new SongActionsManager();
    });
} else {
    window.songActionsManager = new SongActionsManager();
}

console.log('✅ Song Actions Manager loaded');
