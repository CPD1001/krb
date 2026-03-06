import React from 'react';
import { formatPriceDelta } from '../engine/pricing';
import type { ConfigOption } from '../types/configurator';

interface OptionCardProps {
  option: ConfigOption;
  selected: boolean;
  disabled: boolean;
  recommended: boolean;
  mode: 'radio' | 'checkbox';
  onSelect: () => void;
}

const BADGE_LABELS: Record<string, string> = {
  recommended: 'Aanbevolen',
  popular: 'Meest gekozen',
  new: 'Nieuw',
  pro: 'Professioneel',
};

export function OptionCard({ option, selected, disabled, recommended, mode, onSelect }: OptionCardProps) {
  const badge = recommended ? 'recommended' : option.badge;

  return (
    <button
      type="button"
      className={[
        'cfg-option-card',
        selected && 'cfg-option-card--selected',
        disabled && 'cfg-option-card--disabled',
        recommended && 'cfg-option-card--recommended',
      ].filter(Boolean).join(' ')}
      onClick={() => !disabled && onSelect()}
      disabled={disabled}
      aria-pressed={mode === 'checkbox' ? selected : undefined}
      aria-checked={mode === 'radio' ? selected : undefined}
      role={mode === 'radio' ? 'radio' : 'checkbox'}
    >
      {/* Selection indicator */}
      <div className="cfg-option-card__check">
        {mode === 'radio' ? (
          <div className="cfg-option-card__radio">
            {selected && <div className="cfg-option-card__radio-dot" />}
          </div>
        ) : (
          <div className="cfg-option-card__checkbox">
            {selected && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Image */}
      {option.image && (
        <div className="cfg-option-card__image">
          <img
            src={option.image}
            alt={option.title}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="cfg-option-card__content">
        <div className="cfg-option-card__header">
          <h4 className="cfg-option-card__title">{option.title}</h4>
          {badge && (
            <span className={`cfg-option-card__badge cfg-option-card__badge--${badge}`}>
              {BADGE_LABELS[badge] ?? badge}
            </span>
          )}
        </div>
        {option.description && (
          <p className="cfg-option-card__desc">{option.description}</p>
        )}
        {option.specs && (
          <div className="cfg-option-card__specs">
            {Object.entries(option.specs).map(([key, value]) => (
              <span key={key} className="cfg-option-card__spec">
                <span className="cfg-option-card__spec-label">{key}:</span> {value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="cfg-option-card__price">
        <span className={option.price === 0 ? 'cfg-option-card__price--included' : ''}>
          {formatPriceDelta(option.price)}
        </span>
      </div>

      {/* Disabled reason */}
      {disabled && (
        <div className="cfg-option-card__disabled-overlay">
          <span>Niet compatibel</span>
        </div>
      )}
    </button>
  );
}
