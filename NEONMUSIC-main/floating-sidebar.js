// ========================================
// FLOATING SIDEBAR NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const navIcons = document.querySelectorAll('.nav-icon');
    const mainContent = document.querySelector('.main-content');
    
    // Navigation Click Handler
    navIcons.forEach((icon, index) => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all
            navIcons.forEach(nav => nav.classList.remove('active'));
            
            // Add active to clicked
            icon.classList.add('active');
            
            // Get label
            const label = icon.getAttribute('data-label');
            
            // Handle navigation based on label
            switch(label) {
                case 'Pulse':
                    loadPage('index.html');
                    break;
                case 'Hot Frequencies':
                    loadPage('hot-frequencies.html');
                    break;
                case 'Vault':
                    loadPage('library.html');
                    break;
                case 'Saved Waves':
                    loadPage('liked-songs.html');
                    break;
                case 'Settings':
                    openSettings();
                    break;
            }
            
            // Haptic feedback (if supported)
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        });
        
        // Hover sound effect (optional)
        icon.addEventListener('mouseenter', () => {
            // Add subtle hover sound here if needed
        });
    });
    
    // Load Page Function with smooth transition
    async function loadPage(page) {
        // Map page files to page names
        const pageNameMap = {
            'index.html': 'Home',
            'hot-frequencies.html': 'Hot Frequencies',
            'trending.html': 'Trending',
            'library.html': 'Library',
            'liked-songs.html': 'Liked Songs'
        };
        
        const pageName = pageNameMap[page] || 'Home';
        
        // Use the global loadPage function from script.js if available
        if (typeof window.loadPage === 'function') {
            await window.loadPage(pageName);
        } else {
            // Fallback: smooth transition with fade
            mainContent.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(40px)';
            
            await new Promise(resolve => setTimeout(resolve, 600));
            
            window.location.href = page;
        }
    }
    
    // Toggle Profile Panel
    function toggleProfile() {
        const profileSection = document.getElementById('profileSection');
        const profileOverlay = document.getElementById('profileOverlay');
        
        if (profileSection && profileOverlay) {
            const isActive = profileSection.classList.contains('active');
            
            if (isActive) {
                // Close - remove active class to trigger slide out animation
                profileSection.classList.remove('active');
                profileOverlay.classList.remove('active');
                
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    profileSection.style.display = 'none';
                    profileOverlay.style.display = 'none';
                }, 400); // Match transition duration
            } else {
                // Open - show and add active class
                profileSection.style.display = 'block';
                profileOverlay.style.display = 'block';
                
                // Force reflow to ensure display change is applied
                profileSection.offsetHeight;
                
                // Add active class to trigger slide in animation
                requestAnimationFrame(() => {
                    profileSection.classList.add('active');
                    profileOverlay.classList.add('active');
                });
            }
        }
    }
    
    // Close profile when clicking overlay
    const profileOverlay = document.getElementById('profileOverlay');
    if (profileOverlay) {
        profileOverlay.addEventListener('click', () => {
            const profileSection = document.getElementById('profileSection');
            if (profileSection && profileSection.classList.contains('active')) {
                // Remove active class first to trigger animation
                profileSection.classList.remove('active');
                profileOverlay.classList.remove('active');
                
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    profileSection.style.display = 'none';
                    profileOverlay.style.display = 'none';
                }, 400); // Match transition duration
            }
        });
    }
    
    // Close button handler
    const profileCloseBtn = document.getElementById('profileCloseBtn');
    if (profileCloseBtn) {
        profileCloseBtn.addEventListener('click', () => {
            const profileSection = document.getElementById('profileSection');
            const profileOverlay = document.getElementById('profileOverlay');
            if (profileSection && profileOverlay && profileSection.classList.contains('active')) {
                // Remove active class first to trigger animation
                profileSection.classList.remove('active');
                profileOverlay.classList.remove('active');
                
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    profileSection.style.display = 'none';
                    profileOverlay.style.display = 'none';
                }, 400); // Match transition duration
            }
        });
    }
    
    // Open Settings
    async function openSettings() {
        // Use the global loadPage function to load settings
        if (typeof window.loadPage === 'function') {
            await window.loadPage('Settings');
        } else {
            console.log('Settings clicked - loadPage not available');
        }
    }
    
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        const activeIndex = Array.from(navIcons).findIndex(icon => icon.classList.contains('active'));
        
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            
            let newIndex;
            if (e.key === 'ArrowUp') {
                newIndex = activeIndex > 0 ? activeIndex - 1 : navIcons.length - 1;
            } else {
                newIndex = activeIndex < navIcons.length - 1 ? activeIndex + 1 : 0;
            }
            
            navIcons[newIndex].click();
            navIcons[newIndex].focus();
        }
        
        if (e.key === 'Enter' && document.activeElement.classList.contains('nav-icon')) {
            document.activeElement.click();
        }
    });
    
    // Auto-hide on scroll (optional)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const sidebar = document.querySelector('.sidebar-floating');
        
        clearTimeout(scrollTimeout);
        sidebar.style.opacity = '0.5';
        
        scrollTimeout = setTimeout(() => {
            sidebar.style.opacity = '1';
        }, 150);
    });
    
    // Detect active page on load
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
        'index.html': 0,
        'trending.html': 1,
        'library.html': 2,
        'liked-songs.html': 3,
        'profile.html': 4
    };
    
    const activeIndex = pageMap[currentPage];
    if (activeIndex !== undefined && navIcons[activeIndex]) {
        navIcons.forEach(nav => nav.classList.remove('active'));
        navIcons[activeIndex].classList.add('active');
    }
});

// Smooth scroll to top when clicking logo
document.addEventListener('DOMContentLoaded', () => {
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

console.log('✅ Floating Sidebar Navigation Loaded');


// ========================================
// PROFILE SECTION MENU HANDLERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Setup profile menu item handlers
    setupProfileMenuHandlers();
});

function setupProfileMenuHandlers() {
    // Get profile section menu items
    const profileMenuItems = document.querySelectorAll('#profileSection .profile-menu-item');
    
    profileMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const menuText = item.querySelector('span:nth-child(2)').textContent.trim();
            
            // Close profile section first
            closeProfileSection();
            
            // Wait for profile to close, then show the page
            setTimeout(() => {
                switch(menuText) {
                    case 'Edit Profile':
                        if (typeof showEditProfile === 'function') {
                            showEditProfile();
                        }
                        break;
                    case 'Notifications':
                        if (typeof showNotifications === 'function') {
                            showNotifications();
                        }
                        break;
                    case 'Audio Quality':
                        if (typeof showAudioQuality === 'function') {
                            showAudioQuality();
                        }
                        break;
                    case 'Dark / Light Mode':
                        if (typeof showThemeMode === 'function') {
                            showThemeMode();
                        }
                        break;
                }
            }, 400); // Wait for profile close animation
        });
    });
}

function closeProfileSection() {
    const profileSection = document.getElementById('profileSection');
    const profileOverlay = document.getElementById('profileOverlay');
    
    if (profileSection && profileOverlay) {
        profileSection.classList.remove('active');
        profileOverlay.classList.remove('active');
        
        setTimeout(() => {
            profileSection.style.display = 'none';
            profileOverlay.style.display = 'none';
        }, 400);
    }
}

console.log('✅ Profile Menu Handlers Loaded');
