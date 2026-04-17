// Spotify Integration for Music Player

// Search functionality
let searchTimeout = null;
const searchInput = document.querySelector('.search-bar input');
const searchResults = document.createElement('div');
searchResults.className = 'search-results';
searchResults.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(20, 20, 20, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 12px;
    margin-top: 10px;
    max-height: 500px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
`;

if (searchInput && searchInput.parentElement) {
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(searchResults);
}

// Search event listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(async () => {
            await performSearch(query);
        }, 500);
    });
}

// Perform search
async function performSearch(query) {
    searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: rgba(255,255,255,.6);">Searching...</div>';
    searchResults.style.display = 'block';
    
    const tracks = await spotifyAPI.searchTracks(query, 10);
    
    if (!tracks || tracks.length === 0) {
        searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: rgba(255,255,255,.6);">No results found</div>';
        return;
    }
    
    displaySearchResults(tracks);
}

// Display search results
function displaySearchResults(tracks) {
    searchResults.innerHTML = '';
    
    tracks.forEach(track => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px 15px;
            cursor: pointer;
            transition: background 0.2s;
        `;
        
        resultItem.innerHTML = `
            <img src="${track.album.images[2]?.url || track.album.images[0]?.url}" 
                 alt="${track.name}" 
                 style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;">
            <div style="flex: 1; min-width: 0;">
                <div style="color: #fff; font-weight: 500; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${track.name}
                </div>
                <div style="color: rgba(255,255,255,.6); font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${track.artists.map(a => a.name).join(', ')}
                </div>
            </div>
            <div style="color: rgba(255,255,255,.5); font-size: 12px;">
                ${formatDuration(track.duration_ms)}
            </div>
        `;
        
        resultItem.addEventListener('mouseenter', () => {
            resultItem.style.background = 'rgba(255,255,255,.1)';
        });
        
        resultItem.addEventListener('mouseleave', () => {
            resultItem.style.background = 'transparent';
        });
        
        resultItem.addEventListener('click', () => {
            playSpotifyTrack(track);
            searchResults.style.display = 'none';
            searchInput.value = '';
        });
        
        searchResults.appendChild(resultItem);
    });
}

// Play Spotify track
function playSpotifyTrack(track) {
    const artist = track.artists.map(a => a.name).join(', ');
    const song = track.name;
    const image = track.album.images[0]?.url || track.album.images[1]?.url;
    const previewUrl = track.preview_url;
    
    if (!previewUrl) {
        alert('Preview not available for this track');
        return;
    }
    
    // Update NOW PLAYING section
    const title = document.querySelector('.now-playing-text h2');
    const artistName = document.querySelector('.now-playing-text p');
    const albumImg = document.querySelector('.now-playing-image img');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoContainer = document.getElementById('videoContainer');
    const nowPlayingImage = document.querySelector('.now-playing-image');
    const playBtn = document.getElementById('playBtn');
    const nowPlayingText = document.querySelector('.now-playing-text');
    
    // Remove empty state
    if (nowPlayingText) {
        nowPlayingText.classList.remove('empty');
    }
    
    // Update text content
    if (title) title.textContent = song.toUpperCase();
    if (artistName) artistName.textContent = artist;
    
    // Update album image
    if (albumImg) albumImg.src = image;
    
    // Use audio element for Spotify preview
    if (videoPlayer && videoSource) {
        videoSource.src = previewUrl;
        videoPlayer.load();
        videoContainer.style.display = 'none';
        nowPlayingImage.style.display = 'block';
        
        videoPlayer.play().then(() => {
            if (playBtn) playBtn.textContent = '⏸';
        }).catch(err => {
            console.log('Auto-play prevented:', err);
            if (playBtn) playBtn.textContent = '▶';
        });
    }
    
    // Update background
    const style = document.createElement('style');
    style.textContent = `
        #albumHighlight::before {
            background-image: url('${image}') !important;
        }
    `;
    
    const oldStyle = document.getElementById('dynamic-bg-style');
    if (oldStyle) oldStyle.remove();
    
    style.id = 'dynamic-bg-style';
    document.head.appendChild(style);
    
    // Update lyrics section
    const lyricsTitle = document.getElementById('lyricsTitle');
    const lyricsText = document.getElementById('lyricsText');
    if (lyricsTitle) lyricsTitle.textContent = `${song} - ${artist}`;
    if (lyricsText) lyricsText.textContent = 'Lyrics not available for Spotify preview tracks.';
    
    // Hide lyrics box for Spotify tracks
    const lyricsBox = document.getElementById('lyricsBox');
    if (lyricsBox) lyricsBox.style.display = 'none';
    
    console.log('🎵 Playing Spotify track:', song, 'by', artist);
}

// Format duration
function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Load trending tracks from Spotify
async function loadSpotifyTrending() {
    const newReleases = await spotifyAPI.getNewReleases(10);
    
    if (!newReleases) return;
    
    const trendingContainer = document.querySelector('.trending-container');
    if (!trendingContainer) return;
    
    // Clear existing content
    trendingContainer.innerHTML = '';
    
    newReleases.forEach(album => {
        const circle = document.createElement('div');
        circle.className = 'trending-circle';
        circle.style.cssText = `
            min-width: 200px;
            height: 200px;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            transition: transform 0.3s;
        `;
        
        circle.innerHTML = `
            <img src="${album.images[0]?.url}" 
                 alt="${album.name}" 
                 style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 15px; color: white;">
                <div style="font-weight: 600; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${album.name}
                </div>
                <div style="font-size: 12px; color: rgba(255,255,255,.7); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${album.artists.map(a => a.name).join(', ')}
                </div>
            </div>
        `;
        
        circle.addEventListener('mouseenter', () => {
            circle.style.transform = 'scale(1.05)';
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.style.transform = 'scale(1)';
        });
        
        circle.addEventListener('click', async () => {
            // Get album tracks and play first one
            const token = await spotifyAPI.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?limit=1`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.items && data.items[0]) {
                const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${data.items[0].id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const track = await trackResponse.json();
                playSpotifyTrack(track);
            }
        });
        
        trendingContainer.appendChild(circle);
    });
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput?.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// Initialize Spotify content on page load
window.addEventListener('load', async () => {
    console.log('🎵 Loading Spotify content...');
    await loadSpotifyTrending();
});

console.log('✅ Spotify integration loaded');
