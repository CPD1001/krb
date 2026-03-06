import React from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { STEP_LABELS, STEP_ORDER, type ConfigStep } from '../types/configurator';

export function ProgressBar() {
  const { state, currentStepIndex, goToStep } = useConfigurator();

  return (
    <nav className="cfg-progress" aria-label="Configurator stappen">
      <div className="cfg-progress__track">
        <div
          className="cfg-progress__fill"
          style={{ width: `${((currentStepIndex) / (STEP_ORDER.length - 1)) * 100}%` }}
        />
      </div>
      <ol className="cfg-progress__steps">
        {STEP_ORDER.map((step, index) => {
          const isActive = step === state.currentStep;
          const isCompleted = index < currentStepIndex;
          const isClickable = index <= currentStepIndex;

          return (
            <li key={step} className="cfg-progress__step-wrapper">
              <button
                className={[
                  'cfg-progress__step',
                  isActive && 'cfg-progress__step--active',
                  isCompleted && 'cfg-progress__step--completed',
                ].filter(Boolean).join(' ')}
                onClick={() => isClickable && goToStep(step)}
                disabled={!isClickable}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="cfg-progress__step-number">
                  {isCompleted ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="cfg-progress__step-label">{STEP_LABELS[step]}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
