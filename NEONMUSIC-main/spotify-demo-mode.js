// Demo Mode - Testing without real Spotify API
// Uncomment this file in index.html to test without API credentials

const DEMO_TRACKS = [
    {
        id: '1',
        name: 'Blinding Lights',
        artists: [{ name: 'The Weeknd' }],
        album: {
            name: 'After Hours',
            images: [
                { url: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36' }
            ]
        },
        duration_ms: 200040,
        preview_url: 'https://p.scdn.co/mp3-preview/...' // Demo URL
    },
    {
        id: '2',
        name: 'Shape of You',
        artists: [{ name: 'Ed Sheeran' }],
        album: {
            name: '÷ (Divide)',
            images: [
                { url: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96' }
            ]
        },
        duration_ms: 233713,
        preview_url: 'https://p.scdn.co/mp3-preview/...'
    },
    {
        id: '3',
        name: 'Someone Like You',
        artists: [{ name: 'Adele' }],
        album: {
            name: '21',
            images: [
                { url: 'https://i.scdn.co/image/ab67616d0000b273372eb75a137e4f8e5e0e8e1e' }
            ]
        },
        duration_ms: 285000,
        preview_url: 'https://p.scdn.co/mp3-preview/...'
    }
];

// Override Spotify API with demo data
class SpotifyAPIDemoMode {
    async getAccessToken() {
        console.log('🎭 Demo Mode: Using fake token');
        return 'DEMO_TOKEN';
    }

    async searchTracks(query, limit = 20) {
        console.log('🎭 Demo Mode: Searching for:', query);
        // Filter demo tracks based on query
        return DEMO_TRACKS.filter(track => 
            track.name.toLowerCase().includes(query.toLowerCase()) ||
            track.artists[0].name.toLowerCase().includes(query.toLowerCase())
        );
    }

    async getNewReleases(limit = 20) {
        console.log('🎭 Demo Mode: Getting new releases');
        return DEMO_TRACKS.map(track => track.album);
    }

    async getTrack(trackId) {
        console.log('🎭 Demo Mode: Getting track:', trackId);
        return DEMO_TRACKS.find(t => t.id === trackId);
    }
}

// Replace real API with demo
window.spotifyAPI = new SpotifyAPIDemoMode();
console.log('🎭 Demo Mode Active - No real Spotify API calls');
