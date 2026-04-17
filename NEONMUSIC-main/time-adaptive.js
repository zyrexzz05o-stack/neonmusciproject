// ========================================
// TIME-BASED ADAPTIVE UI
// Subtle UI changes based on real-world time
// ========================================

console.log('🕐 [Time Adaptive] Module Loading...');

// Time periods
const TIME_PERIODS = {
    MORNING: 'morning',  // 05:00 - 10:59
    DAY: 'day',          // 11:00 - 17:59
    NIGHT: 'night'       // 18:00 - 04:59
};

let currentPeriod = null;
let checkInterval = null;

/**
 * Get current time period based on hour
 */
function getTimePeriod() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 11) {
        return TIME_PERIODS.MORNING;
    } else if (hour >= 11 && hour < 18) {
        return TIME_PERIODS.DAY;
    } else {
        return TIME_PERIODS.NIGHT;
    }
}

/**
 * Apply time-based theme to body
 */
function applyTimeTheme(period) {
    const body = document.body;
    
    // Remove all time classes
    body.classList.remove('time-morning', 'time-day', 'time-night');
    
    // Add current time class
    body.classList.add(`time-${period}`);
    
    console.log(`🕐 Time period: ${period.toUpperCase()}`);
    
    // Log visual changes for debugging
    logVisualChanges(period);
}

/**
 * Log visual changes for each period
 */
function logVisualChanges(period) {
    const changes = {
        morning: {
            background: '#181818 (lighter)',
            grain: 'lighter',
            contrast: 'slightly higher',
            opacity: 'cleaner'
        },
        day: {
            background: '#111111 (default)',
            grain: 'normal',
            contrast: 'neutral',
            opacity: 'balanced'
        },
        night: {
            background: '#0A0A0A (deeper)',
            grain: 'stronger',
            contrast: 'slightly lower',
            animations: 'slightly slower',
            opacity: 'dimmer'
        }
    };
    
    console.log('📊 Visual adjustments:', changes[period]);
}

/**
 * Check and update time period
 */
function checkAndUpdateTimePeriod() {
    const newPeriod = getTimePeriod();
    
    // Only update if period changed
    if (newPeriod !== currentPeriod) {
        console.log(`🔄 Time period changed: ${currentPeriod || 'none'} → ${newPeriod}`);
        currentPeriod = newPeriod;
        applyTimeTheme(newPeriod);
    }
}

/**
 * Initialize time-based adaptive UI
 */
function initTimeAdaptive() {
    console.log('🕐 Initializing Time-Based Adaptive UI...');
    
    // Apply initial theme
    checkAndUpdateTimePeriod();
    
    // Check every 5 minutes (300000ms)
    checkInterval = setInterval(() => {
        checkAndUpdateTimePeriod();
    }, 300000); // 5 minutes
    
    console.log('✅ Time-Based Adaptive UI initialized');
    console.log('⏰ Checking time period every 5 minutes');
}

/**
 * Stop time adaptive (cleanup)
 */
function stopTimeAdaptive() {
    if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
        console.log('⏹️ Time-Based Adaptive UI stopped');
    }
}

/**
 * Get current period info (for debugging)
 */
function getCurrentPeriodInfo() {
    const now = new Date();
    return {
        currentTime: now.toLocaleTimeString(),
        period: currentPeriod,
        hour: now.getHours(),
        nextCheck: '5 minutes'
    };
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeAdaptive);
} else {
    initTimeAdaptive();
}

// Export functions to global scope
window.initTimeAdaptive = initTimeAdaptive;
window.stopTimeAdaptive = stopTimeAdaptive;
window.getCurrentPeriodInfo = getCurrentPeriodInfo;

console.log('✅ [Time Adaptive] Module Loaded');
