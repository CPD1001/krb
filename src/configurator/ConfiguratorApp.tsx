import React, { useState } from 'react';
import { ConfiguratorProvider } from './ConfiguratorProvider';
import { ConfiguratorShell }    from './ConfiguratorShell';
import { AdvisorWizard }        from '../advisor/AdvisorWizard';
import { husqvarnaBrand }       from '../advisor/brands';
import { husqvarnaCatalog }     from './data/husqvarna-catalog';
import { sharedAccessories }    from './data/shared-accessories';
import { sharedServices }       from './data/shared-services';
import type { ProductConfigData } from './types/configurator';
import type { BrandDef } from '../advisor/brands';

/** Full Husqvarna catalog used when the advisor is skipped */
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
  | { phase: 'configurator'; productData: ProductConfigData; brand: BrandDef };

export function ConfiguratorApp() {
  const [app, setApp] = useState<AppPhase>({ phase: 'advisor' });

  if (app.phase === 'advisor') {
    return (
      <AdvisorWizard
        onComplete={(productData, brand) => setApp({ phase: 'configurator', productData, brand })}
        onSkip={() => setApp({ phase: 'configurator', productData: fullCatalogData, brand: husqvarnaBrand })}
      />
    );
  }

  return (
    <ConfiguratorProvider productData={app.productData}>
      <ConfiguratorShell
        onRestart={() => setApp({ phase: 'advisor' })}
        brandColors={app.brand.colors}
      />
    </ConfiguratorProvider>
  );
}
