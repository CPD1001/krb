import type { ProductConfigData, AccessoryOption, ServiceOption, MachineOption } from '../configurator/types/configurator';
import type { ModelSpec } from '../configurator/data/husqvarna-catalog';
import { suggestInstallationLevel } from '../configurator/data/shared-services';
import type { BrandDef } from './brands';

// ─── Advisor answer types ─────────────────────────────────────────

export type AreaBucket = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'pro' | 'mega';
export type SlopeBucket = 'flat' | 'mild' | 'moderate' | 'steep';

export interface AdvisorAnswers {
  area:     AreaBucket  | null;
  slope:    SlopeBucket | null;
  wantsSmart:    boolean | null;   // true = wants 4G/5G, false = WiFi is fine
  wantsWildlife: boolean | null;   // AI wildlife detection
  wantsWireless: boolean | null;   // wire-free (true) vs boundary wire ok (false/null)
}

// Representative m² used for model filtering (upper end of range for safety)
const AREA_M2: Record<AreaBucket, number> = {
  xs:   500,   // ≤ 500 m²
  sm:   800,   // 500 – 1.000 m²
  md:  1500,   // 1.000 – 2.000 m²
  lg:  3000,   // 2.000 – 5.000 m²
  xl:  5000,   // 5.000 – 7.500 m²
  xxl: 10000,  // 7.500 – 15.000 m² — upper-mid ensures kr233e (12k) over kr230e (8k)
  pro: 20000,  // 15.000 – 25.000 m² — ensures kr236e (24k) over kr234e (16k)
  mega: 26000, // > 25.000 m² — ensures kr235e/kr237e (28k)
};

// Maximum model capacity per garden size — prevents oversized models for small gardens
const MAX_AREA_M2: Record<AreaBucket, number> = {
  xs:   1500,   // aspire, 305v, 312v, 305e, 310e, 405ve, 410ve
  sm:   1500,   // idem
  md:   3500,   // adds 320-nera (3.300 m²), kress KR273E/KR283E (3.000 m²)
  lg:   6000,   // adds 430v-nera (4.800 m²), 435x (5.000 m²), KR274E/KR285E (5.000 m²)
  xl:   9000,   // adds KR230E (8.000 m²)
  xxl:  14000,  // kr230e (8k) + kr233e (12k); caps out kr234e (16k)+
  pro:  25000,  // kr234e (16k) + kr236e (24k); caps out 28k mega models
  mega: Infinity,
};

const SLOPE_PCT: Record<SlopeBucket, number> = {
  flat:     20,  // < 30%
  mild:     30,  // 30–40% — ondergrens zodat 30%-modellen kwalificeren
  moderate: 40,  // 40–50% — ondergrens
  steep:    50,  // > 50%  — ondergrens
};

// ─── Recommendation result ────────────────────────────────────────

export interface Recommendation {
  brand:                BrandDef;
  modelId:              string;
  productData:          ProductConfigData;
  rationale:            string;
  highlights:           string[];
  tradeoffs:            string[];
  suggestedAccessories: string[];
  suggestedInstallId:   string;
}

// ─── Per-brand recommendation ─────────────────────────────────────

export function getRecommendationForBrand(
  answers: AdvisorAnswers,
  brand: BrandDef,
): Recommendation | null {
  if (!answers.area || !answers.slope) return null;

  const requiredAreaM2   = AREA_M2[answers.area];
  const requiredSlopePct = SLOPE_PCT[answers.slope];

  // Step 1: Hard filter — area + slope
  let candidates = brand.modelSpecs.filter(
    m => m.areaSysM2 >= requiredAreaM2 && m.slopeMax >= requiredSlopePct
  );

  if (candidates.length === 0) {
    // Brand has no model that meets area + slope — don't recommend this brand
    return null;
  }

  // Step 1b: Cap model capacity — exclude models too large for this size range
  const maxCapacity = MAX_AREA_M2[answers.area];
  const withinCap = candidates.filter(m => m.areaSysM2 <= maxCapacity);

  if (withinCap.length > 0) {
    // Normal path: qualifying models that fit within the size range
    candidates = withinCap;
  } else {
    // All qualifying models exceed the cap (e.g. only CEORA for 'pro' range).
    // Show the largest model within the cap that meets slope — soft filters are skipped
    // because the brand's range tops out below what was asked anyway.
    const bestWithinCap = brand.modelSpecs
      .filter(m => m.slopeMax >= requiredSlopePct && m.areaSysM2 <= maxCapacity)
      .sort((a, b) => b.areaSysM2 - a.areaSysM2);
    if (bestWithinCap.length === 0) return null;
    const chosen = bestWithinCap[0];
    return buildRecommendation(chosen, answers, requiredSlopePct, [], brand);
  }

  const tradeoffs: string[] = [];

  // Step 2: Wireless preference (soft) — tweede prioriteit na oppervlakte
  if (answers.wantsWireless) {
    const filtered = candidates.filter(m => m.wireless);
    if (filtered.length > 0) {
      candidates = filtered;
    } else {
      tradeoffs.push(
        'Er zijn geen draadloze modellen die passen bij uw wensen. Dit model werkt met begrenzingsdraad.'
      );
    }
  }

  // Step 3: Connectivity preference (soft) — only filter when user explicitly wants 4G/5G
  if (answers.wantsSmart === true) {
    const filtered = candidates.filter(m => m.connectivity === 'cellular');
    if (filtered.length > 0) {
      candidates = filtered;
    } else {
      tradeoffs.push(
        'Er zijn geen modellen met 4G/5G-connectiviteit die passen bij uw terrein- en oppervlaktewensen. De aanbevolen modellen beschikken over WiFi + Bluetooth app-bediening.'
      );
    }
  }

  // Step 4: Wildlife detection preference (soft)
  if (answers.wantsWildlife === true) {
    const filtered = candidates.filter(m => m.wildlife);
    if (filtered.length > 0) {
      candidates = filtered;
    } else {
      tradeoffs.push(
        'Wildlife-detectie is niet beschikbaar voor modellen die passen bij uw hellingsvereisten. Neem contact op voor persoonlijk advies.'
      );
    }
  } else if (answers.wantsWildlife === false) {
    // Prefer models without wildlife detection (no unnecessary cost)
    const filtered = candidates.filter(m => !m.wildlife);
    if (filtered.length > 0) {
      candidates = filtered;
    }
    // If all remaining models have wildlife, keep them (it's a bonus, not a problem)
  }

  // Step 5: Pick cheapest model that satisfies all constraints
  const sorted = [...candidates].sort((a, b) => a.price - b.price);
  const chosen: ModelSpec = sorted[0];

  return buildRecommendation(chosen, answers, requiredSlopePct, tradeoffs, brand);
}

// ─── Build full ProductConfigData for chosen model ────────────────

function buildRecommendation(
  spec: ModelSpec,
  answers: AdvisorAnswers,
  slopePct: number,
  tradeoffs: string[],
  brand: BrandDef,
): Recommendation {
  const machine = brand.catalog.find(m => m.id === spec.id)!;
  const accessories = brand.getAccessories(spec.id);

  // Pre-select accessories (brand-specific defaults)
  const garageId = brand.id === 'stihl' ? 'stihl-garage'
                 : brand.id === 'ego'   ? 'ego-garage'
                 : 'automower-house';
  const suggestedAccessories: string[] = [garageId];
  if (slopePct >= 30 && spec.id !== '435x-awd-nera' && brand.id === 'husqvarna') {
    suggestedAccessories.push('rough-terrain-kit');
  }

  // Pre-select installation level
  const suggestedInstallId = suggestInstallationLevel(slopePct);

  // Only expose the suggested installation level + zelf-installeren
  const installationIds = ['installatie-level-1', 'installatie-level-2', 'installatie-level-3'];
  const services = brand.services.filter(
    s => !installationIds.includes(s.id) || s.id === suggestedInstallId
  );

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
    brand,
    modelId: spec.id,
    productData,
    rationale:  buildRationale(spec, answers, brand.catalog),
    highlights: buildHighlights(spec, answers, brand.catalog, brand.id),
    tradeoffs,
    suggestedAccessories,
    suggestedInstallId,
  };
}

// ─── Copy helpers ─────────────────────────────────────────────────

function buildRationale(spec: ModelSpec, answers: AdvisorAnswers, catalog: MachineOption[]): string {
  const areaLabels: Record<AreaBucket, string> = {
    xs:   'een gazon tot 500 m²',
    sm:   'een gazon van 500 tot 1.000 m²',
    md:   'een gazon van 1.000 tot 2.000 m²',
    lg:   'een gazon van 2.000 tot 5.000 m²',
    xl:   'een gazon van 5.000 tot 7.500 m²',
    xxl:  'een terrein van 7.500 tot 15.000 m²',
    pro:  'een professioneel terrein van 15.000 tot 25.000 m²',
    mega: 'een grootschalig terrein of sportveld van meer dan 25.000 m²',
  };
  const slopeLabels: Record<SlopeBucket, string> = {
    flat:     'een vlak terrein',
    mild:     'een licht hellend terrein (30–40%)',
    moderate: 'een matig hellend terrein (40–50%)',
    steep:    'een sterk hellend terrein (> 50%)',
  };

  const area  = answers.area  ? areaLabels[answers.area]   : 'uw gazon';
  const slope = answers.slope ? slopeLabels[answers.slope] : '';
  const machine = catalog.find(m => m.id === spec.id);

  return `Op basis van ${area}${slope ? ` op ${slope}` : ''} is de ${machine?.title ?? spec.id} de ideale keuze.`;
}

function buildHighlights(spec: ModelSpec, answers: AdvisorAnswers, catalog: MachineOption[], brandId: string): string[] {
  const machine = catalog.find(m => m.id === spec.id)!;
  const list: string[] = [];

  const areaSpec = machine.keySpecs.find(s => s.label === 'Maaioppervlak');
  if (areaSpec) list.push(`Maaioppervlak: ${areaSpec.value}`);

  const slopeSpec = machine.keySpecs.find(s => s.label === 'Max. helling');
  if (slopeSpec) list.push(`Hellingcapaciteit: ${slopeSpec.value}`);

  if (spec.edgeCut)  list.push('EdgeCut — maait tot aan de rand, nauwelijks trimmen nodig');
  if (spec.wildlife) list.push('AI wildlife-detectie — stopt automatisch voor dieren');
  if (brandId === 'ego'   && spec.objectDetection) list.push('PathIQ AI-vision — virtuele grens & objectdetectie via stereocamera');
  else if (brandId === 'kress' && spec.objectDetection) list.push('EyePilot AI-vision — virtuele grens & objectdetectie via camera');
  else if (spec.objectDetection && !spec.wildlife) list.push('Objectdetectie & ontwijking — stopt automatisch voor obstakels');
  if (spec.connectivity === 'cellular') list.push('4G/5G + WiFi + Bluetooth app-bediening — altijd bereikbaar');
  else list.push('WiFi + Bluetooth app-bediening');
  if (spec.id === '435x-awd-nera') list.push('Vierwielaandrijving (AWD) voor maximale tractie');

  const noiseSpec = machine.keySpecs.find(s => s.label === 'Geluidsniveau');
  if (noiseSpec) list.push(`Fluisterstil — ${noiseSpec.value}`);

  return list;
}
