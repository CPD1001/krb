import type { MachineConfig, PriceBreakdown } from '../types/configurator';

interface ShopifyLineItem {
  id: number;
  quantity: number;
  properties: Record<string, string>;
}

interface ShopifyCartPayload {
  items: ShopifyLineItem[];
}

/**
 * Converts a machine configuration into Shopify cart line items.
 * Each accessory/upgrade is added as a separate line item linked
 * by a shared configuration ID.
 */
export function buildCartPayload(
  config: MachineConfig,
  priceBreakdown: PriceBreakdown,
  variantMap: Record<string, number> // option ID → Shopify variant ID
): ShopifyCartPayload {
  const configId = `cfg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const items: ShopifyLineItem[] = [];

  // Base machine
  if (config.machine && variantMap[config.machine.id]) {
    items.push({
      id: variantMap[config.machine.id],
      quantity: 1,
      properties: {
        '_configuration_id': configId,
        '_configurator': 'true',
        '_power_system': config.powerSystem?.title ?? '',
        '_deck_size': config.deckSize?.title ?? '',
        '_accessories': config.accessories.map(a => a.title).join(', '),
        '_pro_upgrades': config.proUpgrades.map(u => u.title).join(', '),
        '_services': config.services.map(s => s.title).join(', '),
        ...(priceBreakdown.bundleDiscount > 0 && {
          '_bundle_discount': `-€${(priceBreakdown.bundleDiscount / 100).toFixed(0)}`,
          '_bundles': priceBreakdown.activeBundles.map(b => b.label).join(', '),
        }),
      },
    });
  }

  // Power system (if separate product)
  if (config.powerSystem && variantMap[config.powerSystem.id]) {
    items.push({
      id: variantMap[config.powerSystem.id],
      quantity: 1,
      properties: { '_config_ref': configId },
    });
  }

  // Deck (if separate product)
  if (config.deckSize && variantMap[config.deckSize.id]) {
    items.push({
      id: variantMap[config.deckSize.id],
      quantity: 1,
      properties: { '_config_ref': configId },
    });
  }

  // Accessories
  for (const acc of config.accessories) {
    if (variantMap[acc.id]) {
      items.push({
        id: variantMap[acc.id],
        quantity: 1,
        properties: { '_config_ref': configId },
      });
    }
  }

  // Pro upgrades
  for (const upg of config.proUpgrades) {
    if (variantMap[upg.id]) {
      items.push({
        id: variantMap[upg.id],
        quantity: 1,
        properties: { '_config_ref': configId },
      });
    }
  }

  // Services
  for (const svc of config.services) {
    if (variantMap[svc.id]) {
      items.push({
        id: variantMap[svc.id],
        quantity: 1,
        properties: { '_config_ref': configId },
      });
    }
  }

  return { items };
}

/**
 * Add configured machine to Shopify cart via AJAX API
 */
export async function addToShopifyCart(payload: ShopifyCartPayload): Promise<void> {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to add to cart: ${response.statusText}`);
  }
}

/**
 * Redirect to Shopify checkout
 */
export function goToCheckout(): void {
  window.location.href = '/checkout';
}
