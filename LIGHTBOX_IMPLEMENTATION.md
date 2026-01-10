# Portfolio Image & Video Lightbox Implementation

## Overview

Added a complete image and video preview lightbox feature to the portfolio page. Users can now click on any portfolio item to view it in a fullscreen modal with smooth animations.

---

## Features Implemented

### ✅ **Image Preview**

- Click any portfolio image to open fullscreen preview
- Smooth fade-in animation
- Close button with hover animation
- Click outside modal to close
- Press ESC key to close

### ✅ **Video Preview**

- Click any portfolio video to open in fullscreen player
- Built-in video controls (play, pause, volume, fullscreen)
- Autoplay when opened
- Same close interactions as images

### ✅ **Keyboard Accessibility**

- **Enter** key: Opens preview on focused item
- **Space** key: Opens preview on focused item
- **ESC** key: Closes preview modal
- All interactive elements have proper `tabindex` and `role` attributes

### ✅ **Visual Enhancements**

- **"👁️ VIEW" Overlay**: Appears on hover to indicate items are clickable
- **Smooth Animations**:
  - Modal fade-in/out (0.3s)
  - Content scale animation (0.8 → 1)
  - Close button rotation on hover (90deg)
- **Responsive Design**:
  - Desktop: Close button positioned above modal
  - Mobile: Close button positioned inside modal (top-right corner)

### ✅ **Mobile Optimization**

- Responsive modal sizes (90vw max-width on desktop, 95vw on mobile)
- Touch-friendly close button (40x40px)
- Proper video player controls on mobile devices

---

## Technical Implementation

### 1. **CSS Styles** (Added to `<style>` block)

```css
/* Portfolio Modal/Lightbox Styles */
.portfolio-modal {
} /* Fixed overlay backdrop */
.portfolio-modal-content {
} /* Modal container with animations */
.portfolio-modal-image {
} /* Image container styling */
.portfolio-modal-video {
} /* Video container styling */
.portfolio-modal-close {
} /* Close button styling */

/* Animations */
@keyframes modalSlideIn {
} /* Content scale animation */
```

**Key Properties:**

- `z-index: 9999` - Ensures modal is above all other content
- `opacity: 0 → 1` - Smooth fade animation
- `max-height: 90vh` - Prevents overflow on viewport
- `aspect-ratio: 1/1` - Maintains image quality

### 2. **JavaScript Functionality** (Portfolio Lightbox Module)

**File Location:** Inline `<script>` before closing `</body>`

**Main Function:** `portfolioLightbox()` - IIFE Module

- Initializes all portfolio items automatically
- Detects image vs. video content
- Sets up click and keyboard event listeners
- Manages modal lifecycle (open, close, cleanup)

**Key Methods:**

- `setupPortfolioItems()` - Scans DOM for portfolio items
- `openPortfolioPreview(type, src)` - Dispatcher for image/video
- `openImagePreview(src)` - Creates image modal
- `openVideoPreview(src)` - Creates video modal with controls
- `closeModal(modal)` - Cleanup and removal

**Event Handlers:**

- Click on item → Opens preview
- Click close button → Closes modal
- Click outside modal → Closes modal
- Press ESC → Closes modal
- Enter/Space on focused item → Opens preview

### 3. **DOM Elements**

The implementation works with existing portfolio item structure:

```html
<div class="td-portfolio-filter-wrapper">
  <!-- Image items -->
  <div class="td-portfolio-filter-thumb">
    <img data-src="path/to/image.jpg" class="lazy" />
  </div>

  <!-- Video items -->
  <div class="td-portfolio-filter-thumb">
    <video data-src="path/to/video.mp4" class="lazy-video"></video>
  </div>
</div>
```

**Automatic Detection:**

- Scans for `<img>` with `data-src` attribute → Opens as image
- Scans for `<video>` with `data-src` attribute → Opens as video

---

## Usage

### For Users

1. **Mouse/Touch**: Click on any portfolio item thumbnail
2. **Keyboard**:
   - Tab to focus a portfolio item
   - Press **Enter** or **Space** to open
   - Press **ESC** to close

### For Developers

No additional markup required! The script automatically:

- Detects all portfolio items
- Extracts image/video sources from `data-src` attributes
- Adds click and keyboard handlers
- Creates and manages modal elements

---

## Browser Compatibility

✅ **Supported:**

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

✅ **Features Used:**

- `querySelector` / `querySelectorAll`
- `addEventListener`
- CSS animations and transitions
- Dynamic DOM creation

---

## Performance Considerations

✅ **Optimizations:**

- Uses lazy loading (already implemented)
- Modal created/destroyed on-demand (no persistent DOM pollution)
- CSS animations (GPU accelerated)
- Event delegation-ready structure
- No external dependencies

⚠️ **Note:**

- Large videos may take time to load from external CDN (Vercel storage)
- Image loading time depends on image optimization and file sizes

---

## CSS Class Reference

| Class                      | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `.portfolio-modal`         | Overlay backdrop                          |
| `.portfolio-modal.active`  | Active state (opacity: 1)                 |
| `.portfolio-modal-content` | Modal container with animation            |
| `.portfolio-modal-image`   | Image element styling                     |
| `.portfolio-modal-video`   | Video element styling                     |
| `.portfolio-modal-close`   | Close button styling                      |
| `.portfolio-item`          | (Added dynamically) Marks clickable items |

---

## File Changes Summary

**File Modified:** `portfolio.html`

**Changes Made:**

1. ✅ Added modal CSS styles (lines 184-273)
2. ✅ Added view indicator overlay on portfolio items (pseudo-element `::after`)
3. ✅ Added portfolio lightbox JavaScript module (~150 lines)
4. ✅ Maintained all existing functionality (filtering, lazy loading, etc.)

**Lines Added:** ~200
**Breaking Changes:** None ❌
**Deprecated:** None

---

## Testing Checklist

- [ ] Click image items → Opens fullscreen preview
- [ ] Click video items → Opens with video controls
- [ ] Close button works (click)
- [ ] Click outside modal closes it
- [ ] ESC key closes modal
- [ ] Keyboard navigation (Tab → Enter/Space)
- [ ] Mobile responsive (test on 375px and 768px widths)
- [ ] Filter buttons still work
- [ ] Lazy loading still works
- [ ] Multiple opens/closes don't cause memory leaks

---

## Future Enhancement Ideas

1. **Navigation Arrows**: Add prev/next buttons to browse through portfolio items
2. **Thumbnail Gallery**: Show thumbnails of nearby items inside modal
3. **Zoom Controls**: Add zoom in/out for images
4. **Download Button**: Allow users to download portfolio items
5. **Share Modal**: Social sharing buttons
6. **Full-screen Video**: Native fullscreen support toggle
7. **Captions**: Add project titles/descriptions in modal
8. **Touch Gestures**: Swipe left/right for navigation on mobile

---

## Questions or Issues?

If you need to modify:

- **Styling**: Edit the CSS in `<style>` block (lines 184-273)
- **Behavior**: Edit the JavaScript IIFE `portfolioLightbox()` (lines 1815-1881)
- **Animations**: Adjust `transition` and `animation` timing properties
