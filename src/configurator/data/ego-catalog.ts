import type { MachineOption, AccessoryOption } from '../types/configurator';
import type { ModelSpec } from './husqvarna-catalog';

// ─── EGO RMR catalog ──────────────────────────────────────────────
// PathIQ = AI Vision: stereocamera voor virtuele grens, objectdetectie & gazonherkenning
// Alle modellen draadloos (virtuele grens), 4G/5G data 3 jaar inbegrepen

export const egoCatalog: MachineOption[] = [
  {
    id: 'rmr1500e',
    title: 'EGO RMR1500E',
    rrp: 209900,
    description: 'Draadloze robotmaaier met PathIQ AI-vision voor gazons tot 1.500 m². Geen begrenzingsdraad nodig — de maaier herkent zijn gazon zelfstandig via stereocamera. 3 jaar 4G/5G data inbegrepen.',
    price: 199900,
    category: 'Robotmaaier',
    heroImage: 'https://cdn.shopify.com/s/files/1/0790/7636/0505/files/d0e77089-f4e0-433b-b763-659254a870b0.png?v=1773305869',
    galleryImages: [],
    keySpecs: [
      { label: 'Maaioppervlak',    value: 'tot 1.500 m²' },
      { label: 'Max. helling',     value: '50%' },
      { label: 'PathIQ AI-vision', value: '✓ Stereocamera' },
      { label: 'Grensafbakening',  value: 'Virtueel — geen draad' },
      { label: 'Connectiviteit',   value: '4G/5G + WiFi + BT' },
      { label: 'Snijhoogte',       value: '20 – 90 mm' },
      { label: 'Data inbegrepen',  value: '3 jaar' },
    ],
  },
  {
    id: 'rmr3000e',
    title: 'EGO RMR3000E',
    rrp: 249900,
    description: 'Krachtige draadloze robotmaaier voor gazons tot 3.000 m². PathIQ AI-vision elimineert de begrenzingsdraad volledig. Tot 20 maaizones instelbaar, 3 jaar 4G/5G data inbegrepen.',
    price: 239900,
    category: 'Robotmaaier',
    badge: 'popular',
    heroImage: 'https://cdn.shopify.com/s/files/1/0790/7636/0505/files/ego-robotmaaier-rmr3000e_1_6de5fcba-1632-44f8-a7ea-520400c51230.png?v=1773305871',
    galleryImages: [],
    keySpecs: [
      { label: 'Maaioppervlak',    value: 'tot 3.000 m²' },
      { label: 'Max. helling',     value: '50%' },
      { label: 'PathIQ AI-vision', value: '✓ Stereocamera' },
      { label: 'Grensafbakening',  value: 'Virtueel — geen draad' },
      { label: 'Connectiviteit',   value: '4G/5G + WiFi + BT' },
      { label: 'Snijhoogte',       value: '20 – 90 mm' },
      { label: 'Data inbegrepen',  value: '3 jaar' },
    ],
  },
  {
    id: 'rmr6000e',
    title: 'EGO RMR6000E',
    rrp: 374900,
    description: 'Topmodel voor grote gazons tot 6.000 m². PathIQ AI-vision met tot 40 configureerbare maaizones. Dubbele accucapaciteit voor maximale maaiduur. 3 jaar 4G/5G data inbegrepen.',
    price: 364900,
    category: 'Robotmaaier',
    badge: 'pro',
    heroImage: 'https://cdn.shopify.com/s/files/1/0790/7636/0505/files/RMR6000E_EGOEU_ROBOTIC-MOWER_MAIN_01_1_1.webp?v=1773305866',
    galleryImages: [],
    keySpecs: [
      { label: 'Maaioppervlak',    value: 'tot 6.000 m²' },
      { label: 'Max. helling',     value: '50%' },
      { label: 'PathIQ AI-vision', value: '✓ Stereocamera' },
      { label: 'Grensafbakening',  value: 'Virtueel — geen draad' },
      { label: 'Connectiviteit',   value: '4G/5G + WiFi + BT' },
      { label: 'Snijhoogte',       value: '20 – 90 mm' },
      { label: 'Data inbegrepen',  value: '3 jaar' },
    ],
  },
];

// ─── Model specs (used by advisor engine) ────────────────────────

export const EGO_MODEL_SPECS: ModelSpec[] = [
  { id: 'rmr1500e', areaSysM2: 1500, slopeMax: 50, connectivity: 'cellular', wildlife: false, wireless: true, edgeCut: false, objectDetection: true, price: 199900 },
  { id: 'rmr3000e', areaSysM2: 3000, slopeMax: 50, connectivity: 'cellular', wildlife: false, wireless: true, edgeCut: false, objectDetection: true, price: 239900 },
  { id: 'rmr6000e', areaSysM2: 6000, slopeMax: 50, connectivity: 'cellular', wildlife: false, wireless: true, edgeCut: false, objectDetection: true, price: 364900 },
];

// ─── EGO accessories ─────────────────────────────────────────────

export const egoAccessories: AccessoryOption[] = [
  {
    id: 'ego-garage',
    title: 'EGO Robotmaaier Garage',
    description: 'Beschermt het laadstation en de robotmaaier tegen zon, regen en vuil.',
    price: 18900,
    category: 'protection',
    badge: 'popular',
  },
  {
    id: 'ego-messen',
    title: 'EGO Vervangmessen (set)',
    description: 'Originele EGO vervangmessen voor alle RMR-modellen. Voor een strak en gelijkmatig maairesultaat.',
    price: 1999,
    category: 'cutting',
    badge: 'popular',
  },
];
