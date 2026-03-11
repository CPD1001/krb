import type { MachineOption, AccessoryOption } from '../types/configurator';
import type { ModelSpec } from './husqvarna-catalog';

const CDN = 'https://www.stihl.nl/content/dam/stihl/media/pim';

// ─── Stihl iMOW catalog ───────────────────────────────────────────
// Prices are indicative — update to actual Keizers-prices

export const stihlCatalog: MachineOption[] = [
  {
    id: 'imow-3',
    title: 'STIHL iMOW 3',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'Compacte robotmaaier voor gazons tot 500 m². App-bediening via WiFi. Ideaal voor vlakke tot licht hellende terreinen.',
    price: 79900,
    category: 'Robotmaaier',
    heroImage: 'https://cdn.shopify.com/s/files/1/0790/7636/0505/files/StihliMOW3.0Robotmaaier_2_3cd1327f-1ae6-4052-9757-36b8021b9458.png?v=1773235446',
    galleryImages: [
      'https://cdn.shopify.com/s/files/1/0790/7636/0505/files/StihliMOW3.0Robotmaaier_387e75c2-61db-4883-831e-2fad07d60199.png?v=1773235446',
      'https://cdn.shopify.com/s/files/1/0790/7636/0505/files/Stihl_iMOW_3.0_Robotmaaier_8_321923f5-ee06-4c1f-89d8-3e1e475a6759.png?v=1773235446',
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 500 m²' },
      { label: 'Max. helling',   value: '40%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
  {
    id: 'imow-3-evo',
    title: 'STIHL iMOW 3 EVO',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'Verbeterde EVO-versie van de iMOW 3, geschikt voor terreinen tot 45% helling. App-bediening via WiFi.',
    price: 89900,
    category: 'Robotmaaier',
    badge: 'new',
    heroImage: `${CDN}/124619.jpg`,
    galleryImages: [
      `${CDN}/124621.jpg`,
      `${CDN}/124429.jpg`,
      `${CDN}/126492.jpg`,
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 500 m²' },
      { label: 'Max. helling',   value: '45%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
  {
    id: 'imow-4',
    title: 'STIHL iMOW 4',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'Robotmaaier voor middelgrote gazons tot 1.000 m². Inclusief app-bediening en zonenbeheer.',
    price: 109900,
    category: 'Robotmaaier',
    heroImage: `${CDN}/124416.jpg`,
    galleryImages: [
      `${CDN}/124418.jpg`,
      `${CDN}/124421.jpg`,
      `${CDN}/126493.jpg`,
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 1.000 m²' },
      { label: 'Max. helling',   value: '40%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
  {
    id: 'imow-4-evo',
    title: 'STIHL iMOW 4 EVO',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'EVO-versie voor gazons tot 1.000 m² met verbeterde hellingcapaciteit tot 45%. WiFi-app inbegrepen.',
    price: 119900,
    category: 'Robotmaaier',
    badge: 'new',
    heroImage: `${CDN}/124624.jpg`,
    galleryImages: [
      `${CDN}/124623.jpg`,
      `${CDN}/124440.jpg`,
      `${CDN}/126430.jpg`,
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 1.000 m²' },
      { label: 'Max. helling',   value: '45%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
  {
    id: 'imow-5',
    title: 'STIHL iMOW 5',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'Krachtige robotmaaier voor grote gazons tot 1.500 m². App-bediening, zonenbeheer en seizoensplanning.',
    price: 139900,
    category: 'Robotmaaier',
    badge: 'popular',
    heroImage: `${CDN}/95142.jpg`,
    galleryImages: [
      `${CDN}/95350.jpg`,
      `${CDN}/95469.jpg`,
      `${CDN}/95471.jpg`,
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 1.500 m²' },
      { label: 'Max. helling',   value: '40%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
  {
    id: 'imow-5-evo',
    title: 'STIHL iMOW 5 EVO',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'EVO-versie voor gazons tot 1.500 m², geschikt voor terreinen tot 45% helling. Ideaal voor glooiende tuinen.',
    price: 149900,
    category: 'Robotmaaier',
    badge: 'new',
    heroImage: `${CDN}/95146.jpg`,
    galleryImages: [
      `${CDN}/95143.jpg`,
      `${CDN}/95150.jpg`,
      `${CDN}/95149.jpg`,
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 1.500 m²' },
      { label: 'Max. helling',   value: '45%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
  {
    id: 'imow-6',
    title: 'STIHL iMOW 6',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'Topmodel voor grote tuinen tot 3.000 m². Meerdere zones, uitgebreide app-bediening en automatische planning.',
    price: 179900,
    category: 'Robotmaaier',
    heroImage: `${CDN}/95347.jpg`,
    galleryImages: [
      `${CDN}/95153.jpg`,
      `${CDN}/95345.jpg`,
      `${CDN}/95469.jpg`,
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 3.000 m²' },
      { label: 'Max. helling',   value: '40%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
  {
    id: 'imow-6-evo',
    title: 'STIHL iMOW 6 EVO',
    subtitle: 'Keizers-prijs — neem contact op',
    description: 'Het krachtigste iMOW-model voor tuinen tot 3.000 m², tot 45% helling. Volledig app-gestuurd met geavanceerde zoneplanning.',
    price: 199900,
    category: 'Robotmaaier',
    badge: 'popular',
    heroImage: `${CDN}/95157.jpg`,
    galleryImages: [
      `${CDN}/95155.jpg`,
      `${CDN}/95159.jpg`,
      `${CDN}/95161.jpg`,
    ],
    keySpecs: [
      { label: 'Maaioppervlak',  value: 'tot 3.000 m²' },
      { label: 'Max. helling',   value: '45%' },
      { label: 'Connectiviteit', value: 'WiFi-app' },
    ],
  },
];

// ─── Model specs (used by advisor engine) ────────────────────────

export const STIHL_MODEL_SPECS: ModelSpec[] = [
  { id: 'imow-3',     areaSysM2:  500, slopeMax: 40, smart: true, wildlife: false, price: 79900  },
  { id: 'imow-3-evo', areaSysM2:  500, slopeMax: 45, smart: true, wildlife: false, price: 89900  },
  { id: 'imow-4',     areaSysM2: 1000, slopeMax: 40, smart: true, wildlife: false, price: 109900 },
  { id: 'imow-4-evo', areaSysM2: 1000, slopeMax: 45, smart: true, wildlife: false, price: 119900 },
  { id: 'imow-5',     areaSysM2: 1500, slopeMax: 40, smart: true, wildlife: false, price: 139900 },
  { id: 'imow-5-evo', areaSysM2: 1500, slopeMax: 45, smart: true, wildlife: false, price: 149900 },
  { id: 'imow-6',     areaSysM2: 3000, slopeMax: 40, smart: true, wildlife: false, price: 179900 },
  { id: 'imow-6-evo', areaSysM2: 3000, slopeMax: 45, smart: true, wildlife: false, price: 199900 },
];

// ─── Stihl accessories ────────────────────────────────────────────

export const stihlAccessories: AccessoryOption[] = [
  {
    id: 'stihl-garage',
    title: 'STIHL iMOW Garage',
    description: 'Beschermt het basisstation en de robotmaaier tegen zon, regen en vuil. Verlengt de levensduur.',
    price: 18900,
    category: 'protection',
    badge: 'popular',
  },
  {
    id: 'stihl-messen',
    title: 'STIHL iMOW Vervangmessen (set)',
    description: 'Originele STIHL vervangmessen voor alle iMOW-modellen. Zorgen voor een strak en gelijkmatig maairesultaat.',
    price: 1599,
    category: 'cutting',
    badge: 'popular',
  },
  {
    id: 'stihl-begrenzingsdraad',
    title: 'STIHL Begrenzingsdraad (100 m)',
    description: 'Extra begrenzingsdraad voor het afbakenen van maaizones en obstakels.',
    price: 2499,
    category: 'other',
  },
  {
    id: 'stihl-pennen',
    title: 'STIHL Draadpennen (set van 150)',
    description: 'Bevestigingspennen voor het vastzetten van de begrenzings- en geleidingsdraad in de grond.',
    price: 1299,
    category: 'other',
  },
];
