// Genre Handler - Hot Frequencies Genre System
console.log('🎸 Genre handler loaded');

// Genre data mapping
const genreData = {
    'pop': {
        name: 'Pop',
        icon: '🎤',
        status: '🔥 On Fire',
        statusClass: 'fire',
        trackCount: '3,240'
    },
    'rock': {
        name: 'Rock',
        icon: '🎸',
        status: '↑ Rising',
        statusClass: 'rising',
        trackCount: '2,450'
    },
    'hiphop': {
        name: 'Hip-Hop',
        icon: '🎧',
        status: '🔥 On Fire',
        statusClass: 'fire',
        trackCount: '2,890'
    },
    'electronic': {
        name: 'Electronic',
        icon: '🎹',
        status: '→ Stable',
        statusClass: 'stable',
        trackCount: '1,980'
    },
    'indie': {
        name: 'Indie',
        icon: '🎵',
        status: '↑ Rising',
        statusClass: 'rising',
        trackCount: '1,650'
    },
    'jazz': {
        name: 'Jazz',
        icon: '🎺',
        status: '↓ Cooling',
        statusClass: 'cooling',
        trackCount: '1,420'
    },
    'rnb': {
        name: 'R&B',
        icon: '🎤',
        status: '→ Stable',
        statusClass: 'stable',
        trackCount: '1,780'
    },
    'country': {
        name: 'Country',
        icon: '🤠',
        status: '↑ Rising',
        statusClass: 'rising',
        trackCount: '1,320'
    }
};

// Open genre page from Genre on Fire (trending sort)
function openGenrePage(genreId, sortMode = 'trending') {
    console.log(`🎵 Opening genre: ${genreId}, sort: ${sortMode}`);
    
    // Store genre info in sessionStorage
    sessionStorage.setItem('currentGenre', genreId);
    sessionStorage.setItem('genreSortMode', sortMode);
    
    // Load genre page
    if (typeof window.loadPage === 'function') {
        window.loadPage('Genre');
    } else {
        console.error('loadPage function not found');
    }
}

// Search genre from search bar
function searchGenre() {
    const input = document.getElementById('genreSearchInput');
    if (!input) return;
    
    const query = input.value.trim().toLowerCase();
    if (!query) {
        alert('Please enter a genre name');
        return;
    }
    
    console.log(`🔍 Searching genre: ${query}`);
    
    // Check if genre exists
    if (genreData[query]) {
        openGenrePage(query, 'default');
    } else {
        // Try to find similar genre
        const similarGenre = Object.keys(genreData).find(key => 
            key.includes(query) || genreData[key].name.toLowerCase().includes(query)
        );
        
        if (similarGenre) {
            openGenrePage(similarGenre, 'default');
        } else {
            alert(`Genre "${query}" not found. Try: rock, pop, jazz, electronic, indie, hiphop, rnb, country`);
        }
    }
}

// Quick search from suggestion chips
function quickSearchGenre(genreId) {
    console.log(`⚡ Quick search: ${genreId}`);
    openGenrePage(genreId, 'default');
}

// Back to Hot Frequencies
function backToHotFrequencies() {
    console.log('← Back to Hot Frequencies');
    if (typeof window.loadPage === 'function') {
        window.loadPage('Hot Frequencies');
    }
}

// Initialize genre page when loaded
function initGenrePage() {
    console.log('🎸 Initializing genre page');
    
    const genreId = sessionStorage.getItem('currentGenre') || 'rock';
    const sortMode = sessionStorage.getItem('genreSortMode') || 'trending';
    
    const genre = genreData[genreId];
    if (!genre) {
        console.error('Genre not found:', genreId);
        return;
    }
    
    // Update header
    const iconLarge = document.getElementById('genreIconLarge');
    const title = document.getElementById('genreTitle');
    const statusBadge = document.getElementById('genreStatusBadge');
    const trackCount = document.getElementById('genreTrackCount');
    const sortIndicator = document.getElementById('sortIndicator');
    
    if (iconLarge) iconLarge.textContent = genre.icon;
    if (title) title.textContent = genre.name;
    if (statusBadge) {
        statusBadge.textContent = genre.status;
        statusBadge.className = `genre-status-badge ${genre.statusClass}`;
    }
    if (trackCount) trackCount.textContent = `${genre.trackCount} tracks`;
    if (sortIndicator) {
        const sortText = sortMode === 'trending' ? 'Trending' : 'Relevance';
        sortIndicator.querySelector('.sort-text').textContent = `Sorted by: ${sortText}`;
    }
    
    // Setup filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            console.log('Filter changed:', filter);
            // Here you can implement actual filtering logic
        });
    });
    
    console.log('✅ Genre page initialized');
}

// Enter key support for search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('genreSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchGenre();
            }
        });
    }
});

// Export functions to window
window.openGenrePage = openGenrePage;
window.searchGenre = searchGenre;
window.quickSearchGenre = quickSearchGenre;
window.backToHotFrequencies = backToHotFrequencies;
window.initGenrePage = initGenrePage;
