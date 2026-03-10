// ─── Core Option Types ───────────────────────────────────────────

export interface ConfigOption {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  price: number;
  image?: string;
  badge?: 'recommended' | 'popular' | 'new' | 'pro';
  compatibleWith?: string[];
  incompatibleWith?: string[];   // marks others as disabled in UI + removes them on select
  removesOnSelect?: string[];    // removes these on select, but does NOT disable them in UI
  requires?: string[];
  specs?: Record<string, string>;
}

export interface BundleRule {
  id: string;
  optionIds: string[];
  discount: number;
  label: string;
  description?: string;
}

export interface CompatibilityRule {
  if: { optionId: string };
  then: {
    show?: string[];
    hide?: string[];
    recommend?: string[];
    require?: string[];
    disable?: string[];
  };
}

// ─── Step-Specific Option Types ──────────────────────────────────

export interface MachineOption extends ConfigOption {
  category: string;
  heroImage: string;
  galleryImages: string[];
  keySpecs: { label: string; value: string }[];
}

export interface PowerSystemOption extends ConfigOption {
  type: 'battery' | 'fuel' | 'hybrid' | 'electric';
  batteryCount?: number;
  runtime?: string;
}

export interface DeckOption extends ConfigOption {
  size: number; // cm
  cuttingWidth: string;
}

export interface AccessoryOption extends ConfigOption {
  category: 'protection' | 'lighting' | 'cutting' | 'transport' | 'winter' | 'other';
}

export interface UpgradeOption extends ConfigOption {
  category: 'technology' | 'control' | 'fleet' | 'safety';
}

export interface ServiceOption extends ConfigOption {
  category: 'warranty' | 'delivery' | 'installation' | 'training' | 'maintenance' | 'lease' | 'service-contract';
  duration?: string;
  billing?: 'monthly' | 'once';
}

// ─── Machine Configuration State ─────────────────────────────────

export interface MachineConfig {
  machine: MachineOption | null;
  powerSystem: PowerSystemOption | null;
  deckSize: DeckOption | null;
  accessories: AccessoryOption[];
  proUpgrades: UpgradeOption[];
  services: ServiceOption[];
}

// ─── Product Data (loaded from Shopify metafields) ───────────────

export interface ProductConfigData {
  productId: string;
  handle: string;
  machines: MachineOption[];
  powerSystems: PowerSystemOption[];
  deckOptions: DeckOption[];
  accessories: AccessoryOption[];
  proUpgrades: UpgradeOption[];
  services: ServiceOption[];
  compatibilityRules: CompatibilityRule[];
  bundleRules: BundleRule[];
  defaultConfig?: Partial<MachineConfig>;
}

// ─── Pricing ─────────────────────────────────────────────────────

export interface PriceBreakdown {
  basePrice: number;
  optionsTotal: number;
  bundleDiscount: number;
  activeBundles: { label: string; discount: number }[];
  totalPrice: number;
  lineItems: { label: string; price: number }[];
}

// ─── Configurator State ──────────────────────────────────────────

export type ConfigStep =
  | 'machine'
  | 'power'
  | 'core'
  | 'accessories'
  | 'upgrades'
  | 'service'
  | 'summary';

export const STEP_ORDER: ConfigStep[] = [
  'machine',
  'power',
  'core',
  'accessories',
  'upgrades',
  'service',
  'summary',
];

export const STEP_LABELS: Record<ConfigStep, string> = {
  machine: 'Machine',
  power: 'Aandrijving',
  core: 'Configuratie',
  accessories: 'Accessoires',
  upgrades: 'Pro Upgrades',
  service: 'Service',
  summary: 'Overzicht',
};

export interface ConfiguratorState {
  currentStep: ConfigStep;
  config: MachineConfig;
  productData: ProductConfigData | null;
  isLoading: boolean;
  disabledOptions: Set<string>;
  recommendedOptions: Set<string>;
  requiredOptions: Set<string>;
}

// ─── Actions ─────────────────────────────────────────────────────

export type ConfiguratorAction =
  | { type: 'SET_PRODUCT_DATA'; payload: ProductConfigData }
  | { type: 'SET_STEP'; payload: ConfigStep }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SELECT_MACHINE'; payload: MachineOption }
  | { type: 'SELECT_POWER_SYSTEM'; payload: PowerSystemOption }
  | { type: 'SELECT_DECK'; payload: DeckOption }
  | { type: 'TOGGLE_ACCESSORY'; payload: AccessoryOption }
  | { type: 'TOGGLE_UPGRADE'; payload: UpgradeOption }
  | { type: 'TOGGLE_SERVICE'; payload: ServiceOption }
  | { type: 'RESET' };
