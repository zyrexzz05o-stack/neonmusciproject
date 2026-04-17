// Navigation - Direct content replacement (music keeps playing)
const navItems = document.querySelectorAll('.nav-item');
const mainContent = document.querySelector('.main-content');

// Store original home content
let originalHomeContent = mainContent.innerHTML;
let currentPage = 'Home';

// Page mapping
const pageMap = {
    'Home': null,
    'Library': 'library.html',
    'Trending': 'trending.html',
    'Playlists': 'playlists.html',
    'Liked Songs': 'liked-songs.html',
    'Profile': null // Profile is generated dynamically
};

// Function to re-attach home page event listeners
function attachHomeListeners() {
    // Re-attach click events to trending items
    const trendingItems = document.querySelectorAll('.trending-item');
    trendingItems.forEach(item => {
        const button = item.querySelector('button');
        if (button && button.onclick === null) {
            const onclickAttr = button.getAttribute('onclick');
            if (onclickAttr) {
                button.onclick = function() {
                    eval(onclickAttr);
                };
            }
        }
    });
}

// Function to load page content
async function loadPage(pageName) {
    const pageFile = pageMap[pageName];
    
    if (pageName === 'Home') {
        // Restore home content
        mainContent.innerHTML = originalHomeContent;
        currentPage = 'Home';
        // Re-attach event listeners for home page
        attachHomeListeners();
    } else if (pageName === 'Profile') {
        // Generate profile page dynamically
        mainContent.innerHTML = createProfilePageHTML();
        currentPage = 'Profile';
    } else if (pageFile) {
        // Load external page
        try {
            const response = await fetch(pageFile);
            const html = await response.text();
            
            // Extract body content from the loaded HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            
            mainContent.innerHTML = bodyContent;
            currentPage = pageName;
        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = `<div style="padding: 40px; text-align: center; color: rgba(255,255,255,.7);">
                <h2>Page not found</h2>
                <p>Could not load ${pageFile}</p>
            </div>`;
        }
    }
    
    mainContent.scrollTop = 0;
}

// Setup navigation
navItems.forEach(item => {
    item.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Update active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const itemText = item.querySelector('span:last-child').textContent.trim();
        await loadPage(itemText);
    });
});

console.log('Navigation setup complete.');

// ========================================
// PLAYLIST SYSTEM
// ========================================

// Playlist array - urutan lagu sesuai trending grid
const playlist = [
    {
        artist: 'The Weeknd',
        song: 'Timeless',
        image: 'images/TIMELESS.jpeg',
        video: 'videos/Timeless.mp4'
    },
    {
        artist: 'James Arthur',
        song: 'Say You Won\'t Let Go',
        image: 'images/jamesarthur.jpeg',
        video: 'videos/Jamesarthur.mp4'
    },
    {
        artist: 'Hindia',
        song: 'Evaluasi',
        image: 'images/hindiaappmusic.jpeg',
        video: 'videos/Hindia.mp4'
    },
    {
        artist: 'Justin Bieber',
        song: 'Love Yourself',
        image: 'images/justin bieber.jpeg',
        video: 'videos/Justinbieber.mp4'
    },
    {
        artist: 'One Direction',
        song: 'Night Changes',
        image: 'images/onedirection.jpeg',
        video: 'videos/One Direction - Night Changes.mp4'
    },
    {
        artist: 'Coldplay',
        song: 'Fix You',
        image: 'images/coldplay.jpeg',
        video: 'videos/Coldplay - Fix You (Official Video).mp4'
    },
    {
        artist: 'Lord Huron',
        song: 'The Night We Met',
        image: 'images/lordhuron.jpeg',
        video: 'videos/Lord Huron - The Night We Met (Official Audio).mp4'
    },
    {
        artist: 'Dewa 19',
        song: 'Aku Milikmu',
        image: 'images/dewa19.jpeg',
        video: 'videos/Dewa 19 Aku Milikmu (HQ).mp4'
    },
    {
        artist: 'Neck Deep',
        song: 'Wish You Were Here',
        image: 'images/neckdeep.jpg',
        video: 'videos/Wish You Were Here.mp4'
    },
    {
        artist: 'Nadhif Basalamah',
        song: 'Penjaga Hati',
        image: 'images/nadhifbasamalah.jpeg',
        video: 'videos/nadhif basalamah - penjaga hati (Official Music Video).mp4'
    }
];

let currentTrackIndex = -1; // Track yang sedang diputar
let currentTrack = null; // Current playing track path

// Dark mode state
let isDarkMode = true;
let backgroundMode = 'dark'; // 'dark', 'light', 'neural'

// Listen for theme change messages from iframe
window.addEventListener('message', (event) => {
    if (event.data.type === 'changeTheme') {
        setTheme(event.data.dark);
    }
});

// Set theme function
function setTheme(dark) {
    isDarkMode = dark;
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const musicPlayer = document.querySelector('.music-player');
    const bgShapes = document.querySelector('.bg-shapes');
    
    if (dark) {
        // Dark Mode
        body.style.background = '#000';
        body.style.color = '#fff';
        body.classList.remove('light-mode');
        
        if (sidebar) {
            sidebar.style.background = '#000';
            sidebar.style.borderRight = '1px solid rgba(255,255,255,.1)';
        }
        if (musicPlayer) {
            musicPlayer.style.background = 'rgba(0,0,0,.95)';
            musicPlayer.style.borderTop = '1px solid rgba(255,255,255,.1)';
        }
        
        // Reset shapes to white/light colors
        if (bgShapes) {
            const circles = bgShapes.querySelectorAll('.circle');
            const triangles = bgShapes.querySelectorAll('.triangle');
            const squares = bgShapes.querySelectorAll('.square');
            const hexagons = bgShapes.querySelectorAll('.hexagon');
            
            circles.forEach(circle => {
                circle.style.background = 'radial-gradient(circle, rgba(255,255,255,.25), transparent 70%)';
                circle.style.borderColor = 'rgba(255,255,255,.6)';
                circle.style.boxShadow = '0 0 80px rgba(255,255,255,.5), inset 0 0 50px rgba(255,255,255,.25)';
            });
            
            triangles.forEach((triangle, index) => {
                if (index === 0) triangle.style.borderBottomColor = 'rgba(255,255,255,.5)';
                if (index === 1) triangle.style.borderBottomColor = 'rgba(255,255,255,.45)';
                if (index === 2) triangle.style.borderBottomColor = 'rgba(255,255,255,.4)';
                triangle.style.boxShadow = '0 0 80px rgba(255,255,255,.6)';
            });
            
            squares.forEach(square => {
                square.style.background = 'rgba(255,255,255,.15)';
                square.style.borderColor = 'rgba(255,255,255,.6)';
                square.style.boxShadow = '0 0 70px rgba(255,255,255,.3), inset 0 0 40px rgba(255,255,255,.15)';
                square.style.opacity = '0.5';
            });
            
            hexagons.forEach(hexagon => {
                hexagon.style.background = 'rgba(255,255,255,.12)';
                hexagon.style.borderColor = 'rgba(255,255,255,.5)';
                hexagon.style.boxShadow = '0 0 65px rgba(255,255,255,.35)';
                hexagon.style.opacity = '0.45';
            });
        }
    } else {
        // Light Mode
        body.style.background = '#f5f5f5';
        body.style.color = '#000';
        body.classList.add('light-mode');
        
        if (sidebar) {
            sidebar.style.background = '#fff';
            sidebar.style.borderRight = '1px solid rgba(0,0,0,.1)';
        }
        if (musicPlayer) {
            musicPlayer.style.background = 'rgba(255,255,255,.95)';
            musicPlayer.style.borderTop = '1px solid rgba(0,0,0,.1)';
        }
        
        // Change shapes to black/dark colors
        if (bgShapes) {
            const circles = bgShapes.querySelectorAll('.circle');
            const triangles = bgShapes.querySelectorAll('.triangle');
            const squares = bgShapes.querySelectorAll('.square');
            const hexagons = bgShapes.querySelectorAll('.hexagon');
            
            circles.forEach(circle => {
                circle.style.background = 'radial-gradient(circle, rgba(0,0,0,.1), transparent 70%)';
                circle.style.borderColor = 'rgba(0,0,0,.4)';
                circle.style.boxShadow = '0 0 60px rgba(0,0,0,.3), inset 0 0 40px rgba(0,0,0,.15)';
            });
            
            triangles.forEach((triangle, index) => {
                if (index === 0) triangle.style.borderBottomColor = 'rgba(0,0,0,.35)';
                if (index === 1) triangle.style.borderBottomColor = 'rgba(0,0,0,.3)';
                if (index === 2) triangle.style.borderBottomColor = 'rgba(0,0,0,.25)';
                triangle.style.boxShadow = '0 0 60px rgba(0,0,0,.4)';
            });
            
            squares.forEach(square => {
                square.style.background = 'rgba(0,0,0,.08)';
                square.style.borderColor = 'rgba(0,0,0,.4)';
                square.style.boxShadow = '0 0 50px rgba(0,0,0,.18), inset 0 0 30px rgba(0,0,0,.08)';
            });
            
            hexagons.forEach(hexagon => {
                hexagon.style.background = 'rgba(0,0,0,.05)';
                hexagon.style.borderColor = 'rgba(0,0,0,.3)';
                hexagon.style.boxShadow = '0 0 45px rgba(0,0,0,.22)';
            });
        }
    }
}

// User profile data
let userProfile = {
    name: 'Your Name',
    bio: 'Music Enthusiast',
    email: 'yourname@email.com',
    avatar: 'images/anime-avatar..jpeg'
};

// Notifications settings
let notificationSettings = {
    newReleases: true,
    recommendations: true,
    playlistUpdates: false,
    socialActivity: true
};

// Audio quality setting
let audioQuality = 'high'; // low, normal, high, very-high

// Create Edit Profile page
function createEditProfilePage() {
    return `
        <div class="settings-page">
            <div class="settings-header">
                <button class="back-btn" onclick="showProfilePage()">← Back</button>
                <h2>Edit Profile</h2>
            </div>
            <div class="settings-content">
                <div class="edit-profile-form">
                    <div class="form-group">
                        <label>Profile Picture</label>
                        <div class="avatar-upload">
                            <img src="${userProfile.avatar}" alt="Avatar" class="avatar-preview" id="avatarPreview">
                            <button class="upload-btn" onclick="alert('Upload feature coming soon!')">Change Photo</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="profileName" value="${userProfile.name}" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>Bio</label>
                        <input type="text" id="profileBio" value="${userProfile.bio}" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="profileEmail" value="${userProfile.email}" class="form-input">
                    </div>
                    <button class="save-btn" onclick="saveProfile()">Save Changes</button>
                </div>
            </div>
        </div>
    `;
}

// Create Notifications page
function createNotificationsPage() {
    return `
        <div class="settings-page">
            <div class="settings-header">
                <button class="back-btn" onclick="showProfilePage()">← Back</button>
                <h2>Notifications</h2>
            </div>
            <div class="settings-content">
                <div class="notification-settings">
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-icon">🎵</span>
                            <div>
                                <h4>New Releases</h4>
                                <p>Get notified about new music from your favorite artists</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${notificationSettings.newReleases ? 'checked' : ''} onchange="toggleNotification('newReleases', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-icon">💡</span>
                            <div>
                                <h4>Recommendations</h4>
                                <p>Receive personalized music recommendations</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${notificationSettings.recommendations ? 'checked' : ''} onchange="toggleNotification('recommendations', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-icon">📋</span>
                            <div>
                                <h4>Playlist Updates</h4>
                                <p>Get notified when playlists you follow are updated</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${notificationSettings.playlistUpdates ? 'checked' : ''} onchange="toggleNotification('playlistUpdates', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <span class="setting-icon">👥</span>
                            <div>
                                <h4>Social Activity</h4>
                                <p>Notifications about friends and followers</p>
                            </div>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${notificationSettings.socialActivity ? 'checked' : ''} onchange="toggleNotification('socialActivity', this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create Audio Quality page
function createAudioQualityPage() {
    return `
        <div class="settings-page">
            <div class="settings-header">
                <button class="back-btn" onclick="showProfilePage()">← Back</button>
                <h2>Audio Quality</h2>
            </div>
            <div class="settings-content">
                <div class="audio-quality-settings">
                    <p class="quality-description">Higher quality audio uses more data</p>
                    <div class="quality-options">
                        <div class="quality-option ${audioQuality === 'low' ? 'active' : ''}" onclick="setAudioQuality('low')">
                            <div class="quality-info">
                                <h4>Low</h4>
                                <p>96 kbps - Save data</p>
                            </div>
                            <span class="quality-check">${audioQuality === 'low' ? '✓' : ''}</span>
                        </div>
                        <div class="quality-option ${audioQuality === 'normal' ? 'active' : ''}" onclick="setAudioQuality('normal')">
                            <div class="quality-info">
                                <h4>Normal</h4>
                                <p>160 kbps - Good quality</p>
                            </div>
                            <span class="quality-check">${audioQuality === 'normal' ? '✓' : ''}</span>
                        </div>
                        <div class="quality-option ${audioQuality === 'high' ? 'active' : ''}" onclick="setAudioQuality('high')">
                            <div class="quality-info">
                                <h4>High</h4>
                                <p>320 kbps - Best quality</p>
                            </div>
                            <span class="quality-check">${audioQuality === 'high' ? '✓' : ''}</span>
                        </div>
                        <div class="quality-option ${audioQuality === 'very-high' ? 'active' : ''}" onclick="setAudioQuality('very-high')">
                            <div class="quality-info">
                                <h4>Very High</h4>
                                <p>Lossless - Studio quality</p>
                            </div>
                            <span class="quality-check">${audioQuality === 'very-high' ? '✓' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create Dark/Light Mode page
function createThemeModePage() {
    return `
        <div class="settings-page">
            <div class="settings-header">
                <button class="back-btn" onclick="showProfilePage()">← Back</button>
                <h2>Appearance</h2>
            </div>
            <div class="settings-content">
                <div class="theme-settings">
                    <p class="theme-description">Choose your preferred theme</p>
                    <div class="theme-options">
                        <div class="theme-option ${isDarkMode ? 'active' : ''}" onclick="setTheme(true)">
                            <div class="theme-preview dark-preview">
                                <div class="preview-content">
                                    <div class="preview-bar"></div>
                                    <div class="preview-text"></div>
                                    <div class="preview-text short"></div>
                                </div>
                            </div>
                            <h4>Dark Mode</h4>
                            <p>Easy on the eyes</p>
                            <span class="theme-check">${isDarkMode ? '✓' : ''}</span>
                        </div>
                        <div class="theme-option ${!isDarkMode ? 'active' : ''}" onclick="setTheme(false)">
                            <div class="theme-preview light-preview">
                                <div class="preview-content">
                                    <div class="preview-bar"></div>
                                    <div class="preview-text"></div>
                                    <div class="preview-text short"></div>
                                </div>
                            </div>
                            <h4>Light Mode</h4>
                            <p>Bright and clear</p>
                            <span class="theme-check">${!isDarkMode ? '✓' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create profile page content
function createProfilePageHTML() {
    return `
        <div class="profile-page">
            <div class="profile-header">
                <div class="profile-avatar">
                    <img src="${userProfile.avatar}" alt="Profile" class="profile-avatar-img">
                </div>
                <div class="profile-info">
                    <h2 class="profile-name">${userProfile.name}</h2>
                    <p class="profile-bio">${userProfile.bio}</p>
                </div>
            </div>
            
            <div class="profile-stats">
                <div class="stat-item">
                    <span class="stat-icon">🎵</span>
                    <div class="stat-info">
                        <span class="stat-number">128</span>
                        <span class="stat-label">Songs Played</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">❤️</span>
                    <div class="stat-info">
                        <span class="stat-number">32</span>
                        <span class="stat-label">Liked Songs</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">📋</span>
                    <div class="stat-info">
                        <span class="stat-number">6</span>
                        <span class="stat-label">Playlists</span>
                    </div>
                </div>
            </div>
            
            <div class="profile-menu">
                <a href="#" class="profile-menu-item" onclick="event.preventDefault(); showEditProfile();">
                    <span class="menu-icon">👤</span>
                    <span>Edit Profile</span>
                    <span class="menu-arrow">›</span>
                </a>
                <a href="#" class="profile-menu-item" onclick="event.preventDefault(); showNotifications();">
                    <span class="menu-icon">🔔</span>
                    <span>Notifications</span>
                    <span class="menu-arrow">›</span>
                </a>
                <a href="#" class="profile-menu-item" onclick="event.preventDefault(); showAudioQuality();">
                    <span class="menu-icon">🎧</span>
                    <span>Audio Quality</span>
                    <span class="menu-arrow">›</span>
                </a>
                <a href="#" class="profile-menu-item" onclick="event.preventDefault(); showThemeMode();">
                    <span class="menu-icon">🌙</span>
                    <span>Dark / Light Mode</span>
                    <span class="menu-arrow">›</span>
                </a>
            </div>
        </div>
    `;
}

// Show profile page
function showProfilePage() {
    mainContent.innerHTML = createProfilePageHTML();
    mainContent.scrollTop = 0;
}

// Show Edit Profile
function showEditProfile() {
    mainContent.innerHTML = createEditProfilePage();
    mainContent.scrollTop = 0;
}

// Show Notifications
function showNotifications() {
    mainContent.innerHTML = createNotificationsPage();
    mainContent.scrollTop = 0;
}

// Show Audio Quality
function showAudioQuality() {
    mainContent.innerHTML = createAudioQualityPage();
    mainContent.scrollTop = 0;
}

// Show Theme Mode
function showThemeMode() {
    mainContent.innerHTML = createThemeModePage();
    mainContent.scrollTop = 0;
}

// Save profile
function saveProfile() {
    userProfile.name = document.getElementById('profileName').value;
    userProfile.bio = document.getElementById('profileBio').value;
    userProfile.email = document.getElementById('profileEmail').value;
    
    alert('Profile saved successfully!');
    showProfilePage();
}

// Toggle notification
function toggleNotification(setting, value) {
    notificationSettings[setting] = value;
    console.log('Notification settings updated:', notificationSettings);
}

// Set audio quality
function setAudioQuality(quality) {
    audioQuality = quality;
    console.log('Audio quality set to:', quality);
    showAudioQuality();
}

// Set theme
function setTheme(dark) {
    isDarkMode = dark;
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const musicPlayer = document.querySelector('.music-player');
    const bgShapes = document.querySelector('.bg-shapes');
    
    if (dark) {
        // Dark Mode
        body.style.background = '#000';
        body.style.color = '#fff';
        body.classList.remove('light-mode');
        
        if (sidebar) {
            sidebar.style.background = '#000';
            sidebar.style.borderRight = '1px solid rgba(255,255,255,.1)';
        }
        if (musicPlayer) {
            musicPlayer.style.background = 'rgba(0,0,0,.95)';
            musicPlayer.style.borderTop = '1px solid rgba(255,255,255,.1)';
        }
        
        // Reset shapes to white/light colors - preserve animations
        if (bgShapes) {
            const circles = bgShapes.querySelectorAll('.circle');
            const triangles = bgShapes.querySelectorAll('.triangle');
            const squares = bgShapes.querySelectorAll('.square');
            const hexagons = bgShapes.querySelectorAll('.hexagon');
            
            circles.forEach(circle => {
                circle.style.background = 'radial-gradient(circle, rgba(255,255,255,.25), transparent 70%)';
                circle.style.borderColor = 'rgba(255,255,255,.6)';
                circle.style.boxShadow = '0 0 80px rgba(255,255,255,.5), inset 0 0 50px rgba(255,255,255,.25)';
            });
            
            triangles.forEach((triangle, index) => {
                if (index === 0) triangle.style.borderBottomColor = 'rgba(255,255,255,.5)';
                if (index === 1) triangle.style.borderBottomColor = 'rgba(255,255,255,.45)';
                if (index === 2) triangle.style.borderBottomColor = 'rgba(255,255,255,.4)';
                triangle.style.boxShadow = '0 0 80px rgba(255,255,255,.6)';
            });
            
            squares.forEach(square => {
                square.style.background = 'rgba(255,255,255,.15)';
                square.style.borderColor = 'rgba(255,255,255,.6)';
                square.style.boxShadow = '0 0 70px rgba(255,255,255,.3), inset 0 0 40px rgba(255,255,255,.15)';
                square.style.opacity = '0.5';
            });
            
            hexagons.forEach(hexagon => {
                hexagon.style.background = 'rgba(255,255,255,.12)';
                hexagon.style.borderColor = 'rgba(255,255,255,.5)';
                hexagon.style.boxShadow = '0 0 65px rgba(255,255,255,.35)';
                hexagon.style.opacity = '0.45';
            });
        }
    } else {
        // Light Mode
        body.style.background = '#f5f5f5';
        body.style.color = '#000';
        body.classList.add('light-mode');
        
        if (sidebar) {
            sidebar.style.background = '#fff';
            sidebar.style.borderRight = '1px solid rgba(0,0,0,.1)';
        }
        if (musicPlayer) {
            musicPlayer.style.background = 'rgba(255,255,255,.95)';
            musicPlayer.style.borderTop = '1px solid rgba(0,0,0,.1)';
        }
        
        // Change shapes to black/dark colors - preserve animations
        if (bgShapes) {
            const circles = bgShapes.querySelectorAll('.circle');
            const triangles = bgShapes.querySelectorAll('.triangle');
            const squares = bgShapes.querySelectorAll('.square');
            const hexagons = bgShapes.querySelectorAll('.hexagon');
            
            circles.forEach(circle => {
                circle.style.background = 'radial-gradient(circle, rgba(0,0,0,.1), transparent 70%)';
                circle.style.borderColor = 'rgba(0,0,0,.4)';
                circle.style.boxShadow = '0 0 60px rgba(0,0,0,.3), inset 0 0 40px rgba(0,0,0,.15)';
            });
            
            triangles.forEach((triangle, index) => {
                if (index === 0) triangle.style.borderBottomColor = 'rgba(0,0,0,.35)';
                if (index === 1) triangle.style.borderBottomColor = 'rgba(0,0,0,.3)';
                if (index === 2) triangle.style.borderBottomColor = 'rgba(0,0,0,.25)';
                triangle.style.boxShadow = '0 0 60px rgba(0,0,0,.4)';
            });
            
            squares.forEach(square => {
                square.style.background = 'rgba(0,0,0,.08)';
                square.style.borderColor = 'rgba(0,0,0,.4)';
                square.style.boxShadow = '0 0 50px rgba(0,0,0,.18), inset 0 0 30px rgba(0,0,0,.08)';
            });
            
            hexagons.forEach(hexagon => {
                hexagon.style.background = 'rgba(0,0,0,.05)';
                hexagon.style.borderColor = 'rgba(0,0,0,.3)';
                hexagon.style.boxShadow = '0 0 45px rgba(0,0,0,.22)';
            });
        }
    }
    
    showThemeMode();
}

// Music Player
const playBtn = document.querySelector('.play-btn');
const videoPlayer = document.getElementById('videoPlayer'); // DECLARE ONCE HERE
let isPlaying = false;

playBtn.addEventListener('click', () => {
    // Use the videoPlayer variable declared above
    const videoContainer = document.getElementById('videoContainer');
    
    // Check if video is currently showing
    if (videoContainer.style.display === 'block') {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playBtn.textContent = '⏸';
            isPlaying = true;
            
            // Update Black Screen Mode
            if (typeof updateBlackModeInfo === 'function') {
                const title = document.getElementById('nowPlayingTitle')?.textContent || 'No song';
                const artist = document.getElementById('nowPlayingArtist')?.textContent || '';
                updateBlackModeInfo(title, artist, true);
            }
        } else {
            videoPlayer.pause();
            playBtn.textContent = '▶';
            isPlaying = false;
            
            // Update Black Screen Mode
            if (typeof updateBlackModeInfo === 'function') {
                const title = document.getElementById('nowPlayingTitle')?.textContent || 'No song';
                const artist = document.getElementById('nowPlayingArtist')?.textContent || '';
                updateBlackModeInfo(title, artist, false);
            }
        }
    } else {
        // No video playing, just toggle button
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? '⏸' : '▶';
    }
});

// Progress Bar
const progressBar = document.querySelector('.progress-bar');
// videoPlayer already declared above - don't redeclare!

// Update progress bar as video plays
videoPlayer.addEventListener('timeupdate', () => {
    if (videoPlayer.duration) {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        
        // Update standard progress bar if visible
        if (progressBar && progressBar.style.display !== 'none') {
            progressBar.value = progress;
            
            // Update progress bar color
            progressBar.style.background = `linear-gradient(to right, 
                rgba(255,255,255,.9) 0%, 
                rgba(255,255,255,.9) ${progress}%, 
                rgba(255,255,255,.2) ${progress}%, 
                rgba(255,255,255,.2) 100%)`;
        }
        
        // Update current time display
        const currentMinutes = Math.floor(videoPlayer.currentTime / 60);
        const currentSeconds = Math.floor(videoPlayer.currentTime % 60);
        const timeElements = document.querySelectorAll('.time');
        if (timeElements[0]) {
            timeElements[0].textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        }
        
        // Update total duration display
        const durationMinutes = Math.floor(videoPlayer.duration / 60);
        const durationSeconds = Math.floor(videoPlayer.duration % 60);
        if (timeElements[1]) {
            timeElements[1].textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
        }
    }
});

// Seek video when progress bar is changed
if (progressBar) {
    progressBar.addEventListener('input', (e) => {
        const videoContainer = document.getElementById('videoContainer');
        if (videoContainer.style.display === 'block' && videoPlayer.duration) {
            const seekTime = (e.target.value / 100) * videoPlayer.duration;
            videoPlayer.currentTime = seekTime;
            
            // Update progress bar color immediately
            const progress = e.target.value;
            progressBar.style.background = `linear-gradient(to right, 
                rgba(255,255,255,.9) 0%, 
                rgba(255,255,255,.9) ${progress}%, 
                rgba(255,255,255,.2) ${progress}%, 
                rgba(255,255,255,.2) 100%)`;
        }
    });
}

// Like Button
const likeBtn = document.querySelectorAll('.action-btn')[1];
likeBtn.addEventListener('click', () => {
    if (likeBtn.style.color === 'rgb(255, 255, 255)' || likeBtn.style.color === 'rgba(255, 255, 255, 0.95)') {
        likeBtn.style.color = '';
        likeBtn.style.filter = '';
    } else {
        likeBtn.style.color = 'rgba(255,255,255,.95)';
        likeBtn.style.filter = 'grayscale(100%) brightness(1.8)';
    }
});

// Shuffle Button
const shuffleBtn = document.getElementById('shuffleBtn');
let isShuffled = false;
if (shuffleBtn) {
    shuffleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isShuffled = !isShuffled;
        shuffleBtn.style.color = isShuffled ? 'rgba(255,255,255,.95)' : '';
        shuffleBtn.style.filter = isShuffled ? 'grayscale(100%) brightness(1.8)' : '';
        shuffleBtn.style.transform = isShuffled ? 'scale(1.1)' : 'scale(1)';
        console.log('Shuffle:', isShuffled ? 'ON' : 'OFF');
        
        // Visual feedback
        shuffleBtn.style.background = isShuffled ? 'rgba(255,255,255,.1)' : '';
    });
}

// Previous Button
const prevBtn = document.getElementById('prevBtn');
if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (currentTrackIndex > 0) {
            // Play previous track
            const prevTrack = playlist[currentTrackIndex - 1];
            playTrack(prevTrack.artist, prevTrack.song, prevTrack.image, prevTrack.video);
            console.log('Playing previous track:', prevTrack.song);
        } else if (currentTrackIndex === 0) {
            // Already at first track, restart current
            const videoPlayer = document.getElementById('videoPlayer');
            if (videoPlayer) {
                videoPlayer.currentTime = 0;
                console.log('Already at first track, restarting');
            }
        } else {
            // No track playing, play first track
            const firstTrack = playlist[0];
            playTrack(firstTrack.artist, firstTrack.song, firstTrack.image, firstTrack.video);
        }
    });
}

// Next Button
const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (currentTrackIndex >= 0 && currentTrackIndex < playlist.length - 1) {
            // Play next track
            const nextTrack = playlist[currentTrackIndex + 1];
            playTrack(nextTrack.artist, nextTrack.song, nextTrack.image, nextTrack.video);
            console.log('Playing next track:', nextTrack.song);
        } else if (currentTrackIndex === playlist.length - 1) {
            // At last track, loop to first if repeat all is on
            if (repeatMode === 1) {
                const firstTrack = playlist[0];
                playTrack(firstTrack.artist, firstTrack.song, firstTrack.image, firstTrack.video);
                console.log('Looping to first track');
            } else {
                console.log('Already at last track');
            }
        } else {
            // No track playing, play first track
            const firstTrack = playlist[0];
            playTrack(firstTrack.artist, firstTrack.song, firstTrack.image, firstTrack.video);
        }
    });
}

// Repeat Button
const repeatBtn = document.getElementById('repeatBtn');
let repeatMode = 0; // 0: off, 1: repeat all, 2: repeat one
if (repeatBtn) {
    repeatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        repeatMode = (repeatMode + 1) % 3;
        const videoPlayer = document.getElementById('videoPlayer');
        
        if (repeatMode === 0) {
            repeatBtn.style.color = '';
            repeatBtn.style.filter = '';
            repeatBtn.style.background = '';
            repeatBtn.textContent = '🔁';
            if (videoPlayer) videoPlayer.loop = false;
        } else if (repeatMode === 1) {
            repeatBtn.style.color = 'rgba(255,255,255,.95)';
            repeatBtn.style.filter = 'grayscale(100%) brightness(1.8)';
            repeatBtn.style.background = 'rgba(255,255,255,.1)';
            repeatBtn.textContent = '🔁';
            if (videoPlayer) videoPlayer.loop = false;
        } else {
            repeatBtn.style.color = 'rgba(255,255,255,.95)';
            repeatBtn.style.filter = 'grayscale(100%) brightness(1.8)';
            repeatBtn.style.background = 'rgba(255,255,255,.1)';
            repeatBtn.textContent = '🔂';
            if (videoPlayer) videoPlayer.loop = true;
        }
        console.log('Repeat mode:', repeatMode === 0 ? 'OFF' : repeatMode === 1 ? 'ALL' : 'ONE');
    });
}

// Volume Button
const volumeBtn = document.getElementById('volumeBtn');
let isMuted = false;
if (volumeBtn) {
    volumeBtn.addEventListener('click', () => {
        const videoPlayer = document.getElementById('videoPlayer');
        isMuted = !isMuted;
        videoPlayer.muted = isMuted;
        volumeBtn.textContent = isMuted ? '🔇' : '🔊';
    });
}

// Fullscreen Button
const fullscreenBtn = document.getElementById('fullscreenBtn');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        const videoPlayer = document.getElementById('videoPlayer');
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
        }
    });
}

// Video Fullscreen Button (on video itself)
const videoFullscreenBtn = document.getElementById('videoFullscreenBtn');
const lyricsOverlay = document.getElementById('lyricsOverlay');

if (videoFullscreenBtn) {
    videoFullscreenBtn.addEventListener('click', () => {
        const videoContainer = document.getElementById('videoContainer');
        const videoPlayer = document.getElementById('videoPlayer');
        
        // Show lyrics overlay
        if (lyricsOverlay) {
            lyricsOverlay.style.display = 'flex';
        }
        
        // Request fullscreen
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) {
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
        }
    });
}

// Hide lyrics when exit fullscreen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        lyricsOverlay.style.display = 'none';
    }
});

document.addEventListener('webkitfullscreenchange', () => {
    if (!document.webkitFullscreenElement) {
        lyricsOverlay.style.display = 'none';
    }
});

// Lyrics Button
const lyricsBtn = document.getElementById('lyricsBtn');
if (lyricsBtn) {
    lyricsBtn.addEventListener('click', () => {
        alert('Lyrics feature coming soon!');
    });
}

// Queue Button
const queueBtn = document.getElementById('queueBtn');
if (queueBtn) {
    queueBtn.addEventListener('click', () => {
        alert('Queue feature coming soon!');
    });
}

// Connect Button
const connectBtn = document.getElementById('connectBtn');
if (connectBtn) {
    connectBtn.addEventListener('click', () => {
        alert('Connect to device feature coming soon!');
    });
}

// Play Track Function - Update Album Highlight
// currentTrack already declared at top of file

// Lyrics database
const lyricsDatabase = {
    'videos/Timeless.mp4': {
        title: 'Timeless - The Weeknd ft. Playboi Carti',
        lyrics: [
            // [00:00] - Intro
            { time: 2, text: "XO" },
            { time: 8, text: "Ooh, yeah, ooh, yeah, no" },
            
            // [00:23] - Verse 1 (Playboi Carti)
            { time: 26, text: "Ever since I was a jit, knew I was the shit (Ooh, yeah)" },
            { time: 30, text: "Shorty keep wanna come 'round, she wanna get hit (Wanna get hit so hard)" },
            { time: 34, text: "She think she the main because I keep her by my side" },
            { time: 38, text: "Double-O, bust down the watch, she know that I'm timeless (Timeless)" },
            { time: 44, text: "I put my son in some Rick" },
            { time: 46, text: "I pull that gun off the hip" },
            { time: 48, text: "Pockets hold twenty-two clips (Ah)" },
            { time: 50, text: "I break her heart, Comme Garçon" },
            { time: 52, text: "Put on a shirt, get put on a blimp" },
            { time: 54, text: "Bitch like a stain, get ready to lick" },
            
            // [01:09] - Chorus
            { time: 72, text: "It don't matter what they say, I'm timeless (Schyeah)" },
            { time: 76, text: "Timeless, timeless, timeless, timeless (We timeless, oh)" },
            { time: 81, text: "Ever since I was a jit, knew I was the shit" },
            { time: 85, text: "Shorty keep wanna come 'round, she wanna get hit" },
            
            // [01:31] - Verse 2 (The Weeknd)
            { time: 94, text: "City on fire when I'm comin' home" },
            { time: 98, text: "Fill up the sky, I fill up the Dome" },
            { time: 102, text: "They'll play it one day, it's a hell of a show" },
            { time: 106, text: "I'm deep in the soul, I'm deep in the flow" },
            { time: 110, text: "House like a bank, deposit this bitch, deposit that check" },
            { time: 114, text: "Smile on my face, ain't playing shit, come and get checked" },
            
            // [02:41] - Chorus
            { time: 164, text: "It don't matter what they say, I'm timeless" },
            { time: 168, text: "Timeless, timeless, timeless, timeless" },
            
            // [03:04] - Bridge / Verse 3
            { time: 187, text: "Ever since I was a kid, I been legit (Homixide, Homixide)" },
            { time: 191, text: "If I was you, I would cut up my wrist" },
            { time: 195, text: "XO tatted all over her body, yeah" },
            { time: 199, text: "She just wanna roll and I don't mind it, yeah" },
            
            // [03:50] - Outro
            { time: 233, text: "Timeless, timeless, timeless" },
            { time: 237, text: "We timeless, oh" },
            { time: 241, text: "Timeless, timeless, timeless" },
            { time: 245, text: "We timeless, oh" }
        ]
    },
    'videos/Jamesarthur.mp4': {
        title: 'Say You Won\'t Let Go - James Arthur',
        lyrics: `I met you in the dark
You lit me up
You made me feel as though
I was enough

We danced the night away
We drank too much
I held your hair back when
You were throwing up

Then you smiled over your shoulder
For a minute, I was stone-cold sober
I pulled you closer to my chest

And you asked me to stay over
I said, I already told ya
I think that you should get some rest

I knew I loved you then
But you'd never know
'Cause I played it cool when I was scared of letting go

I know I needed you
But I never showed
But I wanna stay with you until we're grey and old

Just say you won't let go
Just say you won't let go`
    },
    'videos/Hindia.mp4': {
        title: 'Evaluasi - Hindia',
        lyrics: `Aku tahu kau lelah
Dengan semua yang terjadi
Aku tahu kau bosan
Dengan semua yang ada

Tapi percayalah
Semua akan baik-baik saja
Percayalah
Semua akan baik-baik saja

[Chorus]
Evaluasi diri
Evaluasi hati
Evaluasi pikiran
Evaluasi perasaan

Kita butuh waktu
Untuk menenangkan diri
Kita butuh ruang
Untuk bernafas lagi`
    },
    'videos/Justinbieber.mp4': {
        title: 'Love Yourself - Justin Bieber',
        lyrics: `For all the times that you rain on my parade
And all the clubs you get in using my name
You think you broke my heart, oh, girl, for goodness' sake
You think I'm crying on my own, well, I ain't

And I didn't wanna write a song
'Cause I didn't want anyone thinking I still care, I don't
But you still hit my phone up
And, baby, I be movin' on
And I think you should be somethin' I don't wanna hold back

Maybe you should know that
My mama don't like you and she likes everyone
And I never like to admit that I was wrong
And I've been so caught up in my job, didn't see what's going on
But now I know, I'm better sleeping on my own

'Cause if you like the way you look that much
Oh, baby, you should go and love yourself
And if you think that I'm still holdin' on to somethin'
You should go and love yourself`
    },
    'videos/One Direction - Night Changes.mp4': {
        title: 'Night Changes - One Direction',
        lyrics: `Going out tonight, changes into something red
Her mother doesn't like that kind of dress
Everything she never had, she's showing off
Driving too fast, moon is breaking through her hair
She's heading for something that she won't forget
Having no regrets is all that she really wants

We're only getting older, baby
And I've been thinking about it lately
Does it ever drive you crazy
Just how fast the night changes?
Everything that you've ever dreamed of
Disappearing when you wake up
But there's nothing to be afraid of
Even when the night changes
It will never change me and you

Chasing it tonight, doubts are running 'round her head
He's waiting, hides behind a cigarette
Heart is beating loud and she doesn't want it to stop
Moving too fast, moon is lighting up her skin
She's falling, doesn't even know it yet
Having no regrets is all that she really wants

We're only getting older, baby
And I've been thinking about it lately
Does it ever drive you crazy
Just how fast the night changes?
Everything that you've ever dreamed of
Disappearing when you wake up
But there's nothing to be afraid of
Even when the night changes
It will never change me and you

Going out tonight, changes into something red
Her mother doesn't like that kind of dress
Reminds her of the missing piece of innocence she lost`
    },
    'videos/Coldplay - Fix You (Official Video).mp4': {
        title: 'Fix You - Coldplay',
        lyrics: `[Lirik untuk Fix You - Coldplay]

Silakan tambahkan lirik lengkap di sini.
Anda bisa mencari lirik resmi dan menambahkannya sendiri.

Format: Teks biasa atau gunakan format synchronized seperti Timeless
untuk sinkronisasi lirik dengan musik.`
    },
    'videos/Lord Huron - The Night We Met (Official Audio).mp4': {
        title: 'The Night We Met - Lord Huron',
        lyrics: `[Lirik untuk The Night We Met - Lord Huron]

Silakan tambahkan lirik lengkap di sini.
Anda bisa mencari lirik resmi dan menambahkannya sendiri.

Format: Teks biasa atau gunakan format synchronized seperti Timeless
untuk sinkronisasi lirik dengan musik.`
    },
    'videos/Dewa 19 Aku Milikmu (HQ).mp4': {
        title: 'Aku Milikmu - Dewa 19',
        lyrics: `[Lirik untuk Aku Milikmu - Dewa 19]

Silakan tambahkan lirik lengkap di sini.
Anda bisa mencari lirik resmi dan menambahkannya sendiri.

Format: Teks biasa atau gunakan format synchronized seperti Timeless
untuk sinkronisasi lirik dengan musik.`
    },
    'videos/Wish You Were Here.mp4': {
        title: 'Wish You Were Here - Neck Deep',
        lyrics: `[Lirik untuk Wish You Were Here - Neck Deep]

Silakan tambahkan lirik lengkap di sini.
Anda bisa mencari lirik resmi dan menambahkannya sendiri.

Format: Teks biasa atau gunakan format synchronized seperti Timeless
untuk sinkronisasi lirik dengan musik.`
    },
    'videos/nadhif basalamah - penjaga hati (Official Music Video).mp4': {
        title: 'Penjaga Hati - Nadhif Basalamah',
        lyrics: `[Lirik untuk Penjaga Hati - Nadhif Basalamah]

Silakan tambahkan lirik lengkap di sini.
Anda bisa mencari lirik resmi dan menambahkannya sendiri.

Format: Teks biasa atau gunakan format synchronized seperti Timeless
untuk sinkronisasi lirik dengan musik.`
    }
};

function playTrack(artist, song, imagePath, videoPath) {
    console.log('🎵 playTrack called:', artist, song, videoPath);
    
    // Check if this is a new track (not toggle play/pause)
    const isNewTrack = currentTrack !== videoPath || videoPath === '';
    
    // Check if this is just play/pause toggle (same track)
    const isToggle = typeof isPlayPauseToggle === 'function' && isPlayPauseToggle(currentTrack, videoPath);
    
    // If new track and ritual mode available, use it
    if (isNewTrack && typeof startListeningRitual === 'function') {
        console.log('🎭 Starting Listening Ritual...');
        
        // Start ritual, then play track after ritual completes
        startListeningRitual(song, artist, () => {
            playTrackImmediate(artist, song, imagePath, videoPath);
        });
        return;
    }
    
    // If new track and transition available, use seamless transition
    if (isNewTrack && !isToggle && typeof performTrackTransition === 'function') {
        console.log('🎬 Using seamless track transition...');
        
        // Perform transition with callback to load new track
        performTrackTransition(() => {
            playTrackImmediate(artist, song, imagePath, videoPath);
        });
        return;
    }
    
    // Otherwise play immediately (for toggle play/pause or fallback)
    playTrackImmediate(artist, song, imagePath, videoPath);
}

function playTrackImmediate(artist, song, imagePath, videoPath) {
    console.log('🎵 playTrackImmediate called:', artist, song, videoPath);
    
    // Update current track index in playlist
    currentTrackIndex = playlist.findIndex(track => track.video === videoPath);
    console.log('📍 Current track index:', currentTrackIndex);
    
    const albumHighlight = document.getElementById('albumHighlight');
    const title = document.getElementById('nowPlayingTitle');
    const artistName = document.getElementById('nowPlayingArtist');
    const albumImg = document.getElementById('nowPlayingImg');
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const nowPlayingImage = document.getElementById('nowPlayingImage');
    const playBtn = document.querySelector('.play-btn');
    const lyricsBox = document.getElementById('lyricsBox');
    const lyricsBoxText = document.getElementById('lyricsBoxText');
    
    console.log('🎬 Video elements:', {
        videoContainer: !!videoContainer,
        videoPlayer: !!videoPlayer,
        videoSource: !!videoSource
    });
    
    // Remove empty class from now-playing-text when song is played
    const nowPlayingText = document.querySelector('.now-playing-text');
    if (nowPlayingText) {
        nowPlayingText.classList.remove('empty');
    }
    
    // Show mini visualizer
    const miniVisualizer = document.getElementById('miniVisualizer');
    if (miniVisualizer) {
        miniVisualizer.style.display = 'flex';
    }
    
    // Update music player bottom info
    const playerAlbumCover = document.getElementById('playerAlbumCover');
    const playerTrackName = document.getElementById('playerTrackName');
    const playerArtistName = document.getElementById('playerArtistName');
    
    playerAlbumCover.src = imagePath;
    playerAlbumCover.style.display = 'block';
    playerTrackName.textContent = song;
    playerArtistName.textContent = artist;
    
    // Update Black Screen Mode info if available
    if (typeof updateBlackModeInfo === 'function') {
        updateBlackModeInfo(song, artist, true);
    }
    
    // Check if clicking the same track
    if (currentTrack === videoPath && videoPath !== '') {
        console.log('🔄 Same track, toggling play/pause');
        // Toggle play/pause
        if (videoPlayer.paused) {
            videoPlayer.play();
            playBtn.textContent = '⏸';
        } else {
            videoPlayer.pause();
            playBtn.textContent = '▶';
        }
        return;
    }
    
    // New track selected
    currentTrack = videoPath;
    console.log('🆕 New track selected:', videoPath);
    
    // Update lyrics
    const lyricsTitle = document.getElementById('lyricsTitle');
    const lyricsText = document.getElementById('lyricsText');
    const lyricsContent = document.getElementById('lyricsContent');
    
    if (lyricsDatabase[videoPath]) {
        lyricsTitle.textContent = lyricsDatabase[videoPath].title;
        
        // Check if lyrics is array (synchronized) or string (static)
        if (Array.isArray(lyricsDatabase[videoPath].lyrics)) {
            // Synchronized lyrics
            currentLyricsData = lyricsDatabase[videoPath].lyrics;
            renderLyrics(currentLyricsData);
            lyricsBox.style.display = 'block';
            
            // Also render synchronized lyrics in fullscreen overlay
            if (lyricsContent) {
                // Clear existing content except title
                const title = lyricsContent.querySelector('h2');
                lyricsContent.innerHTML = '';
                if (title) lyricsContent.appendChild(title);
                
                // Add synchronized lyrics
                currentLyricsData.forEach((line, index) => {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'lyric-line';
                    lineDiv.dataset.time = line.time;
                    lineDiv.dataset.index = index;
                    
                    if (line.text === '') {
                        lineDiv.classList.add('empty');
                        lineDiv.innerHTML = '&nbsp;';
                    } else {
                        lineDiv.textContent = line.text;
                    }
                    
                    // Click to seek
                    lineDiv.addEventListener('click', () => {
                        const videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.currentTime = line.time;
                    });
                    
                    lyricsContent.appendChild(lineDiv);
                });
            }
        } else {
            // Static lyrics (old format)
            currentLyricsData = null;
            stopLyricsSync();
            
            // Update fullscreen with static lyrics
            if (lyricsText) {
                lyricsText.textContent = lyricsDatabase[videoPath].lyrics;
            }
            
            // Show static lyrics in box
            const lyricsBoxContent = document.getElementById('lyricsBoxContent');
            const lyricsLines = lyricsDatabase[videoPath].lyrics.split('\n');
            lyricsBoxContent.innerHTML = '';
            lyricsLines.forEach(line => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'lyric-line';
                lineDiv.textContent = line || '\u00A0';
                lyricsBoxContent.appendChild(lineDiv);
            });
            lyricsBox.style.display = 'block';
        }
    } else {
        lyricsTitle.textContent = `${song} - ${artist}`;
        if (lyricsText) {
            lyricsText.textContent = 'Lyrics not available for this song.';
        }
        currentLyricsData = null;
        stopLyricsSync();
        
        // Update lyrics box
        const lyricsBoxContent = document.getElementById('lyricsBoxContent');
        lyricsBoxContent.innerHTML = '<div class="lyric-line" style="font-size: 18px; color: rgba(255,255,255,.5);">Lyrics not available for this song.</div>';
        lyricsBox.style.display = 'block';
    }
    
    // Update text content with adaptive typography
    if (typeof updateSongTitle === 'function') {
        // Use adaptive typography function
        updateSongTitle(title, song);
    } else {
        // Fallback if adaptive typography not loaded
        title.textContent = song.toUpperCase();
    }
    artistName.textContent = artist;
    
    // Update album image
    albumImg.src = imagePath;
    
    // If video path is provided, show video in the small box
    if (videoPath && videoPath !== '') {
        console.log('🎬 Loading video:', videoPath);
        videoSource.src = videoPath;
        videoPlayer.load(); // Reload video with new source
        videoContainer.style.display = 'block';
        nowPlayingImage.style.display = 'none';
        
        console.log('▶️ Attempting to play video...');
        // Auto play video and start lyrics sync
        videoPlayer.play().then(() => {
            console.log('✅ Video playing successfully!');
            playBtn.textContent = '⏸';
            if (currentLyricsData) {
                startLyricsSync();
            }
        }).catch(err => {
            console.error('❌ Auto-play prevented:', err);
            playBtn.textContent = '▶';
        });
    } else {
        console.log('📷 No video path, showing image only');
        // No video, just show album image
        videoContainer.style.display = 'none';
        nowPlayingImage.style.display = 'block';
        lyricsBox.style.display = 'none';
        
        // Update play button to play icon
        playBtn.textContent = '▶';
    }
    
    // Update background image with smooth transition
    const style = document.createElement('style');
    style.textContent = `
        #albumHighlight::before {
            background-image: url('${imagePath}') !important;
        }
    `;
    
    // Remove old style if exists
    const oldStyle = document.getElementById('dynamic-bg-style');
    if (oldStyle) {
        oldStyle.remove();
    }
    
    style.id = 'dynamic-bg-style';
    document.head.appendChild(style);
    
    // Add animation effect
    albumHighlight.style.transform = 'scale(1.02)';
    setTimeout(() => {
        albumHighlight.style.transform = 'scale(1)';
    }, 300);
}


// Synchronized Lyrics System
let lyricsUpdateInterval = null;
let currentLyricsData = null;

// Function to render lyrics lines
function renderLyrics(lyricsArray) {
    const lyricsBoxContent = document.getElementById('lyricsBoxContent');
    lyricsBoxContent.innerHTML = '';
    
    lyricsArray.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'lyric-line';
        lineDiv.dataset.time = line.time;
        lineDiv.dataset.index = index;
        
        if (line.text === '') {
            lineDiv.classList.add('empty');
            lineDiv.innerHTML = '&nbsp;';
        } else {
            lineDiv.textContent = line.text;
        }
        
        // Click to seek
        lineDiv.addEventListener('click', () => {
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.currentTime = line.time;
        });
        
        lyricsBoxContent.appendChild(lineDiv);
    });
}

// Function to update active lyric line
function updateActiveLyric(currentTime) {
    if (!currentLyricsData) return;
    
    // Update lyrics in lyrics box
    const boxLines = document.querySelectorAll('#lyricsBoxContent .lyric-line');
    // Update lyrics in fullscreen overlay
    const overlayLines = document.querySelectorAll('#lyricsContent .lyric-line');
    
    let activeIndex = -1;
    
    // Find the active line
    for (let i = currentLyricsData.length - 1; i >= 0; i--) {
        if (currentTime >= currentLyricsData[i].time) {
            activeIndex = i;
            break;
        }
    }
    
    // Update classes - Spotify style for both box and overlay
    [boxLines, overlayLines].forEach(lines => {
        lines.forEach((line, index) => {
            line.classList.remove('active', 'passed');
            
            if (index === activeIndex) {
                line.classList.add('active');
            } else if (index < activeIndex) {
                line.classList.add('passed');
            }
        });
    });
    
    // Auto scroll lyrics box
    if (boxLines.length > 0 && activeIndex >= 0) {
        const activeLine = boxLines[activeIndex];
        const container = document.getElementById('lyricsBoxContent');
        if (container && activeLine) {
            const lineTop = activeLine.offsetTop;
            const containerHeight = container.clientHeight;
            const scrollTo = lineTop - (containerHeight / 3);
            
            container.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        }
    }
    
    // Auto scroll fullscreen overlay
    if (overlayLines.length > 0 && activeIndex >= 0) {
        const activeLine = overlayLines[activeIndex];
        const container = document.querySelector('.lyrics-overlay');
        if (container && activeLine) {
            const lineTop = activeLine.offsetTop;
            const containerHeight = container.clientHeight;
            const scrollTo = lineTop - (containerHeight / 3);
            
            container.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        }
    }
}

// Start lyrics sync
function startLyricsSync() {
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (lyricsUpdateInterval) {
        clearInterval(lyricsUpdateInterval);
    }
    
    lyricsUpdateInterval = setInterval(() => {
        if (!videoPlayer.paused && currentLyricsData) {
            updateActiveLyric(videoPlayer.currentTime);
        }
    }, 100); // Update every 100ms for smooth sync
}

// Stop lyrics sync
function stopLyricsSync() {
    if (lyricsUpdateInterval) {
        clearInterval(lyricsUpdateInterval);
        lyricsUpdateInterval = null;
    }
}

// Update video player event listeners for lyrics
const videoPlayerForLyrics = document.getElementById('videoPlayer');
videoPlayerForLyrics.addEventListener('play', () => {
    if (currentLyricsData) {
        startLyricsSync();
    }
});

videoPlayerForLyrics.addEventListener('pause', () => {
    stopLyricsSync();
});

videoPlayerForLyrics.addEventListener('seeked', () => {
    if (currentLyricsData) {
        updateActiveLyric(videoPlayerForLyrics.currentTime);
    }
});

// Force restart animations on page load
window.addEventListener('load', () => {
    const bgShapes = document.querySelector('.bg-shapes');
    if (bgShapes) {
        // Force reflow to restart animations
        bgShapes.style.display = 'none';
        bgShapes.offsetHeight; // Trigger reflow
        bgShapes.style.display = '';
        
        // Ensure all shapes are animating
        const allShapes = bgShapes.querySelectorAll('.circle, .triangle, .square, .hexagon');
        allShapes.forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
    }
});

// Also restart on visibility change (when tab becomes active)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        const bgShapes = document.querySelector('.bg-shapes');
        if (bgShapes) {
            const allShapes = bgShapes.querySelectorAll('.circle, .triangle, .square, .hexagon');
            allShapes.forEach(shape => {
                shape.style.animationPlayState = 'running';
            });
        }
    }
});


// ========================================
// MODERN NEONWAVE ENHANCEMENTS
// ========================================

// Vinyl Spinning Effect
const nowPlayingImage = document.getElementById('nowPlayingImage');
const audioVisualizer = document.getElementById('audioVisualizer');
const miniVisualizer = document.getElementById('miniVisualizer');

// Update vinyl spinning based on play/pause
videoPlayer.addEventListener('play', () => {
    nowPlayingImage.classList.add('playing');
    nowPlayingImage.classList.remove('paused');
    if (audioVisualizer) {
        audioVisualizer.style.display = 'flex';
    }
    // Show mini visualizer when playing
    if (miniVisualizer) {
        miniVisualizer.style.display = 'flex';
    }
    // Start real-time audio visualizers
    startVisualizers();
    
    // Start beat reactive micro motion
    if (typeof startBeatReactive === 'function') {
        startBeatReactive(videoPlayer);
    }
});

videoPlayer.addEventListener('pause', () => {
    nowPlayingImage.classList.remove('playing');
    nowPlayingImage.classList.add('paused');
    if (audioVisualizer) {
        audioVisualizer.style.display = 'none';
    }
    // Hide mini visualizer when paused
    if (miniVisualizer) {
        miniVisualizer.style.display = 'none';
    }
    // Stop real-time audio visualizers
    stopVisualizers();
    
    // Stop beat reactive micro motion
    if (typeof stopBeatReactive === 'function') {
        stopBeatReactive();
    }
});

// Enhanced like button with pop effect
const likeBtnEnhanced = document.querySelectorAll('.action-btn')[1];
if (likeBtnEnhanced) {
    const originalLikeClick = likeBtnEnhanced.onclick;
    likeBtnEnhanced.addEventListener('click', () => {
        likeBtnEnhanced.classList.add('liked');
        setTimeout(() => {
            likeBtnEnhanced.classList.remove('liked');
        }, 300);
    });
}

// Smooth scroll for trending grid
const trendingGrid = document.querySelector('.trending-grid');
if (trendingGrid) {
    trendingGrid.style.scrollBehavior = 'smooth';
}

// Add gradient accent animation to logo
const logo = document.querySelector('.logo h1');
if (logo) {
    logo.classList.add('gradient-accent');
}

// Enhanced hover effects for trending items
const trendingItems = document.querySelectorAll('.trending-item');
trendingItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const playBtn = item.querySelector('.trending-play-btn');
        if (playBtn) {
            playBtn.style.transform = 'scale(1.2)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const playBtn = item.querySelector('.trending-play-btn');
        if (playBtn) {
            playBtn.style.transform = 'scale(1)';
        }
    });
});

// Add shimmer effect to progress bar
const progressContainer = document.querySelector('.progress-container');
if (progressContainer) {
    progressContainer.classList.add('shimmer-effect');
}

// Neon glow pulse animation for active nav item
setInterval(() => {
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        activeNav.style.transition = 'box-shadow 0.5s ease';
        activeNav.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.08)';
        setTimeout(() => {
            activeNav.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)';
        }, 500);
    }
}, 2000);

console.log('🎵 NeonWave Modern UI Loaded Successfully!');


// ========================================
// REAL-TIME AUDIO VISUALIZER
// ========================================

// NOTE: Audio Context is now handled by beat-reactive.js
// This prevents multiple audio contexts from conflicting
let animationIdMini = null;
let animationIdMain = null;

// Use CSS animation fallback for visualizers
function initAudioVisualizer() {
    console.log('✅ Using CSS animation for visualizers (Audio Context in beat-reactive.js)');
    const miniBars = document.querySelectorAll('.mini-visualizer .mini-bar');
    miniBars.forEach((bar, index) => {
        bar.style.animation = `mini-visualizer-pulse ${0.8 + index * 0.1}s ease-in-out infinite`;
    });
    
    const mainBars = document.querySelectorAll('#audioVisualizer .visualizer-bar');
    mainBars.forEach((bar, index) => {
        bar.style.animation = `visualizer-pulse ${0.6 + index * 0.05}s ease-in-out infinite`;
    });
}

// Update mini visualizer bars (CSS animation fallback)
function updateMiniVisualizer() {
    // Using CSS animation instead
    return;
}

// Update main visualizer (CSS animation fallback)
function updateMainVisualizer() {
    // Using CSS animation instead
    return;
}

// Start visualizers
function startVisualizers() {
    initAudioVisualizer();
}

// Stop visualizers
function stopVisualizers() {
    // CSS animations continue, no need to stop
    return;
}

console.log('🎵 Real-time Audio Visualizer Ready!');


