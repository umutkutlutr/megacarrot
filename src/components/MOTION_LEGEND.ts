/*
 * ========================================
 * MEGACARROT DASHBOARD - MOTION LEGEND
 * ========================================
 * 
 * BACKGROUND EFFECTS:
 * - Animated grid parallax (60s cycle, subtle diagonal movement)
 * - Continuous scanline overlay (top to bottom sweep)
 * - 15 drifting pixel particles (low opacity, random paths)
 * 
 * PANEL ANIMATIONS:
 * - Protocol Balance: Idle glow pulse (rotating 3 balances, 2s intervals)
 * - Yield Panel: CLAIM button idle pulse when ready (1.5s repeat)
 * - Digital Vault: Terminal sweep passes over balance area (every 8s)
 * - Output Panel: Animated progress bar sweep (2s linear)
 * - Farm Grid: Sequential border color pulse on active tiles
 * - Farmer Slots: Breathing glow on occupied slots (2s, staggered)
 * 
 * BUTTON EFFECTS:
 * - CLAIM button idle: Box shadow pulse (3 variations)
 * - CLAIM button hover: Sweep overlay + glow increase
 * - CLAIM button click: Scale 0.98 + short glow burst
 * - Action menu buttons: Scanline sweep on hover (0.8s)
 * - All buttons: Scale 0.98 on tap with shadow reduction
 * 
 * NOTIFICATION ANIMATIONS:
 * - Announcement dot: Gentle blink (opacity 1→0.5→1, 1s)
 * - Bounty counter badge: Pulsing glow (1.5s repeat)
 * - Status indicator (ONLINE): Breathing effect + shadow pulse
 * 
 * NUMBER ANIMATIONS:
 * - Tabular numerals ensure perfect alignment
 * - Flash effect on value change (200ms duration)
 * - Smooth transitions for changing balances
 * 
 * ACCESSIBILITY:
 * - All animations disabled with prefers-reduced-motion
 * - Motion detection: window.matchMedia("(prefers-reduced-motion: reduce)")
 * - Core functionality unaffected when motion is disabled
 * 
 * PERFORMANCE:
 * - 60 FPS target for all animations
 * - CSS transforms for hardware acceleration
 * - AnimatePresence for modal transitions
 * - Staggered delays to distribute GPU load
 * 
 * ========================================
 */

export {}; // Make this a module
