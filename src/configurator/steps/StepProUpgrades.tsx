import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { OptionGroup } from '../components/OptionGroup';
import { BundleCard } from '../components/BundleCard';
import type { UpgradeOption } from '../types/configurator';

export function StepProUpgrades() {
  const { state, toggleUpgrade } = useConfigurator();
  const upgrades = state.productData?.proUpgrades ?? [];
  const bundleRules = state.productData?.bundleRules ?? [];
  const selectedIds = state.config.proUpgrades.map(u => u.id);

  // Find "Pro Tech Bundle"
  const techBundles = bundleRules.filter(rule =>
    rule.optionIds.some(id => upgrades.some(u => u.id === id))
  );

  const activateBundle = (bundleRule: typeof bundleRules[0]) => {
    const missingIds = bundleRule.optionIds.filter(id => !selectedIds.includes(id));
    for (const id of missingIds) {
      const upg = upgrades.find(u => u.id === id);
      if (upg) toggleUpgrade(upg);
    }
  };

  return (
    <div className="cfg-step cfg-step--upgrades">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Professionele Upgrades</h2>
        <p className="cfg-step__subtitle">
          Haal het maximale uit uw machine met geavanceerde technologie voor professionals.
        </p>
      </div>

      <div className="cfg-step__content">
        {techBundles.length > 0 && (
          <div className="cfg-step__bundles">
            {techBundles.map(bundle => (
              <BundleCard
                key={bundle.id}
                bundle={bundle}
                allOptions={upgrades}
                onActivate={() => activateBundle(bundle)}
              />
            ))}
          </div>
        )}

        <OptionGroup
          title="Technologie & Besturing"
          subtitle="GPS, fleet management en remote control"
          options={upgrades}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => toggleUpgrade(opt as UpgradeOption)}
        />

        {/* Loss aversion prompt */}
        {!selectedIds.includes('gps-module') && (
          <div className="cfg-step__tip cfg-step__tip--warning">
            <div className="cfg-tip cfg-tip--warning">
              <div className="cfg-tip__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L18 17H2L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M10 8V11M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="cfg-tip__text">
                <strong>Zonder GPS-module</strong> moet u handmatig een begrenzingsdraad installeren.
                Met GPS bespaart u gemiddeld 8 uur installatietijd per terrein.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
