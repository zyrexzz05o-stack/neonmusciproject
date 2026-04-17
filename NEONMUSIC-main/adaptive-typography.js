// ========================================
// ADAPTIVE TYPOGRAPHY SCALING
// Auto-adjust font size based on text length
// ========================================

console.log('📝 [Adaptive Typography] Module Loading...');

/**
 * Calculate appropriate typography class based on text length
 */
function getTypographyClass(text) {
    if (!text) return 'title-medium';
    
    const length = text.length;
    
    if (length < 15) {
        return 'title-short';
    } else if (length >= 15 && length <= 25) {
        return 'title-medium';
    } else {
        return 'title-long';
    }
}

/**
 * Apply adaptive typography to song title
 */
function applyAdaptiveTypography(titleElement, text) {
    if (!titleElement || !text) return;
    
    // Remove all typography classes
    titleElement.classList.remove('title-short', 'title-medium', 'title-long');
    
    // Get appropriate class
    const typographyClass = getTypographyClass(text);
    
    // Add new class
    titleElement.classList.add(typographyClass);
    
    console.log(`📝 Typography: "${text}" (${text.length} chars) → ${typographyClass}`);
}

/**
 * Update song title with adaptive typography
 */
function updateSongTitle(titleElement, text) {
    if (!titleElement) return;
    
    // Set text content (uppercase)
    titleElement.textContent = text.toUpperCase();
    
    // Apply adaptive typography
    applyAdaptiveTypography(titleElement, text);
}

/**
 * Initialize adaptive typography for existing title
 */
function initAdaptiveTypography() {
    console.log('📝 Initializing Adaptive Typography...');
    
    // Get NOW PLAYING title element
    const titleElement = document.querySelector('.now-playing-text h2');
    
    if (titleElement && titleElement.textContent) {
        const currentText = titleElement.textContent;
        applyAdaptiveTypography(titleElement, currentText);
    }
    
    console.log('✅ Adaptive Typography initialized');
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdaptiveTypography);
} else {
    initAdaptiveTypography();
}

// Export functions to global scope
window.updateSongTitle = updateSongTitle;
window.applyAdaptiveTypography = applyAdaptiveTypography;
window.getTypographyClass = getTypographyClass;

console.log('✅ [Adaptive Typography] Module Loaded');
