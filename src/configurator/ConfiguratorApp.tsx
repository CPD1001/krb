import React, { useState } from 'react';
import { ConfiguratorProvider } from './ConfiguratorProvider';
import { ConfiguratorShell }    from './ConfiguratorShell';
import { AdvisorWizard }        from '../advisor/AdvisorWizard';
import { husqvarnaCatalog }     from './data/husqvarna-catalog';
import { sharedAccessories }    from './data/shared-accessories';
import { sharedServices }       from './data/shared-services';
import type { ProductConfigData } from './types/configurator';

/** Full catalog ProductConfigData used when the advisor is skipped */
const fullCatalogData: ProductConfigData = {
  productId: 'husqvarna-catalog',
  handle:    'husqvarna-catalog',
  machines:       husqvarnaCatalog,
  powerSystems:   [],
  deckOptions:    [],
  accessories:    sharedAccessories,
  proUpgrades:    [],
  services:       sharedServices,
  compatibilityRules: [],
  bundleRules:        [],
};

type AppPhase =
  | { phase: 'advisor' }
  | { phase: 'configurator'; productData: ProductConfigData };

export function ConfiguratorApp() {
  const [app, setApp] = useState<AppPhase>({ phase: 'advisor' });

  if (app.phase === 'advisor') {
    return (
      <AdvisorWizard
        onComplete={productData => setApp({ phase: 'configurator', productData })}
        onSkip={() => setApp({ phase: 'configurator', productData: fullCatalogData })}
      />
    );
  }

  return (
    <ConfiguratorProvider productData={app.productData}>
      <ConfiguratorShell />
    </ConfiguratorProvider>
  );
}
