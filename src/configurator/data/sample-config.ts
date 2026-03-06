import type {
  ProductConfigData,
  MachineOption,
  PowerSystemOption,
  DeckOption,
  AccessoryOption,
  UpgradeOption,
  ServiceOption,
} from '../types/configurator';

// ─── Machines ────────────────────────────────────────────────────

const machines: MachineOption[] = [
  {
    id: 'automower-550-epos',
    title: 'Husqvarna Automower 550 EPOS',
    subtitle: 'Professionele robotmaaier',
    category: 'Robotmaaiers',
    price: 899900, // €8,999 in cents
    heroImage: '/images/automower-550-hero.webp',
    galleryImages: [
      '/images/automower-550-front.webp',
      '/images/automower-550-side.webp',
      '/images/automower-550-top.webp',
    ],
    image: '/images/automower-550-thumb.webp',
    badge: 'popular',
    keySpecs: [
      { label: 'Werkgebied', value: 'Tot 5.000 m²' },
      { label: 'Hellingshoek', value: 'Tot 45%' },
      { label: 'Geluidsniveau', value: '62 dB' },
      { label: 'Gewicht', value: '13,2 kg' },
    ],
    specs: {
      werkgebied: '5.000 m²',
      maaibreedte: '24 cm',
      maaiHoogte: '20-60 mm',
    },
  },
  {
    id: 'automower-550-epos-pro',
    title: 'Husqvarna Automower 550 EPOS PRO',
    subtitle: 'Topmodel voor grote terreinen',
    category: 'Robotmaaiers',
    price: 1199900, // €11,999
    heroImage: '/images/automower-550-pro-hero.webp',
    galleryImages: [],
    image: '/images/automower-550-pro-thumb.webp',
    badge: 'pro',
    keySpecs: [
      { label: 'Werkgebied', value: 'Tot 10.000 m²' },
      { label: 'Hellingshoek', value: 'Tot 50%' },
      { label: 'Geluidsniveau', value: '60 dB' },
      { label: 'Gewicht', value: '14,5 kg' },
    ],
    specs: {},
  },
  {
    id: 'ceora-5000',
    title: 'Husqvarna CEORA 5000',
    subtitle: 'Grootschalige robotmaaier',
    category: 'Robotmaaiers',
    price: 2499900, // €24,999
    heroImage: '/images/ceora-5000-hero.webp',
    galleryImages: [],
    image: '/images/ceora-5000-thumb.webp',
    badge: 'new',
    keySpecs: [
      { label: 'Werkgebied', value: 'Tot 50.000 m²' },
      { label: 'Maaibreedte', value: '56 cm' },
      { label: 'Geluidsniveau', value: '67 dB' },
      { label: 'Gewicht', value: '40 kg' },
    ],
    specs: {},
  },
];

// ─── Power Systems ───────────────────────────────────────────────

const powerSystems: PowerSystemOption[] = [
  {
    id: 'battery-2x',
    title: '2x Accu Systeem',
    subtitle: 'Standaard vermogen',
    type: 'battery',
    batteryCount: 2,
    runtime: '~3 uur',
    price: 0,
    image: '/images/battery-2x.webp',
    description: 'Standaard 2-accu systeem voor normaal gebruik. Ideaal voor terreinen tot 3.000 m².',
  },
  {
    id: 'battery-4x',
    title: '4x Accu Systeem',
    subtitle: 'Verlengde werktijd',
    type: 'battery',
    batteryCount: 4,
    runtime: '~6 uur',
    price: 49900, // +€499
    image: '/images/battery-4x.webp',
    badge: 'recommended',
    description: 'Uitgebreid 4-accu systeem. Ononderbroken werken op grote terreinen.',
  },
  {
    id: 'battery-6x',
    title: '6x Accu Systeem',
    subtitle: 'Maximale capaciteit',
    type: 'battery',
    batteryCount: 6,
    runtime: '~10 uur',
    price: 99900, // +€999
    image: '/images/battery-6x.webp',
    badge: 'pro',
    description: 'Maximale capaciteit voor professionele inzet. Non-stop maaien de hele dag.',
  },
];

// ─── Deck Options ────────────────────────────────────────────────

const deckOptions: DeckOption[] = [
  {
    id: 'deck-108',
    title: '108 cm Maaibord',
    size: 108,
    cuttingWidth: '108 cm',
    price: 0,
    image: '/images/deck-108.webp',
    description: 'Compact maaibord voor terreinen met obstakels.',
  },
  {
    id: 'deck-122',
    title: '122 cm Maaibord',
    size: 122,
    cuttingWidth: '122 cm',
    price: 34900, // +€349
    image: '/images/deck-122.webp',
    badge: 'popular',
    description: 'Meest gekozen door professionals. Optimale balans tussen breedte en wendbaarheid.',
  },
  {
    id: 'deck-137',
    title: '137 cm Maaibord',
    size: 137,
    cuttingWidth: '137 cm',
    price: 69900, // +€699
    image: '/images/deck-137.webp',
    badge: 'pro',
    description: 'Maximale maaibreedte voor grote open terreinen.',
    incompatibleWith: ['mulch-kit-108'],
  },
];

// ─── Accessories ─────────────────────────────────────────────────

const accessories: AccessoryOption[] = [
  {
    id: 'mulch-kit-108',
    title: 'Mulch Kit 108 cm',
    category: 'cutting',
    price: 24900,
    image: '/images/mulch-kit.webp',
    description: 'Mulch kit voor fijnere grassnippers. Voedt het gazon natuurlijk.',
    incompatibleWith: ['deck-137'],
  },
  {
    id: 'mulch-kit-122',
    title: 'Mulch Kit 122 cm',
    category: 'cutting',
    price: 29900,
    image: '/images/mulch-kit-122.webp',
    badge: 'popular',
    description: 'Mulch kit passend bij het 122 cm maaibord.',
  },
  {
    id: 'mulch-kit-137',
    title: 'Mulch Kit 137 cm',
    category: 'cutting',
    price: 34900,
    image: '/images/mulch-kit-137.webp',
    description: 'Mulch kit voor het grote 137 cm maaibord.',
  },
  {
    id: 'led-lights',
    title: 'LED Werkverlichting',
    category: 'lighting',
    price: 12900,
    image: '/images/led-lights.webp',
    badge: 'recommended',
    description: 'Professionele LED verlichting voor werken in slechte lichtomstandigheden.',
  },
  {
    id: 'bumper-kit',
    title: 'Bumper Beschermingskit',
    category: 'protection',
    price: 19900,
    image: '/images/bumper-kit.webp',
    description: 'Verstevigde bumpers voor extra bescherming in ruig terrein.',
  },
  {
    id: 'trailer-hitch',
    title: 'Trekhaak',
    category: 'transport',
    price: 14900,
    image: '/images/trailer-hitch.webp',
    description: 'Trekhaak voor het trekken van aanhangers en opzetsystemen.',
  },
  {
    id: 'snow-blade',
    title: 'Sneeuwschuiver 120 cm',
    category: 'winter',
    price: 129900,
    image: '/images/snow-blade.webp',
    badge: 'new',
    description: 'Professioneel sneeuwruimblad. Vereist contragewicht kit.',
    requires: ['counterweight-kit'],
  },
  {
    id: 'counterweight-kit',
    title: 'Contragewicht Kit',
    category: 'other',
    price: 24900,
    image: '/images/counterweight.webp',
    description: 'Noodzakelijk bij gebruik van sneeuwschuiver of zware opzetstukken.',
  },
];

// ─── Pro Upgrades ────────────────────────────────────────────────

const proUpgrades: UpgradeOption[] = [
  {
    id: 'gps-module',
    title: 'GPS Navigatiemodule',
    category: 'technology',
    price: 79900,
    image: '/images/gps-module.webp',
    badge: 'recommended',
    description: 'Centimeter-nauwkeurige GPS-navigatie via RTK. Geen begrenzingsdraad nodig.',
  },
  {
    id: 'fleet-mgmt',
    title: 'Fleet Management Systeem',
    category: 'fleet',
    price: 49900,
    image: '/images/fleet-mgmt.webp',
    badge: 'pro',
    description: 'Beheer meerdere machines vanuit één dashboard. Live status en planning.',
    requires: ['gps-module'],
  },
  {
    id: 'remote-control',
    title: 'Remote Control Module',
    category: 'control',
    price: 39900,
    image: '/images/remote-control.webp',
    description: 'Bestuur de machine op afstand via de app. Ideaal voor demonstraties.',
  },
  {
    id: 'anti-theft',
    title: 'Anti-diefstal Systeem',
    category: 'safety',
    price: 29900,
    image: '/images/anti-theft.webp',
    description: 'GPS-tracking, alarm, en automatische vergrendeling bij ongeautoriseerd verplaatsen.',
  },
];

// ─── Services ────────────────────────────────────────────────────

const services: ServiceOption[] = [
  {
    id: 'warranty-3y',
    title: 'Uitgebreide Garantie 3 jaar',
    category: 'warranty',
    duration: '3 jaar',
    price: 49900,
    image: '/images/warranty.webp',
    description: 'Verleng de standaard garantie naar 3 jaar inclusief onderdelen en arbeid.',
  },
  {
    id: 'warranty-5y',
    title: 'Uitgebreide Garantie 5 jaar',
    category: 'warranty',
    duration: '5 jaar',
    price: 89900,
    image: '/images/warranty-5y.webp',
    badge: 'popular',
    description: 'Maximale zekerheid met 5 jaar volledige garantie.',
    incompatibleWith: ['warranty-3y'],
  },
  {
    id: 'delivery',
    title: 'Bezorging & Plaatsing',
    category: 'delivery',
    price: 29900,
    image: '/images/delivery.webp',
    description: 'Professionele bezorging en plaatsing op locatie door onze specialisten.',
  },
  {
    id: 'installation',
    title: 'Volledige Installatie',
    category: 'installation',
    price: 99900,
    image: '/images/installation.webp',
    badge: 'recommended',
    description: 'Complete installatie inclusief begrenzingsdraad, laadstation en programmering.',
  },
  {
    id: 'training',
    title: 'Operator Training',
    category: 'training',
    duration: '1 dag',
    price: 34900,
    image: '/images/training.webp',
    description: 'Uitgebreide training voor operators. Inclusief certificaat.',
  },
];

// ─── Compatibility Rules ─────────────────────────────────────────

const compatibilityRules = [
  {
    if: { optionId: 'battery-2x' },
    then: {
      disable: ['fleet-mgmt'],
      recommend: ['battery-4x'],
    },
  },
  {
    if: { optionId: 'snow-blade' },
    then: {
      require: ['counterweight-kit'],
      recommend: ['led-lights'],
    },
  },
  {
    if: { optionId: 'deck-137' },
    then: {
      disable: ['mulch-kit-108'],
      recommend: ['mulch-kit-137'],
    },
  },
  {
    if: { optionId: 'deck-122' },
    then: {
      disable: ['mulch-kit-108', 'mulch-kit-137'],
      recommend: ['mulch-kit-122'],
    },
  },
  {
    if: { optionId: 'deck-108' },
    then: {
      disable: ['mulch-kit-122', 'mulch-kit-137'],
      recommend: ['mulch-kit-108'],
    },
  },
  {
    if: { optionId: 'gps-module' },
    then: {
      recommend: ['fleet-mgmt', 'anti-theft'],
    },
  },
  {
    if: { optionId: 'fleet-mgmt' },
    then: {
      require: ['gps-module'],
    },
  },
  {
    if: { optionId: 'warranty-3y' },
    then: {
      disable: ['warranty-5y'],
    },
  },
  {
    if: { optionId: 'warranty-5y' },
    then: {
      disable: ['warranty-3y'],
    },
  },
];

// ─── Bundle Rules ────────────────────────────────────────────────

const bundleRules = [
  {
    id: 'protection-bundle',
    optionIds: ['bumper-kit', 'led-lights', 'counterweight-kit'],
    discount: 12000, // -€120
    label: 'Beschermingsbundel',
    description: 'Bespaar €120 op de complete beschermingsset',
  },
  {
    id: 'pro-tech-bundle',
    optionIds: ['gps-module', 'fleet-mgmt', 'remote-control'],
    discount: 24000, // -€240
    label: 'Pro Tech Bundel',
    description: 'Bespaar €240 op het complete technologiepakket',
  },
  {
    id: 'full-service-bundle',
    optionIds: ['delivery', 'installation', 'training'],
    discount: 19900, // -€199
    label: 'Volledig Servicepakket',
    description: 'Bespaar €199 bij afname van het complete servicepakket',
  },
];

// ─── Full Product Config ─────────────────────────────────────────

export const sampleProductConfig: ProductConfigData = {
  productId: 'gid://shopify/Product/123456789',
  handle: 'husqvarna-automower-550-epos',
  machines,
  powerSystems,
  deckOptions,
  accessories,
  proUpgrades,
  services,
  compatibilityRules,
  bundleRules,
  defaultConfig: {
    machine: machines[0],
    powerSystem: powerSystems[1], // 4x recommended
    deckSize: deckOptions[1],     // 122cm popular
  },
};
