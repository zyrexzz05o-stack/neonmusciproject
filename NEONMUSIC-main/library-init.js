// Library Page Initialization
console.log('📚 Library init script loaded');

function initLibraryPage() {
    console.log('🔷 Initializing Library page...');
    
    const expandCards = document.querySelectorAll('.expand-card');
    console.log('📦 Found expand cards:', expandCards.length);
    
    if (expandCards.length === 0) {
        console.error('❌ No expand cards found!');
        return;
    }
    
    let currentOpenCard = null;
    
    expandCards.forEach((card, index) => {
        const header = card.querySelector('.expand-header');
        const content = card.querySelector('.expand-content');
        const chevron = card.querySelector('.expand-chevron');
        const section = card.dataset.section;
        
        console.log(`Card ${index}: ${section}`, {
            hasHeader: !!header,
            hasContent: !!content,
            hasChevron: !!chevron
        });
        
        if (!header || !content || !chevron) {
            console.error('❌ Missing elements in card:', section);
            return;
        }
        
        // Remove old listeners by cloning
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
        
        // Click header to toggle
        newHeader.addEventListener('click', (e) => {
            console.log('🖱️ Clicked:', section);
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = card.classList.contains('open');
            console.log('Current state:', isOpen ? 'open' : 'closed');
            
            // Different behavior based on section type
            if (section === 'playlists' || section === 'artists' || section === 'albums') {
                console.log('🔗 Navigation section:', section);
                handleNavigation(section);
                return;
            }
            
            // For other sections: expand/collapse behavior
            console.log('📂 Expandable section:', section);
            
            // Close currently open card (accordion behavior)
            if (currentOpenCard && currentOpenCard !== card) {
                console.log('Closing previous card');
                currentOpenCard.classList.remove('open');
                const prevContent = currentOpenCard.querySelector('.expand-content');
                const prevChevron = currentOpenCard.querySelector('.expand-chevron');
                if (prevContent) {
                    prevContent.style.maxHeight = '0';
                    prevContent.style.opacity = '0';
                }
                if (prevChevron) {
                    prevChevron.style.transform = 'rotate(0deg)';
                }
            }
            
            // Toggle current card
            if (isOpen) {
                console.log('Closing card');
                card.classList.remove('open');
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                chevron.style.transform = 'rotate(0deg)';
                currentOpenCard = null;
            } else {
                console.log('Opening card, scrollHeight:', content.scrollHeight);
                card.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                chevron.style.transform = 'rotate(180deg)';
                currentOpenCard = card;
                
                // Recalculate after a short delay to ensure proper height
                setTimeout(() => {
                    if (card.classList.contains('open')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        console.log('Recalculated height:', content.scrollHeight);
                    }
                }, 50);
            }
        });
    });
    
    // Handle navigation for specific sections
    function handleNavigation(section) {
        console.log('🔗 Navigating to:', section);
        
        switch(section) {
            case 'playlists':
                if (typeof loadPage === 'function') {
                    loadPage('Playlists');
                } else {
                    alert('Navigate to Playlists page');
                }
                break;
                
            case 'artists':
                alert('Navigate to Artists page (coming soon)');
                break;
                
            case 'albums':
                alert('Navigate to Albums page (coming soon)');
                break;
        }
    }
    
    // View All buttons
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    console.log('🔘 Found view all buttons:', viewAllBtns.length);
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('View all clicked');
            alert('View all functionality');
        });
    });
    
    // Click on recent songs to play
    const recentItems = document.querySelectorAll('.list-item-recent');
    console.log('🎵 Found recent items:', recentItems.length);
    recentItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('.item-title')?.textContent;
            const artist = item.querySelector('.item-artist')?.textContent;
            console.log('Play song:', title, 'by', artist);
            alert(`Play: ${title} - ${artist}`);
        });
    });
    
    // Click on playlist items
    const playlistItems = document.querySelectorAll('.grid-item');
    console.log('📋 Found playlist items:', playlistItems.length);
    playlistItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = item.querySelector('.grid-title')?.textContent;
            console.log('Open playlist:', title);
            alert(`Open playlist: ${title}`);
        });
    });
    
    // Click on artist items
    const artistItems = document.querySelectorAll('.artist-item');
    console.log('👥 Found artist items:', artistItems.length);
    artistItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = item.querySelector('.artist-name')?.textContent;
            console.log('Open artist:', name);
            alert(`Open artist: ${name}`);
        });
    });
    
    // Click on album items
    const albumItems = document.querySelectorAll('.album-item');
    console.log('💿 Found album items:', albumItems.length);
    albumItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = item.querySelector('.album-title')?.textContent;
            console.log('Open album:', title);
            alert(`Open album: ${title}`);
        });
    });
    
    // Click on history timeline songs
    const timelineSongs = document.querySelectorAll('.timeline-song');
    console.log('📜 Found timeline songs:', timelineSongs.length);
    timelineSongs.forEach(song => {
        song.addEventListener('click', () => {
            const title = song.querySelector('.timeline-title')?.textContent;
            console.log('Play from history:', title);
            alert(`Play from history: ${title}`);
        });
    });
    
    console.log('✅ Library initialized successfully');
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLibraryPage);
} else {
    // Check if library page is loaded
    if (document.querySelector('.library-expandable')) {
        initLibraryPage();
    }
}

// Export for manual initialization
window.initLibraryPage = initLibraryPage;
