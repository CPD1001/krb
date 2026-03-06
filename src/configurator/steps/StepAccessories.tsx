import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { OptionGroup } from '../components/OptionGroup';
import { BundleCard } from '../components/BundleCard';
import type { AccessoryOption } from '../types/configurator';

export function StepAccessories() {
  const { state, toggleAccessory } = useConfigurator();
  const accessories = state.productData?.accessories ?? [];
  const bundleRules = state.productData?.bundleRules ?? [];
  const selectedIds = state.config.accessories.map(a => a.id);

  // Find bundle rules relevant to accessories
  const accessoryBundles = bundleRules.filter(rule =>
    rule.optionIds.some(id => accessories.some(a => a.id === id))
  );

  const handleToggle = (opt: AccessoryOption) => {
    toggleAccessory(opt);
  };

  // Activate bundle: add all missing items
  const activateBundle = (bundleRule: typeof bundleRules[0]) => {
    const missingIds = bundleRule.optionIds.filter(id => !selectedIds.includes(id));
    for (const id of missingIds) {
      const acc = accessories.find(a => a.id === id);
      if (acc) toggleAccessory(acc);
    }
  };

  return (
    <div className="cfg-step cfg-step--accessories">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Accessoires</h2>
        <p className="cfg-step__subtitle">
          Breid uw machine uit met professionele accessoires. Combineer en bespaar met onze bundels.
        </p>
      </div>

      <div className="cfg-step__content">
        {/* Bundle cards */}
        {accessoryBundles.length > 0 && (
          <div className="cfg-step__bundles">
            {accessoryBundles.map(bundle => (
              <BundleCard
                key={bundle.id}
                bundle={bundle}
                allOptions={[...accessories, ...(state.productData?.proUpgrades ?? [])]}
                onActivate={() => activateBundle(bundle)}
              />
            ))}
          </div>
        )}

        <OptionGroup
          title="Beschikbare accessoires"
          subtitle="Selecteer de accessoires die u nodig heeft"
          options={accessories}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => handleToggle(opt as AccessoryOption)}
        />
      </div>
    </div>
  );
}
