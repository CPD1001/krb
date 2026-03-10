import { STEP_ORDER, type ConfigStep, type ProductConfigData } from '../types/configurator';

export function getActiveSteps(productData: ProductConfigData | null): ConfigStep[] {
  if (!productData) return STEP_ORDER;
  return STEP_ORDER.filter((step): step is ConfigStep => {
    switch (step) {
      case 'machine':     return productData.machines.length > 0;
      case 'power':       return productData.powerSystems.length > 0;
      case 'core':        return productData.deckOptions.length > 0;
      case 'accessories': return productData.accessories.length > 0;
      case 'upgrades':    return productData.proUpgrades.length > 0;
      case 'service':     return productData.services.length > 0;
      case 'summary':     return true;
    }
  });
}
