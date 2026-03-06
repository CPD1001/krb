import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { OptionGroup } from '../components/OptionGroup';
import { BundleCard } from '../components/BundleCard';
import type { ServiceOption } from '../types/configurator';

export function StepService() {
  const { state, toggleService } = useConfigurator();
  const services = state.productData?.services ?? [];
  const bundleRules = state.productData?.bundleRules ?? [];
  const selectedIds = state.config.services.map(s => s.id);

  const serviceBundles = bundleRules.filter(rule =>
    rule.optionIds.some(id => services.some(s => s.id === id))
  );

  const activateBundle = (bundleRule: typeof bundleRules[0]) => {
    const missingIds = bundleRule.optionIds.filter(id => !selectedIds.includes(id));
    for (const id of missingIds) {
      const svc = services.find(s => s.id === id);
      if (svc) toggleService(svc);
    }
  };

  return (
    <div className="cfg-step cfg-step--service">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Service & Installatie</h2>
        <p className="cfg-step__subtitle">
          Professionele service voor een zorgeloos resultaat. Onze specialisten verzorgen alles.
        </p>
      </div>

      <div className="cfg-step__content">
        {serviceBundles.length > 0 && (
          <div className="cfg-step__bundles">
            {serviceBundles.map(bundle => (
              <BundleCard
                key={bundle.id}
                bundle={bundle}
                allOptions={services}
                onActivate={() => activateBundle(bundle)}
              />
            ))}
          </div>
        )}

        <OptionGroup
          title="Garantie"
          subtitle="Bescherm uw investering"
          options={services.filter(s => s.category === 'warranty')}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => toggleService(opt as ServiceOption)}
        />

        <OptionGroup
          title="Bezorging & Installatie"
          subtitle="Laat het aan onze specialisten over"
          options={services.filter(s => ['delivery', 'installation', 'training'].includes(s.category))}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => toggleService(opt as ServiceOption)}
        />

        {/* Social proof for services */}
        <div className="cfg-step__social-proof">
          <div className="cfg-social-proof">
            <div className="cfg-social-proof__bar">
              <div className="cfg-social-proof__fill" style={{ width: '92%' }} />
            </div>
            <p className="cfg-social-proof__text">
              <strong>92%</strong> van de professionals kiest voor professionele installatie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
