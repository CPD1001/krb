import type { ProductConfigData, AccessoryOption, ServiceOption } from '../configurator/types/configurator';
import { husqvarnaCatalog, MODEL_SPECS, type ModelSpec } from '../configurator/data/husqvarna-catalog';
import { getAccessoriesForModel } from '../configurator/data/shared-accessories';
import { sharedServices, suggestInstallationLevel } from '../configurator/data/shared-services';

// ─── Advisor answer types ─────────────────────────────────────────

export type AreaBucket = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type SlopeBucket = 'flat' | 'mild' | 'moderate' | 'steep';

export interface AdvisorAnswers {
  area:     AreaBucket  | null;
  slope:    SlopeBucket | null;
  wantsSmart:    boolean | null;   // WiFi/4G app
  wantsWildlife: boolean | null;   // AI wildlife detection
}

// Representative m² used for model filtering (upper end of range for safety)
const AREA_M2: Record<AreaBucket, number> = {
  xs:  500,   // ≤ 500 m²
  sm:  800,   // 500 – 1.000 m²
  md: 1500,   // 1.000 – 2.000 m²
  lg: 3000,   // 2.000 – 5.000 m²
  xl: 5000,   // 5.000 – 7.500 m²
  xxl: 7500,  // > 7.500 m²
};

const SLOPE_PCT: Record<SlopeBucket, number> = {
  flat:     20,  // < 30%
  mild:     35,  // 30–40%
  moderate: 45,  // 40–50%
  steep:    65,  // > 50%
};

// ─── Recommendation result ────────────────────────────────────────

export interface Recommendation {
  modelId:              string;
  productData:          ProductConfigData;
  rationale:            string;
  highlights:           string[];
  tradeoffs:            string[];   // noted if a preference couldn't be met
  suggestedAccessories: string[];   // IDs
  suggestedInstallId:   string;     // service option ID
}

// ─── Core algorithm ───────────────────────────────────────────────

export function getRecommendation(answers: AdvisorAnswers): Recommendation | null {
  if (!answers.area || !answers.slope) return null;

  const requiredAreaM2  = AREA_M2[answers.area];
  const requiredSlopePct = SLOPE_PCT[answers.slope];

  // Step 1: Hard filter — area + slope (non-negotiable)
  let candidates = MODEL_SPECS.filter(
    m => m.areaSysM2 >= requiredAreaM2 && m.slopeMax >= requiredSlopePct
  );

  if (candidates.length === 0) {
    // Fallback: relax area, keep slope (edge case for very large steep gardens)
    candidates = MODEL_SPECS.filter(m => m.slopeMax >= requiredSlopePct);
    if (candidates.length === 0) return null;
  }

  const tradeoffs: string[] = [];

  // Step 2: Connectivity preference (soft)
  if (answers.wantsSmart !== null) {
    const filtered = answers.wantsSmart
      ? candidates.filter(m => m.smart)
      : candidates.filter(m => !m.smart);

    if (filtered.length > 0) {
      candidates = filtered;
    } else if (answers.wantsSmart === false) {
      // No basic-BT models that fit constraints → escalate to smart
      tradeoffs.push(
        'Er zijn geen eenvoudige modellen die aan uw terrein- en oppervlaktewensen voldoen. Wij adviseren een NERA-model met app-bediening.'
      );
    }
  }

  // Step 3: Wildlife detection preference (soft)
  if (answers.wantsWildlife) {
    const filtered = candidates.filter(m => m.wildlife);
    if (filtered.length > 0) {
      candidates = filtered;
    } else {
      tradeoffs.push(
        'Wildlife-detectie is niet beschikbaar voor modellen die passen bij uw hellingsvereisten. Overweeg de 435X AWD NERA of neem contact op voor advies.'
      );
    }
  }

  // Step 4: Pick cheapest model that satisfies all hard + soft constraints
  const sorted = [...candidates].sort((a, b) => a.price - b.price);
  const chosen: ModelSpec = sorted[0];

  return buildRecommendation(chosen, answers, requiredSlopePct, tradeoffs);
}

// ─── Build full ProductConfigData for chosen model ────────────────

function buildRecommendation(
  spec: ModelSpec,
  answers: AdvisorAnswers,
  slopePct: number,
  tradeoffs: string[]
): Recommendation {
  const machine = husqvarnaCatalog.find(m => m.id === spec.id)!;
  const accessories = getAccessoriesForModel(spec.id);

  // Only expose the suggested installation level + zelf-installeren
  const installationIds = ['installatie-level-1', 'installatie-level-2', 'installatie-level-3'];
  const services = sharedServices.filter(
    s => !installationIds.includes(s.id) || s.id === suggestedInstallId
  );

  // Pre-select accessories
  const suggestedAccessories: string[] = ['automower-house'];
  if (slopePct >= 30 && spec.id !== '435x-awd-nera') {
    suggestedAccessories.push('rough-terrain-kit');
  }

  // Pre-select installation level
  const suggestedInstallId = suggestInstallationLevel(slopePct);

  // Build defaultConfig
  const defaultAccessories = suggestedAccessories
    .map(id => accessories.find(a => a.id === id))
    .filter(Boolean) as AccessoryOption[];

  const defaultInstall = services.find(s => s.id === suggestedInstallId);
  const defaultServices: ServiceOption[] = defaultInstall ? [defaultInstall] : [];

  const productData: ProductConfigData = {
    productId: spec.id,
    handle:    spec.id,
    machines:  [machine],
    powerSystems: [],
    deckOptions:  [],
    accessories,
    proUpgrades:  [],
    services,
    compatibilityRules: [],
    bundleRules:        [],
    defaultConfig: {
      machine:     machine,
      accessories: defaultAccessories,
      services:    defaultServices,
    },
  };

  return {
    modelId: spec.id,
    productData,
    rationale:  buildRationale(spec, answers),
    highlights: buildHighlights(spec, answers),
    tradeoffs,
    suggestedAccessories,
    suggestedInstallId,
  };
}

// ─── Copy helpers ─────────────────────────────────────────────────

function buildRationale(spec: ModelSpec, answers: AdvisorAnswers): string {
  const areaLabels: Record<AreaBucket, string> = {
    xs:  'een gazon tot 500 m²',
    sm:  'een gazon van 500 tot 1.000 m²',
    md:  'een gazon van 1.000 tot 2.000 m²',
    lg:  'een gazon van 2.000 tot 5.000 m²',
    xl:  'een gazon van 5.000 tot 7.500 m²',
    xxl: 'een gazon van meer dan 7.500 m²',
  };
  const slopeLabels: Record<SlopeBucket, string> = {
    flat:     'een vlak terrein',
    mild:     'een licht hellend terrein (30–40%)',
    moderate: 'een matig hellend terrein (40–50%)',
    steep:    'een sterk hellend terrein (> 50%)',
  };

  const area  = answers.area  ? areaLabels[answers.area]   : 'uw gazon';
  const slope = answers.slope ? slopeLabels[answers.slope] : '';

  return `Op basis van ${area}${slope ? ` op ${slope}` : ''} is de ${husqvarnaCatalog.find(m => m.id === spec.id)?.title} de ideale keuze.`;
}

function buildHighlights(spec: ModelSpec, answers: AdvisorAnswers): string[] {
  const machine = husqvarnaCatalog.find(m => m.id === spec.id)!;
  const list: string[] = [];

  const areaSpec = machine.keySpecs.find(s => s.label === 'Maaioppervlak');
  if (areaSpec) list.push(`Maaioppervlak: ${areaSpec.value}`);

  const slopeSpec = machine.keySpecs.find(s => s.label === 'Max. helling');
  if (slopeSpec) list.push(`Hellingcapaciteit: ${slopeSpec.value}`);

  if (spec.wildlife) list.push('AI wildlife-detectie — stopt automatisch voor dieren');
  if (spec.smart)    list.push('WiFi + 4G app-bediening via Automower Connect');
  if (spec.id === '435x-awd-nera') list.push('Vierwielaandrijving (AWD) voor maximale tractie');

  const noiseSpec = machine.keySpecs.find(s => s.label === 'Geluidsniveau');
  if (noiseSpec) list.push(`Fluisterstil — ${noiseSpec.value}`);

  return list;
}
