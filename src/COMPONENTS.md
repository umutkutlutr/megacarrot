# MEGACARROT - Component Architecture

## Core Components

### Base Components

#### `GlassCard`
Reusable glassmorphic card with optional glow and hover effects.
```tsx
<GlassCard glow hoverEffect>
  {children}
</GlassCard>
```

**Props:**
- `children`: ReactNode
- `className?`: string
- `glow?`: boolean - Adds orange glow effect
- `hoverEffect?`: boolean - Adds elevation on hover

---

#### `Button`
Multi-variant button system with color customization.
```tsx
<Button 
  variant="primary" 
  color="#FF6A00" 
  size="lg"
  fullWidth
  onClick={handleClick}
>
  Click Me
</Button>
```

**Props:**
- `children`: ReactNode
- `variant?`: "primary" | "secondary" | "success" | "disabled"
- `color?`: string (hex color)
- `size?`: "sm" | "md" | "lg"
- `fullWidth?`: boolean
- `onClick?`: () => void
- `disabled?`: boolean

---

#### `Badge`
Category or status badge with semantic color.
```tsx
<Badge color="#3CFF8F" variant="glow">
  EFFICIENCY
</Badge>
```

**Props:**
- `children`: ReactNode
- `color?`: string
- `variant?`: "default" | "glow"

---

#### `ProgressBar`
Animated progress bar with optional moving dot indicator.
```tsx
<ProgressBar 
  progress={75} 
  color="#FF6A00"
  height={8}
  showDot
  animated
  delay={0.2}
/>
```

**Props:**
- `progress`: number (0-100)
- `color?`: string
- `height?`: number (pixels)
- `animated?`: boolean
- `showDot?`: boolean
- `delay?`: number (seconds)

---

#### `IconContainer`
Animated icon wrapper with color theming.
```tsx
<IconContainer color="#FF6A00" size={80} animated>
  <Zap size={32} />
</IconContainer>
```

**Props:**
- `children`: ReactNode (icon)
- `color?`: string
- `size?`: number (pixels)
- `animated?`: boolean (hover + pulse)

---

### Card Components

#### `UpgradeCard`
Vertical stacked upgrade card with icon, content, progress, and action button.
```tsx
<UpgradeCard
  icon={<Zap size={32} />}
  title="Quantum Accelerator"
  category="Production"
  description="Increases production by 25%"
  level={3}
  maxLevel={10}
  cost={3500}
  color="#FF6A00"
  onUpgrade={handleUpgrade}
  index={0}
/>
```

**Props:**
- `icon`: ReactNode
- `title`: string
- `category`: "Production" | "Efficiency" | "Speed" | "Boost"
- `description`: string
- `level`: number
- `maxLevel`: number
- `cost`: number
- `color`: string
- `onUpgrade?`: () => void
- `disabled?`: boolean
- `index?`: number (for stagger animation)

---

#### `FarmCard`
Farm tier card with production stats and unlock state.
```tsx
<FarmCard
  level={1}
  name="GENESIS PLOT"
  production={125}
  efficiency={85}
  complexity={1}
  unlocked={true}
  color="#FF6A00"
  cost={2500}
  onBoost={handleBoost}
  index={0}
/>
```

**Props:**
- `level`: number
- `name`: string
- `production`: number
- `efficiency`: number
- `complexity`: number (1-7)
- `unlocked`: boolean
- `color`: string
- `cost`: number
- `onBoost?`: () => void
- `index?`: number

---

#### `FarmerCard`
Operative card with avatar, stats, and upgrade functionality.
```tsx
<FarmerCard
  id={1}
  name="ALPHA CULTIVATOR"
  level={5}
  boost={125}
  unlocked={true}
  color="#FF6A00"
  specialty="Genesis Operations"
  imageUrl="https://..."
  onUpgrade={handleUpgrade}
  index={0}
/>
```

**Props:**
- `id`: number
- `name`: string
- `level`: number
- `boost`: number
- `unlocked`: boolean
- `color`: string
- `specialty`: string
- `imageUrl?`: string
- `onUpgrade?`: () => void
- `index?`: number

---

### Modal Components

#### `Modal`
Base modal wrapper with backdrop and close button.
```tsx
<Modal isOpen={true} onClose={handleClose} maxWidth="600px">
  <div className="p-10">
    Modal content here
  </div>
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `children`: ReactNode
- `maxWidth?`: string

---

#### `UpgradeModal`
Specialized modal for farmer upgrades with before/after stats.
```tsx
<UpgradeModal
  isOpen={true}
  onClose={handleClose}
  farmerName="ALPHA CULTIVATOR"
  currentLevel={5}
  currentBoost={125}
  newLevel={6}
  newBoost={150}
  cost={2500}
  color="#FF6A00"
  onConfirm={handleConfirm}
/>
```

---

### Section Components

#### `HeroSection`
Landing hero with animated stats and production counter.

#### `FarmSection`
Vertical stacked farm tier cards.

#### `FarmersSection`
Horizontal scrollable farmer carousel with modal.

#### `UpgradeSection`
Protocol upgrade list with vertical card layout.

#### `WalletSection`
Balance display, chart, and transaction history.

---

### Utility Components

#### `AnimatedCounter`
Number counter with smooth animation.
```tsx
<AnimatedCounter value={1247} />
```

#### `Skeleton`
Loading skeleton with shimmer effect.
```tsx
<Skeleton width="200px" height="24px" />
<CardSkeleton />
<LoadingScreen />
```

---

### Navigation Components

#### `TopNav`
Fixed top navigation bar with tabs and balance indicator.
```tsx
<TopNav activeTab="farm" onTabChange={setActiveTab} />
```

---

## Color System

### Semantic Colors
- **Production/Action**: `#FF6A00` (Toxic Orange)
- **Efficiency/Success**: `#3CFF8F` (Neon Green)
- **Speed/Time**: `#00E5FF` (Cold Cyan)

### Usage Pattern
All components accept a `color` prop that can be any hex value. Use semantic colors for consistency:

```tsx
// Production upgrade
<UpgradeCard color="#FF6A00" category="Production" />

// Efficiency upgrade
<UpgradeCard color="#3CFF8F" category="Efficiency" />

// Speed upgrade
<UpgradeCard color="#00E5FF" category="Speed" />
```

---

## Animation System

### Easing Curve
All animations use: `cubic-bezier(0.22, 1, 0.36, 1)`

### Timing
- **Micro interactions**: 150-200ms
- **Card animations**: 300-400ms
- **Modal transitions**: 300ms
- **Stagger delay**: 40-50ms per item

### Implementation
```tsx
transition={{ 
  duration: 0.3, 
  ease: [0.22, 1, 0.36, 1] 
}}
```

---

## Grid System

### Container
Uses 12-column grid with centered content:
```tsx
<div className="grid-container">
  <div className="col-span-12">
    Full width content
  </div>
</div>
```

### Responsive Breakpoints
- **1440px**: Base (1000px content)
- **1680px**: Medium (1200px content)
- **1920px**: Large (1400px content)
- **<1024px**: Tablet
- **<768px**: Mobile

---

## State Management Pattern

Components are designed to be controlled from parent:

```tsx
function ParentComponent() {
  const [data, setData] = useState(initialData);
  
  return (
    <UpgradeCard
      {...data}
      onUpgrade={() => {
        // Handle state update
        setData(prev => ({ ...prev, level: prev.level + 1 }));
      }}
    />
  );
}
```

---

## TypeScript Types

All components are fully typed with interface definitions:

```tsx
interface UpgradeCardProps {
  icon: React.ReactNode;
  title: string;
  category: "Production" | "Efficiency" | "Speed" | "Boost";
  // ... more props
}
```

Export types for external use:
```tsx
import type { ButtonVariant } from './components/Button';
import type { UpgradeCategory } from './components/UpgradeCard';
```

---

## Developer Guidelines

### Adding New Features
1. Create component in `/components`
2. Define TypeScript interface
3. Use semantic color props
4. Follow animation timing standards
5. Add viewport animations with `whileInView`
6. Include index prop for stagger animations

### Naming Conventions
- Components: PascalCase (`UpgradeCard`)
- Props: camelCase (`onUpgrade`)
- CSS classes: kebab-case (`grid-container`)
- Colors: semantic (`color="#FF6A00"`)

### File Structure
```
/components
  /Button.tsx
  /GlassCard.tsx
  /UpgradeCard.tsx
  /FarmCard.tsx
  /FarmerCard.tsx
  /Modal.tsx
  /Badge.tsx
  /ProgressBar.tsx
  /IconContainer.tsx
  /AnimatedCounter.tsx
  /Skeleton.tsx
  /TopNav.tsx
  /HeroSection.tsx
  /FarmSection.tsx
  /FarmersSection.tsx
  /UpgradeSection.tsx
  /WalletSection.tsx
/styles
  /globals.css
/App.tsx
```