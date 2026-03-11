import type { MachineOption, AccessoryOption, ServiceOption } from '../configurator/types/configurator';
import type { ModelSpec } from '../configurator/data/husqvarna-catalog';
import { husqvarnaCatalog, MODEL_SPECS as HUSQVARNA_SPECS } from '../configurator/data/husqvarna-catalog';
import { getAccessoriesForModel } from '../configurator/data/shared-accessories';
import { sharedServices } from '../configurator/data/shared-services';

// Installation-only services for brands without warranty/service/lease contracts
const installationOnlyServices = sharedServices.filter(s => s.category === 'installation');
import { stihlCatalog, STIHL_MODEL_SPECS, stihlAccessories } from '../configurator/data/stihl-catalog';

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
  services:       installationOnlyServices,
};

// ─── All active brands ────────────────────────────────────────────
// Add new brands here — they automatically appear in the advisor result

export const BRANDS: BrandDef[] = [husqvarnaBrand, stihlBrand];
