// ========================================
// NEONWAVE MUSIC - NOTIFICATION SYSTEM
// Web Push Notifications for Music Playback
// ========================================

class MusicNotificationManager {
    constructor() {
        this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
        this.permission = this.isSupported ? Notification.permission : 'denied';
        this.serviceWorkerRegistration = null;
        this.notificationQueue = [];
        this.isProcessing = false;
        this.lastNotificationTime = 0;
        this.minNotificationDelay = 300; // 300ms delay for smooth feel
        
        console.log('🔔 Notification Manager initialized');
        console.log('📱 Support:', this.isSupported);
        console.log('🔐 Permission:', this.permission);
    }
    
    /**
     * Initialize notification system
     */
    async init() {
        if (!this.isSupported) {
            console.warn('⚠️ Notifications not supported in this browser');
            return false;
        }
        
        try {
            // Register service worker
            await this.registerServiceWorker();
            
            console.log('✅ Notification system initialized');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to initialize notifications:', error);
            return false;
        }
    }
    
    /**
     * Register service worker
     */
    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });
            
            this.serviceWorkerRegistration = registration;
            console.log('✅ Service Worker registered:', registration.scope);
            
            // Wait for service worker to be ready
            await navigator.serviceWorker.ready;
            console.log('✅ Service Worker ready');
            
            return registration;
            
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
            throw error;
        }
    }
    
    /**
     * Request notification permission
     */
    async requestPermission() {
        if (!this.isSupported) {
            console.warn('⚠️ Notifications not supported');
            return false;
        }
        
        if (this.permission === 'granted') {
            console.log('✅ Permission already granted');
            return true;
        }
        
        try {
            console.log('🔔 Requesting notification permission...');
            
            const permission = await Notification.requestPermission();
            this.permission = permission;
            
            if (permission === 'granted') {
                console.log('✅ Notification permission granted!');
                
                // Show welcome notification
                await this.showWelcomeNotification();
                
                return true;
            } else {
                console.log('❌ Notification permission denied');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Error requesting permission:', error);
            return false;
        }
    }
    
    /**
     * Show welcome notification
     */
    async showWelcomeNotification() {
        try {
            await this.triggerNotification(
                'Welcome to NeonWave',
                'Notifications enabled! You\'ll see updates when songs change.',
                '/images/anime-avatar..jpeg'
            );
        } catch (error) {
            console.error('❌ Error showing welcome notification:', error);
        }
    }
    
    /**
     * Main function to trigger music notification
     * @param {string} title - Song title
     * @param {string} artist - Artist name
     * @param {string} cover - Cover image URL
     */
    async triggerMusicNotification(title, artist, cover) {
        if (!this.isSupported) {
            console.warn('⚠️ Notifications not supported');
            return false;
        }
        
        if (this.permission !== 'granted') {
            console.warn('⚠️ Notification permission not granted');
            return false;
        }
        
        try {
            // Add to queue
            this.notificationQueue.push({ title, artist, cover });
            
            // Process queue
            await this.processNotificationQueue();
            
            return true;
            
        } catch (error) {
            console.error('❌ Error triggering notification:', error);
            return false;
        }
    }
    
    /**
     * Process notification queue with delay
     */
    async processNotificationQueue() {
        if (this.isProcessing || this.notificationQueue.length === 0) {
            return;
        }
        
        this.isProcessing = true;
        
        while (this.notificationQueue.length > 0) {
            // Get latest notification (skip old ones if multiple in queue)
            const notification = this.notificationQueue[this.notificationQueue.length - 1];
            this.notificationQueue = []; // Clear queue
            
            // Calculate delay
            const now = Date.now();
            const timeSinceLastNotification = now - this.lastNotificationTime;
            const delay = Math.max(0, this.minNotificationDelay - timeSinceLastNotification);
            
            // Wait for smooth transition
            if (delay > 0) {
                await this.sleep(delay);
            }
            
            // Show notification
            await this.showNotification(notification.title, notification.artist, notification.cover);
            
            this.lastNotificationTime = Date.now();
        }
        
        this.isProcessing = false;
    }
    
    /**
     * Show notification via service worker
     */
    async showNotification(title, artist, cover) {
        try {
            console.log('🔔 Showing notification:', title, '-', artist);
            
            if (!this.serviceWorkerRegistration) {
                console.error('❌ Service Worker not registered');
                return;
            }
            
            // Send message to service worker
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'SHOW_NOTIFICATION',
                    payload: {
                        title: title,
                        artist: artist,
                        cover: cover,
                        badge: '/images/anime-avatar..jpeg' // Use app logo
                    }
                });
            } else {
                // Fallback: Show notification directly
                await this.showNotificationDirect(title, artist, cover);
            }
            
            console.log('✅ Notification sent');
            
        } catch (error) {
            console.error('❌ Error showing notification:', error);
        }
    }
    
    /**
     * Show notification directly (fallback)
     */
    async showNotificationDirect(title, artist, cover) {
        const options = {
            body: artist,
            icon: cover || '/images/default-cover.png',
            badge: '/images/anime-avatar..jpeg',
            image: cover || '/images/default-cover.png',
            tag: 'neonwave-now-playing',
            requireInteraction: false,
            silent: false,
            vibrate: [200, 100, 200],
            data: {
                title: title,
                artist: artist,
                cover: cover,
                timestamp: Date.now()
            }
        };
        
        const notification = new Notification(`🎵 Now Playing`, options);
        
        // Handle click
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
        
        return notification;
    }
    
    /**
     * Trigger notification for song change
     */
    async onSongChange(title, artist, cover) {
        console.log('🎵 Song changed:', title);
        await this.triggerMusicNotification(title, artist, cover);
    }
    
    /**
     * Trigger notification for song skip
     */
    async onSongSkip(title, artist, cover) {
        console.log('⏭️ Song skipped:', title);
        await this.triggerMusicNotification(title, artist, cover);
    }
    
    /**
     * Trigger notification for song end
     */
    async onSongEnd(title, artist, cover) {
        console.log('⏹️ Song ended:', title);
        // Optional: Show notification when song ends
        // await this.triggerMusicNotification(title, artist, cover);
    }
    
    /**
     * Check if notifications are enabled
     */
    isEnabled() {
        return this.isSupported && this.permission === 'granted';
    }
    
    /**
     * Get permission status
     */
    getPermissionStatus() {
        return this.permission;
    }
    
    /**
     * Sleep utility
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Create global instance
const musicNotifications = new MusicNotificationManager();

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        musicNotifications.init();
    });
} else {
    musicNotifications.init();
}

// Export for use in other scripts
window.musicNotifications = musicNotifications;

console.log('✅ Music Notifications module loaded');
