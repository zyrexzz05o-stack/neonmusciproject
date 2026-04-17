# NeonWave Typography System

## Font Families

### 1. Space Grotesk (Headings & Emphasis)
**Karakteristik:**
- Geometric sans-serif
- Sharp, modern, futuristic
- Tidak rounded seperti Circular (Spotify)
- Cocok untuk judul dan teks yang perlu emphasis

**Usage:**
- Semua headings (h1-h6)
- Song titles
- Section labels (uppercase)
- Time displays (tabular numbers)
- Buttons dan CTAs

**Weights:**
- 400 (Regular) - Jarang digunakan
- 500 (Medium) - Body emphasis
- 600 (Semibold) - Headings, labels
- 700 (Bold) - Hero titles, NOW PLAYING

### 2. DM Sans (Body Text)
**Karakteristik:**
- Clean, readable
- Tidak terlalu rounded
- Geometric tapi lebih friendly untuk body text
- Excellent readability untuk teks panjang

**Usage:**
- Body text
- Artist names
- Descriptions
- Navigation items
- Secondary information

**Weights:**
- 300 (Light) - Tertiary text
- 400 (Regular) - Body text, artist names
- 500 (Medium) - Interactive elements
- 600 (Semibold) - Emphasis dalam body
- 700 (Bold) - Jarang digunakan

## Typography Hierarchy

### Level 1: Hero / Page Title
```css
font-family: 'Space Grotesk', sans-serif;
font-size: 48-52px;
font-weight: 700;
letter-spacing: -0.03em;
color: rgba(255, 255, 255, 0.95);
```
**Contoh:** NOW PLAYING title saat empty state

### Level 2: Section Headings
```css
font-family: 'Space Grotesk', sans-serif;
font-size: 22-32px;
font-weight: 600;
letter-spacing: -0.02em;
color: rgba(255, 255, 255, 0.95);
```
**Contoh:** "Baru diputar", "Recommended For You"

### Level 3: Song Titles
```css
font-family: 'Space Grotesk', sans-serif;
font-size: 20px;
font-weight: 600;
letter-spacing: -0.02em;
color: rgba(255, 255, 255, 1);
```
**Contoh:** Judul lagu di NOW PLAYING

### Level 4: Section Labels (Uppercase)
```css
font-family: 'Space Grotesk', sans-serif;
font-size: 11-13px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.15-0.2em;
color: rgba(255, 255, 255, 0.5);
```
**Contoh:** "NOW PLAYING" label

### Level 5: Body Text / Artist Names
```css
font-family: 'DM Sans', sans-serif;
font-size: 14-16px;
font-weight: 400;
letter-spacing: -0.01em;
color: rgba(255, 255, 255, 0.6-0.65);
```
**Contoh:** Nama artist, deskripsi

### Level 6: Secondary Text
```css
font-family: 'DM Sans', sans-serif;
font-size: 12-13px;
font-weight: 400-500;
color: rgba(255, 255, 255, 0.5-0.55);
```
**Contoh:** Trending names, metadata

### Level 7: Tertiary / Time Display
```css
font-family: 'Space Grotesk', sans-serif;
font-size: 11px;
font-weight: 500;
font-variant-numeric: tabular-nums;
letter-spacing: 0.03em;
color: rgba(255, 255, 255, 0.5);
```
**Contoh:** Time (0:00 / 3:45)

## Letter Spacing Guidelines

### Tight (Negative)
- `-0.03em` - Hero titles (48px+)
- `-0.02em` - Large headings (22-32px)
- `-0.01em` - Body text (14-16px)

**Alasan:** Font besar butuh spacing lebih ketat agar tidak terlalu loose

### Normal
- `0em` - Default untuk most cases

### Wide (Positive)
- `0.03em` - Time displays (tabular numbers)
- `0.05em` - Spaced text
- `0.15-0.2em` - Uppercase labels

**Alasan:** Uppercase dan small text butuh spacing lebih lebar untuk readability

## Color Hierarchy (Monochrome)

### Primary Text
```css
color: rgba(255, 255, 255, 0.95-1);
```
- Judul utama
- Song titles
- Active elements

### Secondary Text
```css
color: rgba(255, 255, 255, 0.6-0.65);
```
- Artist names
- Body text
- Descriptions

### Tertiary Text
```css
color: rgba(255, 255, 255, 0.5-0.55);
```
- Labels
- Metadata
- Time displays
- Inactive states

### Quaternary Text
```css
color: rgba(255, 255, 255, 0.4);
```
- Disabled states
- Placeholder text

## Interactive States

### Default
```css
color: rgba(255, 255, 255, 0.6);
transition: color 0.2s ease;
```

### Hover
```css
color: rgba(255, 255, 255, 0.9-1);
```

### Active/Selected
```css
color: rgba(255, 255, 255, 1);
font-weight: +100; /* Optional */
```

## Special Features

### Tabular Numbers
```css
font-variant-numeric: tabular-nums;
```
**Usage:** Time displays, counters
**Alasan:** Angka tidak "jumping" saat berubah

### Text Shadows (Subtle)
```css
text-shadow: 0 2px 8px rgba(0,0,0,.3);
```
**Usage:** NOW PLAYING section
**Alasan:** Memberikan depth tanpa mengganggu

## Spacing & Layout

### Line Height
- **Headings:** 1.1-1.2 (tight)
- **Body:** 1.6 (comfortable)
- **Compact:** 1.4 (cards, lists)

### Margins
- **After headings:** 12-20px
- **Between sections:** 24-32px
- **Paragraph spacing:** 16px

## Perbedaan dengan Spotify

| Aspek | Spotify | NeonWave |
|-------|---------|----------|
| Font | Circular (rounded) | Space Grotesk (geometric, sharp) |
| Body | Circular | DM Sans (clean, not rounded) |
| Letter spacing | Tighter | More generous |
| Uppercase | Jarang | Selective (labels) |
| Hierarchy | 3-4 levels | 7 levels (detailed) |
| Weight variation | Moderate | More contrast |
| Numbers | Regular | Tabular (monospace) |

## Best Practices

### DO ✅
- Gunakan Space Grotesk untuk emphasis
- Gunakan DM Sans untuk readability
- Maintain color hierarchy (95% → 65% → 50%)
- Use tabular numbers untuk time
- Generous whitespace
- Negative letter-spacing untuk large text
- Positive letter-spacing untuk uppercase

### DON'T ❌
- Jangan mix terlalu banyak weights
- Jangan gunakan warna selain monochrome
- Jangan letter-spacing terlalu ekstrem
- Jangan font-size terlalu kecil (<11px)
- Jangan line-height terlalu tight untuk body
- Jangan all-caps untuk body text

## Accessibility

- **Minimum font size:** 11px (labels only)
- **Body minimum:** 14px
- **Contrast ratio:** Minimum 4.5:1 (WCAG AA)
- **Line height:** Minimum 1.4 untuk body
- **Letter spacing:** Tidak negatif untuk body text

## Performance

- **Font loading:** Preconnect to Google Fonts
- **Font display:** swap (prevent FOIT)
- **Weights loaded:** Only used weights
- **Subsetting:** Latin only (if possible)

## Implementation Example

```css
/* Hero title */
.hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 52px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1;
}

/* Song title */
.song-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 1);
}

/* Artist name */
.artist-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: -0.01em;
}

/* Section label */
.section-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.5);
}
```

## Conclusion

Sistem tipografi NeonWave dirancang untuk:
- ✅ Berbeda jelas dari Spotify
- ✅ Modern dan futuristic
- ✅ Readable untuk penggunaan lama
- ✅ Hierarchy yang jelas
- ✅ Monochrome strict
- ✅ Professional dan dewasa
