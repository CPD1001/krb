import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { formatPrice } from '../engine/pricing';
import type { MachineOption } from '../types/configurator';

export function StepMachine() {
  const { state, selectMachine, goNext } = useConfigurator();
  const machines = state.productData?.machines ?? [];
  const selectedId = state.config.machine?.id;

  const handleSelect = (machine: MachineOption) => {
    selectMachine(machine);
  };

  return (
    <div className="cfg-step cfg-step--machine">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Kies uw machine</h2>
        <p className="cfg-step__subtitle">
          Selecteer de machine die het beste past bij uw professionele behoeften.
        </p>
      </div>

      <div className="cfg-step__content">
        <div className="cfg-machine-grid">
          {machines.map(machine => (
            <button
              key={machine.id}
              className={[
                'cfg-machine-card',
                selectedId === machine.id && 'cfg-machine-card--selected',
              ].filter(Boolean).join(' ')}
              onClick={() => handleSelect(machine)}
            >
              {machine.badge && (
                <span className={`cfg-machine-card__badge cfg-machine-card__badge--${machine.badge}`}>
                  {machine.badge === 'popular' ? 'Meest gekozen' :
                   machine.badge === 'new' ? 'Nieuw' :
                   machine.badge === 'pro' ? 'Professioneel' : machine.badge}
                </span>
              )}

              <div className="cfg-machine-card__image">
                <img
                  src={machine.heroImage}
                  alt={machine.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Fallback visual */}
                <div className="cfg-machine-card__image-fallback">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" opacity="0.2">
                    <rect x="8" y="20" width="48" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="20" cy="48" r="6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="44" cy="48" r="6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>

              <div className="cfg-machine-card__info">
                <span className="cfg-machine-card__category">{machine.category}</span>
                <h3 className="cfg-machine-card__title">{machine.title}</h3>
                <div className="cfg-machine-card__specs">
                  {machine.keySpecs.slice(0, 3).map(spec => (
                    <div key={spec.label} className="cfg-machine-card__spec">
                      <span className="cfg-machine-card__spec-value">{spec.value}</span>
                      <span className="cfg-machine-card__spec-label">{spec.label}</span>
                    </div>
                  ))}
                </div>

                <div className="cfg-machine-card__price">
                  {machine.rrp && (
                    <span className="cfg-machine-card__price-rrp">Adviesprijs {formatPrice(machine.rrp)}</span>
                  )}
                  <span className="cfg-machine-card__price-value">{formatPrice(machine.price)}</span>
                </div>
              </div>

              {selectedId === machine.id && (
                <div className="cfg-machine-card__check">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="var(--cfg-color-accent)"/>
                    <path d="M7 12L10.5 15.5L17 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
