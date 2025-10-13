# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Reveal.js presentation for a workshop titled "Critical Play with Large Language Models" designed for graduate students and instructors. The presentation demonstrates how game mechanics can reveal AI limitations through playful interactions.

## Architecture

### Main Files

- **index.html**: Single-file Reveal.js presentation with all slides, styles, and timing configuration
- **slides.md**: Content reference document for editing slide text and structure (not used by Reveal.js at runtime)
- **visualizations/**: Canvas-based animations that illustrate concepts on specific slides

### Reveal.js Configuration

The presentation uses Reveal.js 4.5.0 from CDN with these key settings:
- Dimensions: 1400x900 with 4% margin
- Total workshop time: 90 minutes (5400 seconds)
- Timing indicators appear only on activity slides (hidden on intro/demo/playful/playtest sections)
- Vertical navigation for nested slides (use down arrow)

### Section Classes

Slides use CSS classes to organize workshop phases:
- `section-intro`: Welcome and introductions
- `section-demo`: Jeopardy demo and quick demos
- `section-playful`: Mary Flanagan theory and playful interactions
- `section-worksheet`: Planning worksheets
- `section-activity`: Critical design activity
- `section-playtest`: Shareback and playtest

Timing display is controlled by hiding `.timing` elements for non-activity sections.

## Visualizations

Each visualization is a self-contained JavaScript file that:
1. Checks for canvas element by ID
2. Initializes on Reveal.js `slidechanged` event (not on DOM load)
3. Uses `requestAnimationFrame` for smooth animation
4. Returns cleanup function to cancel animation when leaving slide

Canvas IDs:
- `networkCanvas`: Animated network graph (title slide)
- `arcadeCanvas`: Retro arcade game (introductions)
- `chessCanvas`: Chess board with illegal moves (game mechanics slide)
- `vectorCanvas`: Word association semantic relationships (demo slide)
- `dominoCanvas`: Ripple causation chain reaction (expected outcomes slide)

### Important: Visualization Initialization

Visualizations must hook into Reveal.js events, not DOM events:

```javascript
if (typeof Reveal !== 'undefined') {
    Reveal.on('slidechanged', event => {
        if (event.currentSlide.querySelector('#canvasId')) {
            initVisualization();
        }
    });
}
```

This ensures canvas dimensions are correct when slides become visible.

## Editing Content

### Slide Content
Edit directly in **index.html** within `<section>` tags. Reference **slides.md** for content mapping but note it doesn't drive the presentation.

### Timing Indicators
Add `data-timing="seconds"` attribute to sections. Display is controlled by section classes.

### Examples and Prompts
System prompts configure AI behavior; user prompts are the first message. Ensure examples are consistent:
- System: "AI, think of X and answer yes/no"
- User: "I'll ask questions to guess X"

## Development

Open **index.html** directly in browser (no build process required). All dependencies load from CDN.

To test visualizations, navigate to slides containing canvas elements and verify animations start when slide appears.

## Git Commit Style

Per user preferences:
- All lowercase
- Detailed but under 100 characters
- Never include "Co-Authored-By: Claude" signatures
