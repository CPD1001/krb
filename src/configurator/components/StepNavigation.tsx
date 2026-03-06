import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';

export function StepNavigation() {
  const { canGoBack, canGoNext, goBack, goNext, state } = useConfigurator();
  const isSummary = state.currentStep === 'summary';

  return (
    <div className="cfg-step-nav">
      <button
        className="cfg-step-nav__btn cfg-step-nav__btn--back"
        onClick={goBack}
        disabled={!canGoBack}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Vorige
      </button>

      {canGoNext && !isSummary && (
        <button className="cfg-step-nav__btn cfg-step-nav__btn--next" onClick={goNext}>
          Volgende
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
