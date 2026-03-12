import type { MachineOption, AccessoryOption, ServiceOption } from '../configurator/types/configurator';
import type { ModelSpec } from '../configurator/data/husqvarna-catalog';
import { husqvarnaCatalog, MODEL_SPECS as HUSQVARNA_SPECS } from '../configurator/data/husqvarna-catalog';
import { getAccessoriesForModel } from '../configurator/data/shared-accessories';
import { sharedServices } from '../configurator/data/shared-services';

// Installation-only services for brands without warranty/service/lease contracts
const installationOnlyServices = sharedServices.filter(s => s.category === 'installation');

// Warranty/service/lease options shown as locked (Husqvarna-exclusive) in other brands
const husqvarnaExclusiveLocked = sharedServices
  .filter(s => ['warranty', 'service-contract', 'lease'].includes(s.category))
  .map(s => ({ ...s, lockedReason: 'Alleen beschikbaar voor Husqvarna modellen' }));

const stihlServices = [...installationOnlyServices, ...husqvarnaExclusiveLocked];
import { stihlCatalog, STIHL_MODEL_SPECS, stihlAccessories } from '../configurator/data/stihl-catalog';
import { egoCatalog, EGO_MODEL_SPECS, egoAccessories } from '../configurator/data/ego-catalog';
import { kressCatalog, KRESS_MODEL_SPECS, kressAccessories } from '../configurator/data/kress-catalog';

// ─── Brand theme ──────────────────────────────────────────────────

export interface BrandColors {
  accent:         string;   // primary brand color
  accentLight:    string;   // lighter variant
  accentHover:    string;   // darker on hover
  accentGlow:     string;   // rgba glow for shadows
  cardHover:      string;   // card background on hover
  cardSelected:   string;   // card background when selected
  borderSelected: string;   // border color when selected
}

// ─── Brand definition ─────────────────────────────────────────────

export interface BrandDef {
  id:             string;
  name:           string;
  colors:         BrandColors;
  logoUrl?:       string;
  modelSpecs:     ModelSpec[];
  catalog:        MachineOption[];
  getAccessories: (modelId: string) => AccessoryOption[];
  services:       ServiceOption[];
}

// ─── Husqvarna ────────────────────────────────────────────────────

export const husqvarnaBrand: BrandDef = {
  id:   'husqvarna',
  name: 'Husqvarna',
  colors: {
    accent:         '#283B5F',
    accentLight:    '#5b7db8',
    accentHover:    '#344d7a',
    accentGlow:     'rgba(40, 59, 95, 0.2)',
    cardHover:      '#f0f4f9',
    cardSelected:   '#e8eef7',
    borderSelected: '#283B5F',
  },
  modelSpecs:     HUSQVARNA_SPECS,
  catalog:        husqvarnaCatalog,
  getAccessories: getAccessoriesForModel,
  services:       sharedServices,
};

// ─── STIHL ────────────────────────────────────────────────────────
// Pantone 165 / HKS 8 / RAL 2008

export const stihlBrand: BrandDef = {
  id:   'stihl',
  name: 'STIHL',
  colors: {
    accent:         '#F47920',
    accentLight:    '#F8A55C',
    accentHover:    '#D96510',
    accentGlow:     'rgba(244, 121, 32, 0.2)',
    cardHover:      '#FFF4EC',
    cardSelected:   '#FFE9D5',
    borderSelected: '#F47920',
  },
  modelSpecs:     STIHL_MODEL_SPECS,
  catalog:        stihlCatalog,
  getAccessories: () => stihlAccessories,
  services:       stihlServices,
};

// ─── EGO ─────────────────────────────────────────────────────────
// PathIQ AI-vision (virtuele grens + objectdetectie), alle modellen draadloos

const egoServices = [...installationOnlyServices, ...husqvarnaExclusiveLocked];

export const egoBrand: BrandDef = {
  id:   'ego',
  name: 'EGO',
  colors: {
    accent:         '#3D8C00',
    accentLight:    '#6DB800',
    accentHover:    '#2E6B00',
    accentGlow:     'rgba(61, 140, 0, 0.2)',
    cardHover:      '#F0F8E8',
    cardSelected:   '#E2F2D0',
    borderSelected: '#3D8C00',
  },
  logoUrl:        'https://egopowerplus.nl/wp-content/uploads/2023/01/EGO-logo.svg',
  modelSpecs:     EGO_MODEL_SPECS,
  catalog:        egoCatalog,
  getAccessories: () => egoAccessories,
  services:       egoServices,
};

// ─── Kress ───────────────────────────────────────────────────────
// EyePilot = AI-cameranavigate, Mission RTKn = RTK-GPS, alle modellen draadloos

const kressServices = [...installationOnlyServices, ...husqvarnaExclusiveLocked];

export const kressBrand: BrandDef = {
  id:   'kress',
  name: 'Kress',
  colors: {
    accent:         '#A0251A',
    accentLight:    '#C94B3A',
    accentHover:    '#7D1A11',
    accentGlow:     'rgba(160, 37, 26, 0.2)',
    cardHover:      '#FDF0EE',
    cardSelected:   '#FAE0DC',
    borderSelected: '#A0251A',
  },
  modelSpecs:     KRESS_MODEL_SPECS,
  catalog:        kressCatalog,
  getAccessories: () => kressAccessories,
  services:       kressServices,
};

// ─── All active brands ────────────────────────────────────────────
// Add new brands here — they automatically appear in the advisor result

export const BRANDS: BrandDef[] = [husqvarnaBrand, stihlBrand, egoBrand, kressBrand];
