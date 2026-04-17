/* ========================================
   BACKGROUND SHAPES SETTINGS
   Control shapes visibility, opacity, speed
   ======================================== */

// Default shapes settings
let shapesSettings = {
    enabled: true,
    opacity: 0.3,
    speed: 1,
    circles: true,
    triangles: true,
    squares: true,
    hexagons: true,
    stars: true,
    diamonds: true,
    pentagons: true,
    octagons: true,
    plus: true,
    rings: true
};

// Initialize shapes settings
function initShapesSettings() {
    console.log('🔷 Initializing Shapes Settings...');
    
    // Load saved settings
    loadShapesSettings();
    
    // Attach event listeners
    attachShapesListeners();
    
    // Apply current settings
    applyShapesSettings();
    
    console.log('✅ Shapes Settings initialized');
}

// Load settings from localStorage
function loadShapesSettings() {
    const saved = localStorage.getItem('neonwave_shapes_settings');
    
    if (saved) {
        shapesSettings = { ...shapesSettings, ...JSON.parse(saved) };
        console.log('✅ Shapes settings loaded:', shapesSettings);
    }
    
    // Update UI
    updateShapesUI();
}

// Save settings to localStorage
function saveShapesSettings() {
    localStorage.setItem('neonwave_shapes_settings', JSON.stringify(shapesSettings));
    console.log('💾 Shapes settings saved');
}

// Update UI elements
function updateShapesUI() {
    // Enable/disable toggle
    const enableToggle = document.getElementById('shapesEnabled');
    if (enableToggle) {
        enableToggle.checked = shapesSettings.enabled;
    }
    
    // Opacity slider
    const opacitySlider = document.getElementById('shapesOpacity');
    const opacityValue = document.getElementById('shapesOpacityValue');
    if (opacitySlider) {
        opacitySlider.value = shapesSettings.opacity * 100;
        if (opacityValue) {
            opacityValue.textContent = Math.round(shapesSettings.opacity * 100) + '%';
        }
    }
    
    // Speed slider
    const speedSlider = document.getElementById('shapesSpeed');
    const speedValue = document.getElementById('shapesSpeedValue');
    if (speedSlider) {
        speedSlider.value = shapesSettings.speed * 100;
        if (speedValue) {
            speedValue.textContent = shapesSettings.speed + 'x';
        }
    }
    
    // Shape type toggles
    const circlesToggle = document.getElementById('shapesCircles');
    const trianglesToggle = document.getElementById('shapesTriangles');
    const squaresToggle = document.getElementById('shapesSquares');
    const hexagonsToggle = document.getElementById('shapesHexagons');
    const starsToggle = document.getElementById('shapesStars');
    const diamondsToggle = document.getElementById('shapesDiamonds');
    const pentagonsToggle = document.getElementById('shapesPentagons');
    const octagonsToggle = document.getElementById('shapesOctagons');
    const plusToggle = document.getElementById('shapesPlus');
    const ringsToggle = document.getElementById('shapesRings');
    
    if (circlesToggle) circlesToggle.checked = shapesSettings.circles;
    if (trianglesToggle) trianglesToggle.checked = shapesSettings.triangles;
    if (squaresToggle) squaresToggle.checked = shapesSettings.squares;
    if (hexagonsToggle) hexagonsToggle.checked = shapesSettings.hexagons;
    if (starsToggle) starsToggle.checked = shapesSettings.stars;
    if (diamondsToggle) diamondsToggle.checked = shapesSettings.diamonds;
    if (pentagonsToggle) pentagonsToggle.checked = shapesSettings.pentagons;
    if (octagonsToggle) octagonsToggle.checked = shapesSettings.octagons;
    if (plusToggle) plusToggle.checked = shapesSettings.plus;
    if (ringsToggle) ringsToggle.checked = shapesSettings.rings;
}

// Attach event listeners
function attachShapesListeners() {
    // Enable/disable toggle
    const enableToggle = document.getElementById('shapesEnabled');
    if (enableToggle) {
        enableToggle.addEventListener('change', (e) => {
            shapesSettings.enabled = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
            console.log('🔷 Shapes enabled:', shapesSettings.enabled);
        });
    }
    
    // Opacity slider
    const opacitySlider = document.getElementById('shapesOpacity');
    const opacityValue = document.getElementById('shapesOpacityValue');
    if (opacitySlider) {
        opacitySlider.addEventListener('input', (e) => {
            shapesSettings.opacity = e.target.value / 100;
            if (opacityValue) {
                opacityValue.textContent = e.target.value + '%';
            }
            applyShapesSettings();
        });
        
        opacitySlider.addEventListener('change', () => {
            saveShapesSettings();
        });
    }
    
    // Speed slider
    const speedSlider = document.getElementById('shapesSpeed');
    const speedValue = document.getElementById('shapesSpeedValue');
    if (speedSlider) {
        speedSlider.addEventListener('input', (e) => {
            shapesSettings.speed = e.target.value / 100;
            if (speedValue) {
                speedValue.textContent = shapesSettings.speed + 'x';
            }
            applyShapesSettings();
        });
        
        speedSlider.addEventListener('change', () => {
            saveShapesSettings();
        });
    }
    
    // Shape type toggles
    const circlesToggle = document.getElementById('shapesCircles');
    const trianglesToggle = document.getElementById('shapesTriangles');
    const squaresToggle = document.getElementById('shapesSquares');
    const hexagonsToggle = document.getElementById('shapesHexagons');
    const starsToggle = document.getElementById('shapesStars');
    const diamondsToggle = document.getElementById('shapesDiamonds');
    const pentagonsToggle = document.getElementById('shapesPentagons');
    const octagonsToggle = document.getElementById('shapesOctagons');
    const plusToggle = document.getElementById('shapesPlus');
    const ringsToggle = document.getElementById('shapesRings');
    
    if (circlesToggle) {
        circlesToggle.addEventListener('change', (e) => {
            shapesSettings.circles = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (trianglesToggle) {
        trianglesToggle.addEventListener('change', (e) => {
            shapesSettings.triangles = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (squaresToggle) {
        squaresToggle.addEventListener('change', (e) => {
            shapesSettings.squares = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (hexagonsToggle) {
        hexagonsToggle.addEventListener('change', (e) => {
            shapesSettings.hexagons = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (starsToggle) {
        starsToggle.addEventListener('change', (e) => {
            shapesSettings.stars = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (diamondsToggle) {
        diamondsToggle.addEventListener('change', (e) => {
            shapesSettings.diamonds = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (pentagonsToggle) {
        pentagonsToggle.addEventListener('change', (e) => {
            shapesSettings.pentagons = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (octagonsToggle) {
        octagonsToggle.addEventListener('change', (e) => {
            shapesSettings.octagons = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (plusToggle) {
        plusToggle.addEventListener('change', (e) => {
            shapesSettings.plus = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    if (ringsToggle) {
        ringsToggle.addEventListener('change', (e) => {
            shapesSettings.rings = e.target.checked;
            applyShapesSettings();
            saveShapesSettings();
        });
    }
    
    // Reset button
    const resetBtn = document.getElementById('resetShapesBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetShapesSettings();
            resetBtn.textContent = '✓ Reset!';
            setTimeout(() => {
                resetBtn.textContent = 'Reset to Defaults';
            }, 2000);
        });
    }
    
    console.log('✅ Shapes listeners attached');
}

// Apply shapes settings
function applyShapesSettings() {
    const bgShapes = document.querySelector('.bg-shapes');
    
    if (!bgShapes) {
        console.warn('⚠️ .bg-shapes not found');
        return;
    }
    
    // Show/hide shapes container
    if (shapesSettings.enabled) {
        bgShapes.style.display = 'block';
        bgShapes.style.opacity = shapesSettings.opacity;
    } else {
        bgShapes.style.display = 'none';
        return;
    }
    
    // Apply opacity
    bgShapes.style.opacity = shapesSettings.opacity;
    
    // Show/hide specific shape types
    const circles = bgShapes.querySelectorAll('.circle');
    const triangles = bgShapes.querySelectorAll('.triangle');
    const squares = bgShapes.querySelectorAll('.square');
    const hexagons = bgShapes.querySelectorAll('.hexagon');
    const stars = bgShapes.querySelectorAll('.star');
    const diamonds = bgShapes.querySelectorAll('.diamond');
    const pentagons = bgShapes.querySelectorAll('.pentagon');
    const octagons = bgShapes.querySelectorAll('.octagon');
    const plusShapes = bgShapes.querySelectorAll('.plus');
    const rings = bgShapes.querySelectorAll('.ring');
    
    circles.forEach(circle => {
        circle.style.display = shapesSettings.circles ? 'block' : 'none';
        if (shapesSettings.circles) restartAnimation(circle);
    });
    
    triangles.forEach(triangle => {
        triangle.style.display = shapesSettings.triangles ? 'block' : 'none';
        if (shapesSettings.triangles) restartAnimation(triangle);
    });
    
    squares.forEach(square => {
        square.style.display = shapesSettings.squares ? 'block' : 'none';
        if (shapesSettings.squares) restartAnimation(square);
    });
    
    hexagons.forEach(hexagon => {
        hexagon.style.display = shapesSettings.hexagons ? 'block' : 'none';
        if (shapesSettings.hexagons) restartAnimation(hexagon);
    });
    
    stars.forEach(star => {
        star.style.display = shapesSettings.stars ? 'block' : 'none';
        if (shapesSettings.stars) restartAnimation(star);
    });
    
    diamonds.forEach(diamond => {
        diamond.style.display = shapesSettings.diamonds ? 'block' : 'none';
        if (shapesSettings.diamonds) restartAnimation(diamond);
    });
    
    pentagons.forEach(pentagon => {
        pentagon.style.display = shapesSettings.pentagons ? 'block' : 'none';
        if (shapesSettings.pentagons) restartAnimation(pentagon);
    });
    
    octagons.forEach(octagon => {
        octagon.style.display = shapesSettings.octagons ? 'block' : 'none';
        if (shapesSettings.octagons) restartAnimation(octagon);
    });
    
    plusShapes.forEach(plus => {
        plus.style.display = shapesSettings.plus ? 'block' : 'none';
        if (shapesSettings.plus) restartAnimation(plus);
    });
    
    rings.forEach(ring => {
        ring.style.display = shapesSettings.rings ? 'block' : 'none';
        if (shapesSettings.rings) restartAnimation(ring);
    });
    
    // Apply animation speed
    applyAnimationSpeed();
    
    console.log('✅ Shapes settings applied');
}

// Restart animation for a shape
function restartAnimation(element) {
    // Force reflow to restart animation
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = '';
}

// Apply animation speed
function applyAnimationSpeed() {
    const bgShapes = document.querySelector('.bg-shapes');
    if (!bgShapes) return;
    
    const allShapes = bgShapes.querySelectorAll('.circle, .triangle, .square, .hexagon, .star, .diamond, .pentagon, .octagon, .plus, .ring');
    
    allShapes.forEach(shape => {
        // Get original animation from computed style
        const computedStyle = window.getComputedStyle(shape);
        const animationName = computedStyle.animationName;
        
        if (animationName && animationName !== 'none') {
            // Get the original duration from the stylesheet (not the modified one)
            // We need to reset first to get original value
            const originalDuration = shape.getAttribute('data-original-duration');
            
            if (!originalDuration) {
                // Store original duration on first run
                const currentDuration = parseFloat(computedStyle.animationDuration);
                if (!isNaN(currentDuration) && currentDuration > 0) {
                    shape.setAttribute('data-original-duration', currentDuration);
                    
                    // Calculate new duration based on speed
                    const newDuration = currentDuration / shapesSettings.speed;
                    shape.style.animationDuration = newDuration + 's';
                }
            } else {
                // Use stored original duration
                const baseDuration = parseFloat(originalDuration);
                const newDuration = baseDuration / shapesSettings.speed;
                shape.style.animationDuration = newDuration + 's';
            }
        }
    });
    
    console.log('✅ Animation speed applied:', shapesSettings.speed + 'x');
}

// Reset to defaults
function resetShapesSettings() {
    shapesSettings = {
        enabled: true,
        opacity: 0.3,
        speed: 1,
        circles: true,
        triangles: true,
        squares: true,
        hexagons: true,
        stars: true,
        diamonds: true,
        pentagons: true,
        octagons: true,
        plus: true,
        rings: true
    };
    
    // Clear stored original durations
    const bgShapes = document.querySelector('.bg-shapes');
    if (bgShapes) {
        const allShapes = bgShapes.querySelectorAll('.circle, .triangle, .square, .hexagon, .star, .diamond, .pentagon, .octagon, .plus, .ring');
        allShapes.forEach(shape => {
            shape.removeAttribute('data-original-duration');
            shape.style.animationDuration = '';
        });
    }
    
    updateShapesUI();
    applyShapesSettings();
    saveShapesSettings();
    
    console.log('🔄 Shapes settings reset to defaults');
}

// Export functions
window.shapesSettings = {
    init: initShapesSettings,
    apply: applyShapesSettings,
    reset: resetShapesSettings,
    getSettings: () => shapesSettings
};

// Make init function globally available
window.initShapesSettings = initShapesSettings;

// Auto-load and apply settings on page load (for main pages)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Load saved settings
        loadShapesSettings();
        // Apply settings
        applyShapesSettings();
    });
} else {
    // DOM already loaded
    setTimeout(() => {
        loadShapesSettings();
        applyShapesSettings();
    }, 100);
}

console.log('✅ Shapes Settings module loaded');
