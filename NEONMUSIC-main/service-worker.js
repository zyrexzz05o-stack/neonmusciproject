// ========================================
// NEONWAVE MUSIC - SERVICE WORKER
// Background Notification Handler
// ========================================

const CACHE_NAME = 'neonwave-music-v1';
const NOTIFICATION_TAG = 'neonwave-now-playing';

// Install event
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Installing...');
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker: Activated');
    event.waitUntil(self.clients.claim());
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Notification clicked:', event.notification.tag);
    
    event.notification.close();
    
    // Open or focus the app window
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if app is already open
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // If not open, open new window
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
    console.log('🔕 Notification closed:', event.notification.tag);
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, artist, cover, badge } = event.data.payload;
        
        showMusicNotification(title, artist, cover, badge);
    }
});

// Show music notification
async function showMusicNotification(title, artist, cover, badge) {
    try {
        const options = {
            body: `${artist}`,
            icon: cover || '/images/default-cover.png',
            badge: badge || '/images/logo-badge.png',
            image: cover || '/images/default-cover.png',
            tag: NOTIFICATION_TAG,
            requireInteraction: false,
            silent: false,
            vibrate: [200, 100, 200],
            data: {
                title: title,
                artist: artist,
                cover: cover,
                timestamp: Date.now()
            },
            actions: [
                {
                    action: 'open',
                    title: 'Open App',
                    icon: '/images/play-icon.png'
                }
            ]
        };
        
        await self.registration.showNotification(`🎵 Now Playing`, options);
        console.log('✅ Notification shown:', title);
        
    } catch (error) {
        console.error('❌ Error showing notification:', error);
    }
}

console.log('🎵 NeonWave Service Worker loaded');
