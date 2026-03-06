import React from 'react';
import { formatPrice } from '../engine/pricing';
import type { BundleRule, ConfigOption } from '../types/configurator';
import { useConfigurator } from '../ConfiguratorProvider';

interface BundleCardProps {
  bundle: BundleRule;
  allOptions: ConfigOption[];
  onActivate: () => void;
}

export function BundleCard({ bundle, allOptions, onActivate }: BundleCardProps) {
  const { isOptionSelected } = useConfigurator();

  const bundleOptions = bundle.optionIds
    .map(id => allOptions.find(o => o.id === id))
    .filter(Boolean) as ConfigOption[];

  const selectedCount = bundle.optionIds.filter(id => isOptionSelected(id)).length;
  const isComplete = selectedCount === bundle.optionIds.length;
  const isPartial = selectedCount > 0 && !isComplete;

  return (
    <div className={[
      'cfg-bundle-card',
      isComplete && 'cfg-bundle-card--active',
      isPartial && 'cfg-bundle-card--partial',
    ].filter(Boolean).join(' ')}>
      <div className="cfg-bundle-card__header">
        <div className="cfg-bundle-card__icon">
          {isComplete ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="var(--cfg-color-success)" />
              <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="var(--cfg-color-accent)" strokeWidth="2"/>
              <text x="10" y="14" textAnchor="middle" fontSize="10" fill="var(--cfg-color-accent)" fontWeight="700">%</text>
            </svg>
          )}
        </div>
        <div className="cfg-bundle-card__title-group">
          <h4 className="cfg-bundle-card__title">{bundle.label}</h4>
          <span className="cfg-bundle-card__discount">
            Bespaar {formatPrice(bundle.discount)}
          </span>
        </div>
      </div>

      {bundle.description && (
        <p className="cfg-bundle-card__desc">{bundle.description}</p>
      )}

      <div className="cfg-bundle-card__items">
        {bundleOptions.map(opt => (
          <div key={opt.id} className={[
            'cfg-bundle-card__item',
            isOptionSelected(opt.id) && 'cfg-bundle-card__item--selected',
          ].filter(Boolean).join(' ')}>
            <span className="cfg-bundle-card__item-check">
              {isOptionSelected(opt.id) ? '✓' : '○'}
            </span>
            <span className="cfg-bundle-card__item-name">{opt.title}</span>
          </div>
        ))}
      </div>

      {!isComplete && (
        <button className="cfg-bundle-card__cta" onClick={onActivate}>
          {isPartial ? `Voeg ${bundle.optionIds.length - selectedCount} toe voor korting` : 'Activeer bundel'}
        </button>
      )}

      {isComplete && (
        <div className="cfg-bundle-card__active-label">
          Bundelkorting actief
        </div>
      )}
    </div>
  );
}
