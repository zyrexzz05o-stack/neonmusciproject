// ========================================
// THEME MODES OVERRIDE
// Add Neural Glass mode to Appearance page
// ========================================

console.log('🎨 [Theme Modes Override] Loading...');

// Override createThemeModePage to add Neural Glass
window.addEventListener('DOMContentLoaded', () => {
    // Store original function
    const originalCreateThemeModePage = window.createThemeModePage;
    
    // Override with new version
    window.createThemeModePage = function() {
        return `
            <div class="settings-page">
                <div class="settings-header">
                    <button class="back-btn" onclick="loadPage('Settings')">← Back</button>
                    <h2>Appearance</h2>
                </div>
                <div class="settings-content">
                    <div class="theme-settings">
                        <p class="theme-description">Choose your preferred background</p>
                        <div class="theme-options">
                            <div class="theme-option ${window.backgroundMode === 'dark' ? 'active' : ''}" onclick="setBackgroundMode('dark')">
                                <div class="theme-preview dark-preview">
                                    <div class="preview-content">
                                        <div class="preview-bar"></div>
                                        <div class="preview-text"></div>
                                        <div class="preview-text short"></div>
                                    </div>
                                </div>
                                <h4>Dark Mode</h4>
                                <p>Easy on the eyes</p>
                                <span class="theme-check">${window.backgroundMode === 'dark' ? '✓' : ''}</span>
                            </div>
                            <div class="theme-option ${window.backgroundMode === 'light' ? 'active' : ''}" onclick="setBackgroundMode('light')">
                                <div class="theme-preview light-preview">
                                    <div class="preview-content">
                                        <div class="preview-bar"></div>
                                        <div class="preview-text"></div>
                                        <div class="preview-text short"></div>
                                    </div>
                                </div>
                                <h4>Light Mode</h4>
                                <p>Bright and clear</p>
                                <span class="theme-check">${window.backgroundMode === 'light' ? '✓' : ''}</span>
                            </div>
                            <div class="theme-option ${window.backgroundMode === 'neural' ? 'active' : ''}" onclick="setBackgroundMode('neural')">
                                <div class="theme-preview neural-preview">
                                    <div class="preview-content">
                                        <div class="preview-shapes">
                                            <div class="preview-circle"></div>
                                            <div class="preview-square"></div>
                                        </div>
                                        <div class="preview-bar"></div>
                                        <div class="preview-text"></div>
                                    </div>
                                </div>
                                <h4>Neural Glass</h4>
                                <p>Futuristic & immersive</p>
                                <span class="theme-check">${window.backgroundMode === 'neural' ? '✓' : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
    
    console.log('✅ [Theme Modes Override] Neural Glass mode added');
});
