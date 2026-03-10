import React, { useState } from 'react';
import type { ProductConfigData } from '../configurator/types/configurator';
import {
  AdvisorAnswers, AreaBucket, SlopeBucket,
  Recommendation, getRecommendation,
} from './advisor-engine';
import { husqvarnaCatalog } from '../configurator/data/husqvarna-catalog';
import { formatPrice } from '../configurator/engine/pricing';
import {
  IconGardenXS, IconGardenSM, IconGardenMD, IconGardenLG, IconGardenXL, IconGardenXXL,
  IconSlopeFlat, IconSlopeMild, IconSlopeModerate, IconSlopeSteep,
  IconWifi, IconBluetooth, IconHedgehog, IconLeaf,
} from './icons';
import './advisor.css';

type Step = 'area' | 'slope' | 'smart' | 'wildlife' | 'result';

interface Props {
  onComplete: (productData: ProductConfigData) => void;
  onSkip:     () => void;
}

export function AdvisorWizard({ onComplete, onSkip }: Props) {
  const [step, setStep]       = useState<Step>('area');
  const [answers, setAnswers] = useState<AdvisorAnswers>({
    area: null, slope: null, wantsSmart: null, wantsWildlife: null,
  });
  const [rec, setRec] = useState<Recommendation | null>(null);

  function finalize(finalAnswers: AdvisorAnswers) {
    const result = getRecommendation(finalAnswers);
    setRec(result);
    setStep('result');
  }

  function selectArea(area: AreaBucket) {
    setAnswers(a => ({ ...a, area }));
    setStep('slope');
  }

  function selectSlope(slope: SlopeBucket) {
    setAnswers(a => ({ ...a, slope }));
    setStep('smart');
  }

  function selectSmart(wantsSmart: boolean) {
    setAnswers(a => ({ ...a, wantsSmart }));
    setStep('wildlife');
  }

  function selectWildlife(wantsWildlife: boolean) {
    const next = { ...answers, wantsWildlife };
    setAnswers(next);
    finalize(next);
  }

  const stepNum: Partial<Record<Step, number>> = {
    area: 1, slope: 2, smart: 3, wildlife: 4,
  };
  const currentNum = stepNum[step] ?? null;

  return (
    <div className="adv-shell">
      <header className="adv-header">
        <div className="adv-header__logo">
          <span className="adv-header__logo-text">KEIZERS</span>
          <span className="adv-header__logo-divider">|</span>
          <span className="adv-header__logo-sub">Maaiadvies op maat</span>
        </div>
        <button className="adv-header__skip" onClick={onSkip}>
          Direct configureren →
        </button>
      </header>

      <main className="adv-main">
        {currentNum !== null && (
          <div className="adv-dots" aria-hidden="true">
            {[1, 2, 3, 4].map(n => (
              <span
                key={n}
                className={[
                  'adv-dots__dot',
                  n < currentNum  ? 'adv-dots__dot--done'   : '',
                  n === currentNum ? 'adv-dots__dot--active' : '',
                ].filter(Boolean).join(' ')}
              />
            ))}
          </div>
        )}

        <div className="adv-content">

          {step === 'area' && (
            <AdvisorStep title="Hoe groot is uw gazon?" sub="Stap 1 van 4">
              <div className="adv-cards adv-cards--2col">
                {AREA_OPTIONS.map(opt => (
                  <AdvCard
                    key={opt.id}
                    label={opt.label}
                    sub={opt.sub}
                    onClick={() => selectArea(opt.id as AreaBucket)}
                  />
                ))}
              </div>
            </AdvisorStep>
          )}

          {step === 'slope' && (
            <AdvisorStep title="Hoe is uw terrein?" sub="Stap 2 van 4">
              <div className="adv-cards adv-cards--2col">
                {SLOPE_OPTIONS.map(opt => (
                  <AdvCard
                    key={opt.id}
                    label={opt.label}
                    sub={opt.sub}
                    icon={opt.icon}
                    onClick={() => selectSlope(opt.id as SlopeBucket)}
                  />
                ))}
              </div>
              <BackBtn onClick={() => setStep('area')} />
            </AdvisorStep>
          )}

          {step === 'smart' && (
            <AdvisorStep title="Wilt u app-bediening via WiFi?" sub="Stap 3 van 4">
              <p className="adv-step__hint">
                Met WiFi + 4G bedient u uw maaier via de Automower Connect-app. Maaiplan instellen, locatie volgen en meldingen ontvangen.
              </p>
              <div className="adv-cards adv-cards--2col">
                <AdvCard label="Ja, met app" sub="WiFi + 4G bediening" icon={<IconWifi />} onClick={() => selectSmart(true)} />
                <AdvCard label="Nee, eenvoudig" sub="Bluetooth volstaat" icon={<IconBluetooth />} onClick={() => selectSmart(false)} />
              </div>
              <BackBtn onClick={() => setStep('slope')} />
            </AdvisorStep>
          )}

          {step === 'wildlife' && (
            <AdvisorStep title="Heeft u dieren in de tuin?" sub="Stap 4 van 4">
              <p className="adv-step__hint">
                AI wildlife-detectie stopt de maaier automatisch als er een egel, kat of ander dier in de buurt is.
              </p>
              <div className="adv-cards adv-cards--2col">
                <AdvCard label="Ja, dierdetectie" sub="AI-camera aan boord" icon={<IconHedgehog />} onClick={() => selectWildlife(true)} />
                <AdvCard label="Nee, niet nodig" sub="Standaard beveiliging" icon={<IconLeaf />} onClick={() => selectWildlife(false)} />
              </div>
              <BackBtn onClick={() => setStep('smart')} />
            </AdvisorStep>
          )}

          {step === 'result' && rec && (
            <ResultScreen
              rec={rec}
              onConfigure={() => onComplete(rec.productData)}
              onBack={() => setStep('wildlife')}
            />
          )}

          {step === 'result' && !rec && (
            <div className="adv-result adv-result--contact">
              <p className="adv-result__tag">Persoonlijk advies</p>
              <h2 className="adv-result__model">Wij adviseren u graag</h2>
              <p className="adv-result__rationale">
                Op basis van uw wensen kunnen wij geen standaard model aanraden.
                Onze experts staan klaar voor persoonlijk advies.
              </p>
              <a href="mailto:info@keizers.nl" className="adv-result__cta">
                Neem contact op →
              </a>
              <BackBtn onClick={() => setStep('wildlife')} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// ─── Result screen ────────────────────────────────────────────────

function ResultScreen({
  rec, onConfigure, onBack,
}: {
  rec: Recommendation;
  onConfigure: () => void;
  onBack: () => void;
}) {
  const machine = husqvarnaCatalog.find(m => m.id === rec.modelId)!;

  return (
    <div className="adv-result">
      <p className="adv-result__tag">Ons advies</p>
      <h2 className="adv-result__model">{machine.title}</h2>
      <p className="adv-result__rationale">{rec.rationale}</p>

      <ul className="adv-result__highlights">
        {rec.highlights.map(h => <li key={h}>{h}</li>)}
      </ul>

      {rec.tradeoffs.length > 0 && (
        <div className="adv-result__tradeoffs">
          {rec.tradeoffs.map(t => (
            <p key={t} className="adv-result__tradeoff">{t}</p>
          ))}
        </div>
      )}

      <div className="adv-result__price">
        <span>Vanaf</span>
        <strong>{formatPrice(machine.price)}</strong>
        {machine.subtitle && (
          <span className="adv-result__msrp">{machine.subtitle}</span>
        )}
      </div>

      <button className="adv-result__cta" onClick={onConfigure}>
        Configureer mijn maaier →
      </button>

      <BackBtn onClick={onBack} />
    </div>
  );
}

// ─── Small reusables ──────────────────────────────────────────────

function AdvisorStep({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="adv-step">
      <p className="adv-step__sub">{sub}</p>
      <h2 className="adv-step__title">{title}</h2>
      {children}
    </div>
  );
}

function AdvCard({
  label, sub, icon, onClick,
}: { label: string; sub: string; icon?: React.ReactNode; onClick: () => void }) {
  return (
    <button className="adv-card" onClick={onClick}>
      {icon && <span className="adv-card__icon">{icon}</span>}
      <span className="adv-card__label">{label}</span>
      <span className="adv-card__sub">{sub}</span>
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className="adv-back" onClick={onClick}>← Terug</button>
  );
}

// ─── Static option data ───────────────────────────────────────────

const AREA_OPTIONS: { id: AreaBucket; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: 'xs',  label: 'Klein',       sub: 'tot 500 m²',           icon: <IconGardenXS /> },
  { id: 'sm',  label: 'Middel',      sub: '500 – 1.000 m²',       icon: <IconGardenSM /> },
  { id: 'md',  label: 'Groot',       sub: '1.000 – 2.000 m²',     icon: <IconGardenMD /> },
  { id: 'lg',  label: 'Heel groot',  sub: '2.000 – 5.000 m²',     icon: <IconGardenLG /> },
  { id: 'xl',  label: 'Zeer groot',  sub: '5.000 – 7.500 m²',     icon: <IconGardenXL /> },
  { id: 'xxl', label: 'Landgoed',    sub: '> 7.500 m²',           icon: <IconGardenXXL /> },
];

const SLOPE_OPTIONS: { id: SlopeBucket; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: 'flat',     label: 'Vlak',          sub: 'Nauwelijks helling',    icon: <IconSlopeFlat /> },
  { id: 'mild',     label: 'Licht hellend', sub: '30 – 40% helling',      icon: <IconSlopeMild /> },
  { id: 'moderate', label: 'Matig hellend', sub: '40 – 50% helling',      icon: <IconSlopeModerate /> },
  { id: 'steep',    label: 'Sterk hellend', sub: 'Meer dan 50% helling',  icon: <IconSlopeSteep /> },
];
