import React, { useState } from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { formatPrice } from '../engine/pricing';

export function StickyPriceBar() {
  const { priceBreakdown, currentStepIndex, totalSteps, goNext, state } = useConfigurator();
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
          ) : (
            <button className="cfg-sticky-bar__cta cfg-sticky-bar__cta--primary">
              Configuratie aanvragen
            </button>
          )}
        </div>
      </div>
    </>
  );
}
