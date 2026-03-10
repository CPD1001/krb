import React, { useState } from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { formatPrice } from '../engine/pricing';

export function StickyPriceBar() {
  const { priceBreakdown, currentStepIndex, totalSteps, goNext, state, isConfirmed, confirmAanvraag } = useConfigurator();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const isSummary = state.currentStep === 'summary';

  return (
    <>
      {/* Price breakdown overlay */}
      {showBreakdown && (
        <div className="cfg-price-overlay" onClick={() => setShowBreakdown(false)}>
          <div className="cfg-price-overlay__panel" onClick={e => e.stopPropagation()}>
            <div className="cfg-price-overlay__header">
              <h3>Prijsoverzicht</h3>
              <button onClick={() => setShowBreakdown(false)} aria-label="Sluiten">&times;</button>
            </div>
            <div className="cfg-price-overlay__items">
              {priceBreakdown.isLease && (
                <div className="cfg-price-overlay__item cfg-price-overlay__item--monthly">
                  <span>Maandelijks (lease)</span>
                  <span>{formatPrice(priceBreakdown.monthlyPrice)}/mnd</span>
                </div>
              )}
              {priceBreakdown.lineItems.map((item, i) => (
                <div key={i} className="cfg-price-overlay__item">
                  <span>{item.label}</span>
                  <span>{item.price === 0 ? '—' : formatPrice(item.price)}</span>
                </div>
              ))}
              {priceBreakdown.activeBundles.map((bundle, i) => (
                <div key={`bundle-${i}`} className="cfg-price-overlay__item cfg-price-overlay__item--discount">
                  <span>{bundle.label}</span>
                  <span>-{formatPrice(bundle.discount)}</span>
                </div>
              ))}
            </div>
            <div className="cfg-price-overlay__total">
              {priceBreakdown.isLease ? (
                <>
                  <span>Eenmalig</span>
                  <span>{priceBreakdown.totalPrice > 0 ? formatPrice(priceBreakdown.totalPrice) : '—'}</span>
                </>
              ) : (
                <>
                  <span>Totaal</span>
                  <span>{formatPrice(priceBreakdown.totalPrice)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sticky bar */}
      <div className="cfg-sticky-bar">
        <div className="cfg-sticky-bar__left">
          <div className="cfg-sticky-bar__progress-label">
            Stap {currentStepIndex + 1} van {totalSteps}
          </div>
          <div className="cfg-sticky-bar__progress-track">
            <div
              className="cfg-sticky-bar__progress-fill"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="cfg-sticky-bar__center">
          <button className="cfg-sticky-bar__price-btn" onClick={() => setShowBreakdown(!showBreakdown)}>
            {priceBreakdown.isLease ? (
              <>
                <span className="cfg-sticky-bar__price-label">Maandelijks</span>
                <span className="cfg-sticky-bar__price-value">
                  {formatPrice(priceBreakdown.monthlyPrice)}
                  <span className="cfg-sticky-bar__price-period">/maand</span>
                </span>
                {priceBreakdown.totalPrice > 0 && (
                  <span className="cfg-sticky-bar__savings">
                    + {formatPrice(priceBreakdown.totalPrice)} eenmalig
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="cfg-sticky-bar__price-label">Totaal</span>
                <span className="cfg-sticky-bar__price-value">{formatPrice(priceBreakdown.totalPrice)}</span>
                {priceBreakdown.bundleDiscount > 0 && (
                  <span className="cfg-sticky-bar__savings">
                    -{formatPrice(priceBreakdown.bundleDiscount)} bespaard
                  </span>
                )}
              </>
            )}
          </button>
        </div>

        <div className="cfg-sticky-bar__right">
          {!isSummary ? (
            <button className="cfg-sticky-bar__cta" onClick={goNext}>
              Volgende stap
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          ) : isConfirmed ? (
            <button className="cfg-sticky-bar__cta cfg-sticky-bar__cta--primary" disabled style={{opacity:0.6,cursor:'default'}}>
              ✓ Aangevraagd
            </button>
          ) : (
            <button className="cfg-sticky-bar__cta cfg-sticky-bar__cta--primary" onClick={() => {
              const { config, productData } = state;
              // build mailto inline
              const lines = ['Beste Keizers team,', '', 'Via de online configurator heb ik de volgende configuratie samengesteld:', ''];
              if (config.machine) lines.push(`Machine: ${config.machine.title}`);
              if (config.accessories.length) { lines.push(''); lines.push('Accessoires:'); config.accessories.forEach(a => lines.push(`  ${a.title}`)); }
              if (config.services.length) { lines.push(''); lines.push('Service:'); config.services.forEach(s => lines.push(`  ${s.title}`)); }
              lines.push('', 'Met vriendelijke groet,', '', '[Uw naam]', '[Uw telefoonnummer]');
              const subject = encodeURIComponent(`Configuratie aanvraag${config.machine ? ` — ${config.machine.title}` : ''}`);
              const body = encodeURIComponent(lines.join('\n'));
              window.location.href = `mailto:verkoop@keizers.nu?subject=${subject}&body=${body}`;
              confirmAanvraag();
            }}>
              Configuratie aanvragen
            </button>
          )}
        </div>
      </div>
    </>
  );
}
