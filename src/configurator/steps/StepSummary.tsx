import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { formatPrice } from '../engine/pricing';
import type { MachineConfig, PriceBreakdown } from '../types/configurator';

function buildOfferteMailto(config: MachineConfig, breakdown: PriceBreakdown): string {
  const lines: string[] = [];

  lines.push('Beste Keizers team,');
  lines.push('');
  lines.push('Via de online Automower configurator heb ik de volgende configuratie samengesteld. Ik ontvang graag een offerte hiervoor.');
  lines.push('');
  lines.push('════════════════════════════════');
  lines.push('CONFIGURATIE OVERZICHT');
  lines.push('════════════════════════════════');
  lines.push('');

  if (config.machine) {
    lines.push(`Machine:`);
    lines.push(`  ${config.machine.title}${breakdown.isLease ? ' (inbegrepen in lease)' : ` — ${formatPrice(config.machine.price)}`}`);
    lines.push('');
  }

  if (config.accessories.length > 0) {
    lines.push('Accessoires:');
    config.accessories.forEach(a => lines.push(`  ${a.title} — ${formatPrice(a.price)}`));
    lines.push('');
  }

  if (config.services.length > 0) {
    lines.push('Service & Installatie:');
    config.services.forEach(s => {
      const billing = (s as any).billing === 'monthly' ? '/maand' : '';
      lines.push(`  ${s.title} — ${formatPrice(s.price)}${billing}`);
    });
    lines.push('');
  }

  lines.push('════════════════════════════════');
  if (breakdown.isLease) {
    lines.push(`Maandelijks: ${formatPrice(breakdown.monthlyPrice)}/maand`);
    if (breakdown.totalPrice > 0) {
      lines.push(`Eenmalig:    ${formatPrice(breakdown.totalPrice)}`);
    }
  } else {
    lines.push(`Totaalbedrag: ${formatPrice(breakdown.totalPrice)}`);
    if (breakdown.bundleDiscount > 0) {
      lines.push(`Bundelkorting: -${formatPrice(breakdown.bundleDiscount)}`);
    }
  }
  lines.push('════════════════════════════════');
  lines.push('');
  lines.push('Met vriendelijke groet,');
  lines.push('');
  lines.push('[Uw naam]');
  lines.push('[Uw telefoonnummer]');

  const subject = encodeURIComponent(
    `Offerteaanvraag Automower${config.machine ? ` — ${config.machine.title}` : ''}`
  );
  const body = encodeURIComponent(lines.join('\n'));
  return `mailto:verkoop@keizers.nu?subject=${subject}&body=${body}`;
}

export function StepSummary() {
  const { state, priceBreakdown, goToStep } = useConfigurator();
  const offerteHref = buildOfferteMailto(state.config, priceBreakdown);
  const { config } = state;

  const sections = [
    {
      step: 'machine' as const,
      title: 'Machine',
      items: config.machine ? [{ label: config.machine.title, price: config.machine.price }] : [],
    },
    {
      step: 'power' as const,
      title: 'Aandrijving',
      items: config.powerSystem && config.powerSystem.price > 0
        ? [{ label: config.powerSystem.title, price: config.powerSystem.price }]
        : config.powerSystem
          ? [{ label: `${config.powerSystem.title} (inbegrepen)`, price: 0 }]
          : [],
    },
    {
      step: 'core' as const,
      title: 'Configuratie',
      items: config.deckSize && config.deckSize.price > 0
        ? [{ label: config.deckSize.title, price: config.deckSize.price }]
        : config.deckSize
          ? [{ label: `${config.deckSize.title} (inbegrepen)`, price: 0 }]
          : [],
    },
    {
      step: 'accessories' as const,
      title: 'Accessoires',
      items: config.accessories.map(a => ({ label: a.title, price: a.price })),
    },
    {
      step: 'upgrades' as const,
      title: 'Pro Upgrades',
      items: config.proUpgrades.map(u => ({ label: u.title, price: u.price })),
    },
    {
      step: 'service' as const,
      title: 'Service',
      items: config.services.map(s => ({ label: s.title, price: s.price })),
    },
  ];

  return (
    <div className="cfg-step cfg-step--summary">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Uw configuratie</h2>
        <p className="cfg-step__subtitle">
          Controleer uw configuratie en voeg toe aan uw offerte.
        </p>
      </div>

      <div className="cfg-step__content">
        <div className="cfg-summary">
          {sections.map(section => (
            <div key={section.step} className="cfg-summary__section">
              <div className="cfg-summary__section-header">
                <h3 className="cfg-summary__section-title">{section.title}</h3>
                <button
                  className="cfg-summary__edit-btn"
                  onClick={() => goToStep(section.step)}
                >
                  Wijzigen
                </button>
              </div>
              {section.items.length > 0 ? (
                <ul className="cfg-summary__items">
                  {section.items.map((item, i) => (
                    <li key={i} className="cfg-summary__item">
                      <span className="cfg-summary__item-label">{item.label}</span>
                      <span className="cfg-summary__item-price">
                        {item.price > 0 ? formatPrice(item.price) : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="cfg-summary__empty">Geen selectie</p>
              )}
            </div>
          ))}

          {/* Bundle discounts */}
          {priceBreakdown.activeBundles.length > 0 && (
            <div className="cfg-summary__section cfg-summary__section--discounts">
              <h3 className="cfg-summary__section-title">Bundelkortingen</h3>
              <ul className="cfg-summary__items">
                {priceBreakdown.activeBundles.map((bundle, i) => (
                  <li key={i} className="cfg-summary__item cfg-summary__item--discount">
                    <span className="cfg-summary__item-label">{bundle.label}</span>
                    <span className="cfg-summary__item-price cfg-summary__item-price--discount">
                      -{formatPrice(bundle.discount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Total */}
          <div className="cfg-summary__total">
            <div className="cfg-summary__total-row">
              <span className="cfg-summary__total-label">Totaal excl. BTW</span>
              <span className="cfg-summary__total-value">
                {formatPrice(priceBreakdown.totalPrice)}
              </span>
            </div>
            {priceBreakdown.bundleDiscount > 0 && (
              <div className="cfg-summary__total-savings">
                U bespaart {formatPrice(priceBreakdown.bundleDiscount)} met bundelkortingen
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="cfg-summary__actions">
            <button className="cfg-summary__cta cfg-summary__cta--primary">
              Toevoegen aan winkelwagen
            </button>
            <a
              href={offerteHref}
              className="cfg-summary__cta cfg-summary__cta--offerte"
            >
              Offerte aanvragen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
