import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { OptionGroup } from '../components/OptionGroup';
import type { DeckOption } from '../types/configurator';

export function StepCoreConfig() {
  const { state, selectDeck } = useConfigurator();
  const deckOptions = state.productData?.deckOptions ?? [];
  const selectedId = state.config.deckSize?.id;

  return (
    <div className="cfg-step cfg-step--core">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Configureer uw machine</h2>
        <p className="cfg-step__subtitle">
          Kies het maaibord dat past bij uw terrein. Groter maaibord = sneller klaar.
        </p>
      </div>

      <div className="cfg-step__content">
        <OptionGroup
          title="Maaibord"
          subtitle="De maaibreedte bepaalt de efficiëntie op het terrein"
          options={deckOptions}
          selectedId={selectedId}
          mode="radio"
          onSelect={(opt) => selectDeck(opt as DeckOption)}
        />

        {/* Tip callout */}
        <div className="cfg-step__tip">
          <div className="cfg-tip">
            <div className="cfg-tip__icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="cfg-tip__text">
              <strong>Tip:</strong> Voor terreinen met veel obstakels (bomen, perken) raden wij het 108 cm maaibord aan.
              Voor open grasvelden is het 137 cm maaibord het meest efficiënt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
