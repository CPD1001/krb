import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { OptionGroup } from '../components/OptionGroup';
import type { PowerSystemOption } from '../types/configurator';

export function StepPowerSystem() {
  const { state, selectPowerSystem } = useConfigurator();
  const powerSystems = state.productData?.powerSystems ?? [];
  const selectedId = state.config.powerSystem?.id;

  return (
    <div className="cfg-step cfg-step--power">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Kies uw aandrijfsysteem</h2>
        <p className="cfg-step__subtitle">
          Het juiste accupakket bepaalt uw werkduur en bereik. 87% van de professionals kiest het 4x systeem.
        </p>
      </div>

      <div className="cfg-step__content">
        <OptionGroup
          title="Accupakket"
          subtitle="Meer accu's = langere werktijd zonder onderbreking"
          options={powerSystems}
          selectedId={selectedId}
          mode="radio"
          onSelect={(opt) => selectPowerSystem(opt as PowerSystemOption)}
        />

        {/* Social proof */}
        <div className="cfg-step__social-proof">
          <div className="cfg-social-proof">
            <div className="cfg-social-proof__bar">
              <div className="cfg-social-proof__fill" style={{ width: '87%' }} />
            </div>
            <p className="cfg-social-proof__text">
              <strong>87%</strong> van de professionals kiest het 4x Accu Systeem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
