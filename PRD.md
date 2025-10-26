# Planning Guide

A web-based QR code scanner that uses the device camera to detect and decode QR codes in real-time, providing instant results and scanning history.

**Experience Qualities**: 
1. **Instant** - Scanning should feel immediate with real-time feedback and quick recognition
2. **Reliable** - Clear visual feedback showing when codes are detected with high accuracy
3. **Effortless** - Simple one-tap operation with minimal UI that gets out of the way

**Complexity Level**: Light Application (multiple features with basic state)
  - The app handles camera permissions, real-time video processing, QR detection, and maintains a history of scans with persistent state.

## Essential Features

### Camera QR Scanning
- **Functionality**: Access device camera and continuously scan for QR codes in the video feed
- **Purpose**: Primary function - allow users to scan QR codes without installing native apps
- **Trigger**: User grants camera permission on load or clicks "Start Scanning" button
- **Progression**: Load app → Grant camera permission → Point camera at QR code → Automatic detection → Display result with visual/audio feedback
- **Success criteria**: QR code detected within 1-2 seconds of being in frame, decoded content displayed clearly

### Scan History
- **Functionality**: Store all successfully scanned QR codes with timestamps
- **Purpose**: Allow users to reference previous scans and take action on historical data
- **Trigger**: Automatically saved when QR code is successfully decoded
- **Progression**: Scan QR code → Result saved to history → View history list → Click entry to see details or copy content
- **Success criteria**: History persists between sessions, shows most recent scans first, allows clearing individual or all entries

### Result Actions
- **Functionality**: Detect QR code content type (URL, text, email, phone) and provide contextual actions
- **Purpose**: Make scanned content immediately actionable
- **Trigger**: QR code successfully decoded
- **Progression**: Code scanned → Content type detected → Relevant actions displayed (open URL, copy text, call number, compose email)
- **Success criteria**: URLs open in new tab, text can be copied, phone/email trigger appropriate system handlers

## Edge Case Handling
- **No camera access**: Show clear permission request with instructions to enable camera in browser settings
- **No QR code in frame**: Display subtle "searching" indicator without being distracting
- **Invalid/corrupted QR**: Show error message and continue scanning automatically
- **Poor lighting**: Provide tip overlay suggesting better lighting or camera angle
- **Multiple QR codes**: Detect and decode the most prominent/centered code first

## Design Direction
The design should feel modern and technical yet approachable - like a professional diagnostic tool that anyone can use. Minimal interface with the camera view as the hero element, overlaid with subtle scanning indicators and clean typography for results.

## Color Selection
Triadic color scheme (blue, amber, slate) creating a tech-forward palette with warm highlights for successful scans.

- **Primary Color**: Deep Blue (oklch(0.45 0.15 250)) - Communicates trust, technology, and precision
- **Secondary Colors**: Slate/Gray tones for neutral backgrounds and text
- **Accent Color**: Amber/Orange (oklch(0.75 0.15 70)) - Warm highlight for successful scans and CTAs, creates energy and positivity
- **Foreground/Background Pairings**:
  - Background (Dark Slate oklch(0.15 0.02 250)): White text (oklch(0.98 0 0)) - Ratio 14.2:1 ✓
  - Card (Elevated Slate oklch(0.20 0.02 250)): White text (oklch(0.98 0 0)) - Ratio 11.8:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓
  - Accent (Amber oklch(0.75 0.15 70)): Dark text (oklch(0.15 0.02 250)) - Ratio 9.1:1 ✓
  - Muted (Mid Slate oklch(0.25 0.02 250)): Light gray text (oklch(0.75 0.02 250)) - Ratio 5.2:1 ✓

## Font Selection
Use Inter for its technical clarity and excellent readability in UI contexts, with crisp letter-spacing that conveys precision and modernity.

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold/24px/tight tracking
  - H2 (Section Headers): Inter Semibold/18px/normal tracking  
  - Body (Results, History): Inter Regular/15px/relaxed line-height (1.6)
  - Small (Timestamps, Meta): Inter Medium/13px/wide tracking/muted color
  - Code (QR Content): Inter Mono/14px for technical content display

## Animations
Animations should be minimal and purposeful - a subtle pulse on the scanning frame to indicate active detection, smooth transitions between states, and a satisfying "success" animation when a code is decoded.

- **Purposeful Meaning**: Scanning pulse communicates "working", success ripple provides tactile feedback, smooth state transitions reduce cognitive load
- **Hierarchy of Movement**: Most motion on scan success (celebration), moderate on state changes (camera on/off), minimal during active scanning (just breathing pulse)

## Component Selection
- **Components**: 
  - Card: For displaying scan results and history items with elevated appearance
  - Button: Primary action for starting/stopping camera, secondary for history actions
  - ScrollArea: For scrollable history list
  - Separator: To divide sections cleanly
  - Badge: To show content type (URL, Text, Email, Phone)
  - Alert: For camera permission requests and error states
  - Tooltip: For icon button explanations
  
- **Customizations**: 
  - Custom camera viewfinder overlay with animated corner brackets
  - Custom scan success animation (ripple effect from center)
  - Custom history item component with swipe-to-delete interaction
  
- **States**: 
  - Buttons: Distinct pressed state with scale transform, disabled state when camera unavailable
  - Scanner: Active (pulsing border), Detecting (highlight), Success (flash + ripple), Error (red border flash)
  - History items: Default, Hover (subtle lift), Active (pressed)
  
- **Icon Selection**: 
  - QrCode (scan icon), Camera, X (close), Trash (delete), Copy, ExternalLink, Clock (history), CheckCircle (success)
  
- **Spacing**: 
  - Container padding: p-6 on desktop, p-4 on mobile
  - Section gaps: gap-6 for major sections, gap-3 for related items
  - Card padding: p-4 standard, p-3 compact for history items
  
- **Mobile**: 
  - Stack layout vertically on mobile, side-by-side on desktop (camera left, history right)
  - Camera view fills available height on mobile, fixed aspect ratio on desktop
  - History collapses to bottom sheet or tabs on mobile
  - Touch targets minimum 44px for all interactive elements
