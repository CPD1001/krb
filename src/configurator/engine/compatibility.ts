import type { CompatibilityRule, MachineConfig } from '../types/configurator';

export interface CompatibilityResult {
  disabledOptions: Set<string>;
  recommendedOptions: Set<string>;
  requiredOptions: Set<string>;
  hiddenOptions: Set<string>;
  autoAddOptions: string[];
}

/**
 * Resolves which options should be disabled, recommended, required, or hidden
 * based on current configuration state and compatibility rules.
 */
export function resolveCompatibility(
  config: MachineConfig,
  rules: CompatibilityRule[]
): CompatibilityResult {
  const disabled = new Set<string>();
  const recommended = new Set<string>();
  const required = new Set<string>();
  const hidden = new Set<string>();
  const autoAdd: string[] = [];

  const selectedIds = getAllSelectedIds(config);

  for (const rule of rules) {
    if (!selectedIds.has(rule.if.optionId)) continue;

    // This rule's condition is met
    if (rule.then.disable) {
      rule.then.disable.forEach(id => disabled.add(id));
    }
    if (rule.then.recommend) {
      rule.then.recommend.forEach(id => recommended.add(id));
    }
    if (rule.then.require) {
      rule.then.require.forEach(id => {
        required.add(id);
        // Auto-add required options if not already selected
        if (!selectedIds.has(id)) {
          autoAdd.push(id);
        }
      });
    }
    if (rule.then.hide) {
      rule.then.hide.forEach(id => hidden.add(id));
    }
    if (rule.then.show) {
      // Remove from hidden if another rule shows it
      rule.then.show.forEach(id => hidden.delete(id));
    }
  }

  // Check incompatibleWith on each selected option
  const allOptions = [
    config.machine,
    config.powerSystem,
    config.deckSize,
    ...config.accessories,
    ...config.proUpgrades,
    ...config.services,
  ].filter(Boolean);

  for (const option of allOptions) {
    if (option?.incompatibleWith) {
      option.incompatibleWith.forEach(id => disabled.add(id));
    }
  }

  return { disabledOptions: disabled, recommendedOptions: recommended, requiredOptions: required, hiddenOptions: hidden, autoAddOptions: autoAdd };
}

function getAllSelectedIds(config: MachineConfig): Set<string> {
  const ids = new Set<string>();
  if (config.machine) ids.add(config.machine.id);
  if (config.powerSystem) ids.add(config.powerSystem.id);
  if (config.deckSize) ids.add(config.deckSize.id);
  config.accessories.forEach(a => ids.add(a.id));
  config.proUpgrades.forEach(u => ids.add(u.id));
  config.services.forEach(s => ids.add(s.id));
  return ids;
}

/**
 * Check if an option is compatible with current configuration
 */
export function isOptionCompatible(
  optionId: string,
  config: MachineConfig,
  rules: CompatibilityRule[]
): { compatible: boolean; reason?: string } {
  const result = resolveCompatibility(config, rules);

  if (result.disabledOptions.has(optionId)) {
    return { compatible: false, reason: 'Niet compatibel met huidige configuratie' };
  }

  return { compatible: true };
}
