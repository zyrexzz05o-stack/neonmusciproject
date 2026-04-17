// ========================================
// NEONWAVE MUSIC - IN-APP POPUP NOTIFICATIONS
// Toast-style notifications inside the app
// ========================================

class PopupNotificationManager {
    constructor() {
        this.container = null;
        this.activeNotifications = [];
        this.maxNotifications = 3;
        this.defaultDuration = 4000; // 4 seconds
        
        this.init();
        console.log('🎨 Popup Notification Manager initialized');
    }
    
    /**
     * Initialize notification container
     */
    init() {
        // Create container if not exists
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'popupNotificationContainer';
            this.container.className = 'popup-notification-container';
            document.body.appendChild(this.container);
        }
    }
    
    /**
     * Show music notification popup
     * @param {string} title - Song title
     * @param {string} artist - Artist name
     * @param {string} cover - Cover image URL
     * @param {number} duration - Duration in ms (0 = no auto-dismiss)
     */
    showMusicNotification(title, artist, cover, duration = 0) {
        console.log('🎵 Showing popup notification:', title);
        
        // Remove previous music notifications (replace with new one)
        const existingMusicNotifs = this.container.querySelectorAll('.popup-notification:not(.popup-toast)');
        existingMusicNotifs.forEach(notif => {
            this.removeNotification(notif);
        });
        
        // Create notification element
        const notification = this.createNotificationElement(title, artist, cover);
        
        // Add to container
        this.container.appendChild(notification);
        this.activeNotifications.push(notification);
        
        // Limit max notifications
        if (this.activeNotifications.length > this.maxNotifications) {
            this.removeNotification(this.activeNotifications[0]);
        }
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after duration (if duration > 0)
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, duration);
        }
        
        return notification;
    }
    
    /**
     * Create notification element
     */
    createNotificationElement(title, artist, cover) {
        const notification = document.createElement('div');
        notification.className = 'popup-notification';
        
        notification.innerHTML = `
            <div class="popup-notification-content">
                <div class="popup-notification-icon">
                    <img src="${cover}" alt="Cover" onerror="this.src='images/anime-avatar..jpeg'">
                </div>
                <div class="popup-notification-text">
                    <div class="popup-notification-label">Now Playing</div>
                    <div class="popup-notification-title">${this.escapeHtml(title)}</div>
                    <div class="popup-notification-artist">${this.escapeHtml(artist)}</div>
                </div>
                <button class="popup-notification-close" onclick="window.popupNotifications.removeNotification(this.closest('.popup-notification'))">
                    ×
                </button>
            </div>
        `;
        
        // Add click handler to focus player
        notification.addEventListener('click', (e) => {
            if (!e.target.classList.contains('popup-notification-close')) {
                this.onNotificationClick();
            }
        });
        
        return notification;
    }
    
    /**
     * Remove notification
     */
    removeNotification(notification) {
        if (!notification || !notification.parentNode) return;
        
        // Animate out
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            
            // Remove from active list
            const index = this.activeNotifications.indexOf(notification);
            if (index > -1) {
                this.activeNotifications.splice(index, 1);
            }
        }, 300);
    }
    
    /**
     * Handle notification click
     */
    onNotificationClick() {
        console.log('🎵 Notification clicked');
        
        // Scroll to player
        const albumHighlight = document.getElementById('albumHighlight');
        if (albumHighlight) {
            albumHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    /**
     * Show simple toast notification
     */
    showToast(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `popup-notification popup-toast popup-toast-${type}`;
        
        notification.innerHTML = `
            <div class="popup-notification-content">
                <div class="popup-toast-icon">${this.getToastIcon(type)}</div>
                <div class="popup-toast-message">${this.escapeHtml(message)}</div>
                <button class="popup-notification-close" onclick="window.popupNotifications.removeNotification(this.closest('.popup-notification'))">
                    ×
                </button>
            </div>
        `;
        
        this.container.appendChild(notification);
        this.activeNotifications.push(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => this.removeNotification(notification), duration);
        
        return notification;
    }
    
    /**
     * Get toast icon based on type
     */
    getToastIcon(type) {
        const icons = {
            'success': '✓',
            'error': '✕',
            'warning': '⚠',
            'info': 'ℹ'
        };
        return icons[type] || icons.info;
    }
    
    /**
     * Clear all notifications
     */
    clearAll() {
        this.activeNotifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }
    
    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Create global instance
const popupNotifications = new PopupNotificationManager();

// Export for use in other scripts
window.popupNotifications = popupNotifications;

console.log('✅ Popup Notifications module loaded');
