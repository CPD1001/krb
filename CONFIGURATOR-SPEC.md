# Keizers Pro Machine Configurator - Full Specification

## 1. UX CONCEPT

### Philosophy
The configurator transforms a complex B2B purchase into a guided, premium experience.
Every interaction should feel intentional, polished, and confidence-building — like configuring
a Tesla Model S or a Herman Miller Aeron.

### Core Principles
1. **Progressive Disclosure** — Never overwhelm. Show one decision at a time.
2. **Visual Confidence** — The product image updates live with every selection.
3. **Smart Defaults** — Pre-select the most popular professional configuration.
4. **Price Transparency** — Running total always visible. No surprises.
5. **Guided Expertise** — The configurator is the expert. It recommends, validates, bundles.

### User Journey (7 Steps)
```
Step 1: Machine Selection      → Choose base machine (hero image, key specs)
Step 2: Power System           → Battery / Fuel / Hybrid / Electric
Step 3: Core Configuration     → Deck size, cutting system, drive type
Step 4: Accessories            → Mulch kit, LED lights, bumpers, trailer hitch
Step 5: Professional Upgrades  → GPS, fleet management, remote control
Step 6: Service & Installation → Warranty, delivery, installation, training
Step 7: Summary & Quote        → Full overview, PDF quote, add to cart
```

### Emotional Design Cues
- Dark background with high-contrast product photography
- Subtle animations on selection (scale, glow, checkmark)
- Progress bar showing journey completion
- "Your Configuration" label — ownership language
- Savings callouts in green accent color

---

## 2. UI LAYOUT

### Desktop (≥1024px)
```
┌─────────────────────────────────────────────────────────┐
│  LOGO          Step 1 · 2 · 3 · 4 · 5 · 6 · 7    [X]  │
├───────────────────────────┬─────────────────────────────┤
│                           │                             │
│                           │  Step Title                 │
│                           │  Subtitle / guidance text   │
│     PRODUCT IMAGE         │                             │
│     (updates live)        │  ┌─────────┐ ┌─────────┐   │
│                           │  │Option A │ │Option B │   │
│     360° / angle switch   │  └─────────┘ └─────────┘   │
│                           │  ┌─────────┐ ┌─────────┐   │
│                           │  │Option C │ │Option D │   │
│                           │  └─────────┘ └─────────┘   │
│                           │                             │
│                           │  ⭐ Recommended bundle      │
│                           │  "Save €240"                │
│                           │                             │
│                           │  [← Back]     [Next Step →] │
├───────────────────────────┴─────────────────────────────┤
│  ██████████░░░░░  Step 3/7    Total: €9,477   [Summary] │
└─────────────────────────────────────────────────────────┘
```

### Key UI Elements
- **Left Panel (55%)**: Product hero image, angle selector, subtle gradient bg
- **Right Panel (45%)**: Step content, option cards, navigation
- **Bottom Bar (fixed)**: Progress, running total, summary shortcut
- **Option Cards**: Thumbnail + name + price delta + compatibility badge

### Mobile (< 768px)
```
┌───────────────────────┐
│  Step 3 of 7    [X]   │
│  ████████░░░░░░░░░░░  │
├───────────────────────┤
│                       │
│   PRODUCT IMAGE       │
│   (swipeable)         │
│                       │
├───────────────────────┤
│  Core Configuration   │
│                       │
│  ┌─────────────────┐  │
│  │   Option A      │  │
│  │   +€349         │  │
│  └─────────────────┘  │
│  ┌─────────────────┐  │
│  │   Option B      │  │
│  │   +€129         │  │
│  └─────────────────┘  │
│                       │
│  [← Back] [Next →]   │
├───────────────────────┤
│  Total: €9,477  [▲]   │
└───────────────────────┘
```

---

## 3. COMPONENT ARCHITECTURE

```
<ConfiguratorProvider>              ← Global state (React Context + useReducer)
  <ConfiguratorShell>               ← Layout wrapper
    <ProgressBar />                 ← Step indicator
    <ProductVisual />               ← Left panel: hero image, angle switch
    <StepContainer>                 ← Right panel: renders active step
      <StepMachineSelection />
      <StepPowerSystem />
      <StepCoreConfig />
      <StepAccessories />
      <StepProUpgrades />
      <StepService />
      <StepSummary />
    </StepContainer>
    <StickyPriceBar />              ← Bottom bar: price, progress, CTA
  </ConfiguratorShell>
</ConfiguratorProvider>

Shared Components:
  <OptionCard />                    ← Selectable option with image, price, badge
  <OptionGroup />                   ← Radio group or checkbox group
  <BundleCard />                    ← Recommended bundle callout
  <PriceDelta />                    ← "+€349" price chip
  <CompatibilityBadge />            ← "Compatible" / "Requires X"
  <RecommendedBadge />              ← "Most chosen by professionals"
  <StepNavigation />                ← Back / Next buttons
```

---

## 4. DATA MODEL

### Product Configuration Schema
```typescript
interface MachineConfig {
  machine: {
    id: string;
    handle: string;
    title: string;
    basePrice: number;
    images: Record<string, string>;  // angle → URL
    specs: MachineSpecs;
  };
  powerSystem: PowerSystemOption;
  coreConfig: {
    deckSize: DeckOption;
    cuttingSystem: CuttingOption;
    driveType: DriveOption;
  };
  accessories: AccessoryOption[];
  proUpgrades: UpgradeOption[];
  service: ServiceOption[];
}

interface ConfigOption {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  badge?: 'recommended' | 'popular' | 'new';
  compatibleWith?: string[];     // option IDs
  incompatibleWith?: string[];   // option IDs
  requires?: string[];           // prerequisite option IDs
  bundlesWith?: BundleRule[];
}

interface BundleRule {
  optionIds: string[];
  discount: number;
  label: string;  // "Professional Bundle — Save €240"
}

interface CompatibilityRule {
  if: { optionId: string };
  then: {
    show?: string[];
    hide?: string[];
    recommend?: string[];
    require?: string[];
    disable?: string[];
  };
}
```

### Shopify Metafield Structure
```
product.metafields.configurator.power_systems     → JSON array of PowerSystemOption
product.metafields.configurator.deck_options       → JSON array of DeckOption
product.metafields.configurator.accessories        → JSON array of AccessoryOption
product.metafields.configurator.pro_upgrades       → JSON array of UpgradeOption
product.metafields.configurator.service_options     → JSON array of ServiceOption
product.metafields.configurator.compatibility_rules → JSON array of CompatibilityRule
product.metafields.configurator.bundle_rules        → JSON array of BundleRule
product.metafields.configurator.images              → JSON map of config→image URL
product.metafields.configurator.default_config      → JSON default selections
```

---

## 5. SHOPIFY INTEGRATION

### Product Structure
```
Product: "Husqvarna Automower 550 EPOS"
  ├── Variant: Base Machine (€8,999)
  ├── Metafield: configurator.power_systems
  ├── Metafield: configurator.accessories
  ├── Metafield: configurator.compatibility_rules
  └── Metafield: configurator.bundle_rules

Accessories as separate products (linked via metafield IDs):
  ├── Product: "Mulch Kit 122cm" (€349)
  ├── Product: "LED Work Light Kit" (€129)
  ├── Product: "Snow Blade 120cm" (€1,299)
  └── Product: "Counterweight Kit" (€249)
```

### Cart Integration
Each configured machine adds to cart as:
```javascript
{
  items: [
    {
      id: machineVariantId,
      quantity: 1,
      properties: {
        '_configuration_id': 'cfg_abc123',
        '_power_system': 'Battery 6x',
        '_deck_size': '122cm',
        '_bundle_discount': '-€240'
      }
    },
    { id: mulchKitVariantId, quantity: 1, properties: { '_config_ref': 'cfg_abc123' } },
    { id: ledLightVariantId, quantity: 1, properties: { '_config_ref': 'cfg_abc123' } }
  ]
}
```

### Liquid Template Integration
```liquid
{% if product.metafields.configurator.power_systems %}
  <div id="keizers-configurator"
    data-product-id="{{ product.id }}"
    data-product-handle="{{ product.handle }}"
    data-base-price="{{ product.price }}"
    data-config='{{ product.metafields.configurator | json }}'>
  </div>
  <script src="{{ 'configurator.js' | asset_url }}" defer></script>
{% else %}
  <!-- Standard product template -->
{% endif %}
```

---

## 6. DYNAMIC PRICING LOGIC

### Price Calculation
```
Total = Base Price
      + Σ(selected option prices)
      - Σ(applicable bundle discounts)
      + service fees
      - volume discounts (if applicable)
```

### Bundle Discount Rules
```
IF selected includes [mulch_kit, led_lights, bumper_kit]
  THEN apply "Protection Bundle" discount = -€120

IF selected includes [gps_module, fleet_mgmt, remote_ctrl]
  THEN apply "Pro Tech Bundle" discount = -€240

IF selected includes [delivery, installation, training]
  THEN apply "Full Service Bundle" discount = -€199
```

### Compatibility Auto-Disable
```
IF power_system = "battery_2x"
  THEN disable options requiring 4x+ battery
  THEN show upgrade prompt "Upgrade to 4x for these features"

IF deck_size = "137cm"
  THEN disable mulch_kit_108
  THEN auto-select mulch_kit_137

IF selected snow_blade
  THEN require counterweight_kit (auto-add with notice)
  THEN recommend led_lights
```

---

## 7. MOBILE UX

- Full-screen step-by-step wizard (no split panel)
- Product image at top (30% viewport), scrollable options below
- Swipe gestures between steps (with haptic feedback intent)
- Bottom sheet for price breakdown (expandable)
- Large touch targets (min 48px)
- Sticky CTA button at bottom
- Option cards stack vertically, full width

---

## 8. PERFORMANCE

- Initial JS bundle < 45KB gzipped
- Lazy load step components (dynamic import)
- Preload next step's images on current step
- Product images: WebP with LQIP (low quality placeholder)
- Debounce price calculations (16ms RAF)
- No external dependencies beyond React
- CSS-in-JS via CSS custom properties (no runtime)
- Intersection Observer for scroll animations

---

## 9. UPSELL PSYCHOLOGY

1. **Social Proof**: "87% of professionals choose this option"
2. **Anchoring**: Show premium option first, then standard
3. **Bundle Savings**: "Save €240 with the Pro Bundle"
4. **Loss Aversion**: "Without GPS, you'll need manual boundary setup"
5. **Smart Defaults**: Pre-select the most popular config
6. **Progress Commitment**: Once 4 steps done, users rarely abandon
7. **Comparison**: Side-by-side option comparison on hover
8. **Scarcity**: "Limited stock on 137cm decks"

---

## 10. FILE STRUCTURE
```
keizers/
├── src/
│   ├── configurator/
│   │   ├── ConfiguratorApp.tsx         ← Entry point
│   │   ├── ConfiguratorProvider.tsx     ← State management
│   │   ├── ConfiguratorShell.tsx        ← Layout
│   │   ├── hooks/
│   │   │   ├── useConfigurator.ts       ← Main hook
│   │   │   ├── usePricing.ts            ← Price calculation
│   │   │   └── useCompatibility.ts      ← Compatibility engine
│   │   ├── steps/
│   │   │   ├── StepMachine.tsx
│   │   │   ├── StepPowerSystem.tsx
│   │   │   ├── StepCoreConfig.tsx
│   │   │   ├── StepAccessories.tsx
│   │   │   ├── StepProUpgrades.tsx
│   │   │   ├── StepService.tsx
│   │   │   └── StepSummary.tsx
│   │   ├── components/
│   │   │   ├── OptionCard.tsx
│   │   │   ├── OptionGroup.tsx
│   │   │   ├── BundleCard.tsx
│   │   │   ├── ProductVisual.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── StickyPriceBar.tsx
│   │   │   ├── StepNavigation.tsx
│   │   │   ├── PriceDelta.tsx
│   │   │   └── CompatibilityBadge.tsx
│   │   ├── engine/
│   │   │   ├── pricing.ts               ← Pure pricing functions
│   │   │   ├── compatibility.ts          ← Compatibility resolver
│   │   │   └── shopify-cart.ts           ← Cart API integration
│   │   ├── types/
│   │   │   └── configurator.ts           ← All TypeScript interfaces
│   │   ├── data/
│   │   │   └── sample-config.ts          ← Example product data
│   │   └── styles/
│   │       └── configurator.css          ← All styles (CSS custom props)
│   └── shopify/
│       ├── product-configurator.liquid   ← Shopify template
│       └── metafield-schema.json         ← Metafield definitions
├── CONFIGURATOR-SPEC.md
└── package.json
```
