import type { MachineOption, AccessoryOption, ServiceOption } from '../configurator/types/configurator';
import type { ModelSpec } from '../configurator/data/husqvarna-catalog';
import { husqvarnaCatalog, MODEL_SPECS as HUSQVARNA_SPECS } from '../configurator/data/husqvarna-catalog';
import { getAccessoriesForModel } from '../configurator/data/shared-accessories';
import { sharedServices } from '../configurator/data/shared-services';

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

// ─── All active brands ────────────────────────────────────────────
// Add new brands here — they automatically appear in the advisor result

export const BRANDS: BrandDef[] = [husqvarnaBrand];
