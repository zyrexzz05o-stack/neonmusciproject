// Spotify API Configuration
const SPOTIFY_CONFIG = {
    CLIENT_ID: 'YOUR_SPOTIFY_CLIENT_ID', // Ganti dengan Client ID Anda
    CLIENT_SECRET: 'YOUR_SPOTIFY_CLIENT_SECRET', // Ganti dengan Client Secret Anda
    REDIRECT_URI: 'http://localhost:8080/callback', // Sesuaikan dengan setup Anda
};

// Spotify API Manager
class SpotifyAPI {
    constructor() {
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    // Get access token using Client Credentials Flow
    async getAccessToken() {
        if (this.accessToken && this.tokenExpiry > Date.now()) {
            return this.accessToken;
        }

        const credentials = btoa(`${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`);
        
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            });

            const data = await response.json();
            this.accessToken = data.access_token;
            this.tokenExpiry = Date.now() + (data.expires_in * 1000);
            
            console.log('✅ Spotify access token obtained');
            return this.accessToken;
        } catch (error) {
            console.error('❌ Error getting Spotify access token:', error);
            return null;
        }
    }

    // Search tracks
    async searchTracks(query, limit = 20) {
        const token = await this.getAccessToken();
        if (!token) return null;

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.tracks.items;
        } catch (error) {
            console.error('❌ Error searching tracks:', error);
            return null;
        }
    }

    // Get track details
    async getTrack(trackId) {
        const token = await this.getAccessToken();
        if (!token) return null;

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/tracks/${trackId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return await response.json();
        } catch (error) {
            console.error('❌ Error getting track:', error);
            return null;
        }
    }

    // Get artist details
    async getArtist(artistId) {
        const token = await this.getAccessToken();
        if (!token) return null;

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/artists/${artistId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return await response.json();
        } catch (error) {
            console.error('❌ Error getting artist:', error);
            return null;
        }
    }

    // Get new releases
    async getNewReleases(limit = 20) {
        const token = await this.getAccessToken();
        if (!token) return null;

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.albums.items;
        } catch (error) {
            console.error('❌ Error getting new releases:', error);
            return null;
        }
    }

    // Get featured playlists
    async getFeaturedPlaylists(limit = 20) {
        const token = await this.getAccessToken();
        if (!token) return null;

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.playlists.items;
        } catch (error) {
            console.error('❌ Error getting featured playlists:', error);
            return null;
        }
    }

    // Get recommendations based on seed tracks
    async getRecommendations(seedTracks, limit = 20) {
        const token = await this.getAccessToken();
        if (!token) return null;

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks.join(',')}&limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            return data.tracks;
        } catch (error) {
            console.error('❌ Error getting recommendations:', error);
            return null;
        }
    }
}

// Initialize Spotify API
const spotifyAPI = new SpotifyAPI();
