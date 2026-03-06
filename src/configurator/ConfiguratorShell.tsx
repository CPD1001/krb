import React, { lazy, Suspense } from 'react';
import { useConfigurator } from './ConfiguratorProvider';
import { ProgressBar } from './components/ProgressBar';
import { ProductVisual } from './components/ProductVisual';
import { StickyPriceBar } from './components/StickyPriceBar';
import { StepNavigation } from './components/StepNavigation';

// Lazy load step components for performance
const StepMachine = lazy(() => import('./steps/StepMachine').then(m => ({ default: m.StepMachine })));
const StepPowerSystem = lazy(() => import('./steps/StepPowerSystem').then(m => ({ default: m.StepPowerSystem })));
const StepCoreConfig = lazy(() => import('./steps/StepCoreConfig').then(m => ({ default: m.StepCoreConfig })));
const StepAccessories = lazy(() => import('./steps/StepAccessories').then(m => ({ default: m.StepAccessories })));
const StepProUpgrades = lazy(() => import('./steps/StepProUpgrades').then(m => ({ default: m.StepProUpgrades })));
const StepService = lazy(() => import('./steps/StepService').then(m => ({ default: m.StepService })));
const StepSummary = lazy(() => import('./steps/StepSummary').then(m => ({ default: m.StepSummary })));

function StepLoader() {
  return (
    <div className="cfg-step-loader">
      <div className="cfg-step-loader__spinner" />
    </div>
  );
}

export function ConfiguratorShell() {
  const { state } = useConfigurator();

  const renderStep = () => {
    switch (state.currentStep) {
      case 'machine':     return <StepMachine />;
      case 'power':       return <StepPowerSystem />;
      case 'core':        return <StepCoreConfig />;
      case 'accessories':  return <StepAccessories />;
      case 'upgrades':    return <StepProUpgrades />;
      case 'service':     return <StepService />;
      case 'summary':     return <StepSummary />;
    }
  };

  return (
    <div className="cfg-shell">
      <header className="cfg-header">
        <div className="cfg-header__logo">
          <span className="cfg-header__logo-text">KEIZERS</span>
          <span className="cfg-header__logo-divider">|</span>
          <span className="cfg-header__logo-sub">Machine Configurator</span>
        </div>
        <ProgressBar />
      </header>

      <main className="cfg-main">
        <section className="cfg-visual-panel">
          <ProductVisual />
        </section>

        <section className="cfg-step-panel">
          <Suspense fallback={<StepLoader />}>
            {renderStep()}
          </Suspense>
          <StepNavigation />
        </section>
      </main>

      <StickyPriceBar />
    </div>
  );
}
