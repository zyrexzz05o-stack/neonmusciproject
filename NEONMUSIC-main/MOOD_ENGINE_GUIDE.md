# Mood Engine - Settings Page Guide

## Overview
The Mood Engine is an AI-powered feature that transforms your music listening experience by adjusting both audio and visual elements based on your selected mood.

## Features

### 4 Mood Modes

#### 1. Energize Mode ⚡
- **Audio**: Bass boost + increased volume
- **Visual**: Warm glow effect with increased brightness
- **Animations**: Fast-paced (30% faster)
- **Best for**: Workouts, motivation, high-energy activities

#### 2. Midnight Calm 🌙
- **Audio**: Enhanced treble + reduced bass
- **Visual**: Cool dark blue tone with reduced brightness
- **Animations**: Slow and smooth (50% slower)
- **Best for**: Late night listening, relaxation, sleep

#### 3. Rainy Focus 🌧️
- **Audio**: Balanced EQ with reduced volume
- **Visual**: Low brightness + desaturated colors
- **Animations**: Very slow and subtle (2x slower)
- **Best for**: Studying, working, concentration

#### 4. Hyper Mode 🚀
- **Audio**: Full bass + treble boost + increased volume
- **Visual**: High contrast + brightness + saturation
- **Animations**: Very fast (50% faster)
- **Best for**: Gaming, parties, intense activities

## How to Use

### Accessing Settings
1. Click the Settings icon (⚙️) in the floating sidebar
2. The Settings page will load with all options

### Enabling Mood Engine
1. Toggle the "Mood Engine" switch at the top
2. When enabled, you can select mood modes
3. When disabled, all effects are removed

### Selecting a Mood Mode
1. Click on any of the 4 mood cards
2. The card will highlight and show an active indicator
3. Effects apply immediately to:
   - Currently playing audio (if any)
   - Background visuals
   - Animations
4. Click the same card again to disable the mode

### Current Mode Display
- Shows which mood is currently active
- Updates in real-time when you switch modes

## Technical Details

### Web Audio API Integration
The Mood Engine uses the Web Audio API to apply real-time audio effects:
- **Bass Boost**: Low-shelf filter at 200Hz
- **Treble Enhancement**: High-shelf filter at 3000Hz
- **Volume Control**: Gain node for overall volume adjustment

### Visual Effects
Applied using CSS filters:
- Brightness adjustment
- Contrast enhancement
- Saturation control

### Animation Speed
Dynamically adjusts animation duration of background shapes:
- Reads current animation duration
- Multiplies by speed factor
- Applies new duration smoothly

## Settings Persistence

All settings are saved to localStorage:
- Mood Engine enabled/disabled state
- Current active mood mode
- Audio quality preferences
- Display preferences
- Crossfade duration

Settings persist across:
- Page refreshes
- Navigation between pages
- Browser sessions

## Other Settings

### Audio Quality
- **Streaming Quality**: Low (96 kbps), Medium (160 kbps), High (320 kbps)
- **Volume Normalization**: Equalizes volume across tracks
- **Crossfade Duration**: 0-12 seconds transition between songs

### Display
- **Show Visualizer**: Toggle audio visualizer
- **Show Lyrics**: Toggle lyrics display
- **Animation Speed**: Slow, Normal, Fast

### About
- App version information
- Reset all settings to default

## Reset Settings
Click "Reset All Settings" to:
- Restore default values
- Clear localStorage
- Remove all mood effects
- Reset UI to initial state

## Browser Compatibility
- Requires modern browser with Web Audio API support
- Best experience on Chrome, Firefox, Edge, Safari
- Mobile browsers supported

## Tips
1. Try different moods for different times of day
2. Combine with the existing Mood Selector (🌊 🎯 🌙) for layered effects
3. Adjust crossfade duration for seamless transitions
4. Use Rainy Focus mode to reduce eye strain at night
5. Energize mode works great with upbeat playlists

## Troubleshooting

### Audio effects not working
- Make sure a song is playing
- Check if Mood Engine is enabled
- Try refreshing the page

### Visual effects not visible
- Check browser compatibility
- Ensure hardware acceleration is enabled
- Try a different mood mode

### Settings not saving
- Check browser localStorage permissions
- Clear browser cache and try again
- Ensure cookies are enabled

## Future Enhancements
- Custom mood presets
- Time-based auto-switching
- Spotify integration for mood-based playlists
- More granular EQ controls
- Mood history and analytics
