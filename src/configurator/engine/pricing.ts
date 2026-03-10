import type { MachineConfig, BundleRule, PriceBreakdown } from '../types/configurator';

/**
 * Pure pricing engine. No side effects.
 * Calculates total price, line items, and applicable bundle discounts.
 */
export function calculatePrice(
  config: MachineConfig,
  bundleRules: BundleRule[]
): PriceBreakdown {
  const lineItems: { label: string; price: number }[] = [];

  // Detect active lease service
  const leaseService = config.services.find(s => (s as any).category === 'lease');
  const isLease = !!leaseService;
  const monthlyPrice = leaseService?.price ?? 0;

  // Base machine price — €0 when lease is active (included in monthly)
  const basePrice = isLease ? 0 : (config.machine?.price ?? 0);
  if (config.machine) {
    lineItems.push({
      label: isLease
        ? `${config.machine.title} — inbegrepen in lease`
        : config.machine.title,
      price: basePrice,
    });
  }

  // Power system
  if (config.powerSystem && config.powerSystem.price > 0) {
    lineItems.push({ label: config.powerSystem.title, price: config.powerSystem.price });
  }

  // Deck option
  if (config.deckSize && config.deckSize.price > 0) {
    lineItems.push({ label: config.deckSize.title, price: config.deckSize.price });
  }

  // Accessories
  for (const acc of config.accessories) {
    lineItems.push({ label: acc.title, price: acc.price });
  }

  // Pro upgrades
  for (const upg of config.proUpgrades) {
    lineItems.push({ label: upg.title, price: upg.price });
  }

  // Services — skip the monthly lease itself from one-time lineItems
  for (const svc of config.services) {
    if ((svc as any).billing === 'monthly') continue;
    lineItems.push({ label: svc.title, price: svc.price });
  }

  const optionsTotal = lineItems.reduce((sum, item) => sum + item.price, 0) - basePrice;

  // Bundle discounts
  const selectedIds = getAllSelectedIds(config);
  const activeBundles = findActiveBundles(selectedIds, bundleRules);
  const bundleDiscount = activeBundles.reduce((sum, b) => sum + b.discount, 0);

  const totalPrice = basePrice + optionsTotal - bundleDiscount;

  return {
    basePrice,
    optionsTotal,
    bundleDiscount,
    activeBundles,
    totalPrice,
    lineItems,
    isLease,
    monthlyPrice,
  };
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

function findActiveBundles(
  selectedIds: Set<string>,
  bundleRules: BundleRule[]
): { label: string; discount: number }[] {
  return bundleRules
    .filter(rule => rule.optionIds.every(id => selectedIds.has(id)))
    .map(rule => ({ label: rule.label, discount: rule.discount }));
}

/**
 * Format price for display (European format)
 */
export function formatPrice(cents: number): string {
  const euros = cents / 100;
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(euros);
}

/**
 * Format price delta: "+€349" or "Inbegrepen"
 */
export function formatPriceDelta(cents: number): string {
  if (cents === 0) return 'Inbegrepen';
  const sign = cents > 0 ? '+' : '';
  return `${sign}${formatPrice(cents)}`;
}
