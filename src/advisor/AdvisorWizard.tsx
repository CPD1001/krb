import React, { useState } from 'react';
import type { ProductConfigData } from '../configurator/types/configurator';
import {
  AdvisorAnswers, AreaBucket, SlopeBucket,
  Recommendation, getRecommendationForBrand,
} from './advisor-engine';
import { BRANDS, BrandDef } from './brands';
import { formatPrice } from '../configurator/engine/pricing';
import {
  IconGardenXS, IconGardenSM, IconGardenMD, IconGardenLG, IconGardenXL, IconGardenXXL,
  IconSlopeFlat, IconSlopeMild, IconSlopeModerate, IconSlopeSteep,
  IconWifi, IconBluetooth, IconHedgehog, IconLeaf, IconWireless, IconWired,
} from './icons';
import './advisor.css';

type Step = 'area' | 'slope' | 'smart' | 'wildlife' | 'wireless' | 'result';

interface Props {
  onComplete: (productData: ProductConfigData, brand: BrandDef) => void;
  onSkip:     () => void;
}

export function AdvisorWizard({ onComplete, onSkip }: Props) {
  const [step, setStep]       = useState<Step>('area');
  const [answers, setAnswers] = useState<AdvisorAnswers>({
    area: null, slope: null, wantsSmart: null, wantsWildlife: null, wantsWireless: null,
  });
  const [recs, setRecs] = useState<Recommendation[]>([]);

  function finalize(finalAnswers: AdvisorAnswers) {
    const results = BRANDS
      .map(brand => getRecommendationForBrand(finalAnswers, brand))
      .filter((r): r is Recommendation => r !== null);
    setRecs(results);
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
    setAnswers(a => ({ ...a, wantsWildlife }));
    setStep('wireless');
  }

  function selectWireless(wantsWireless: boolean) {
    const next = { ...answers, wantsWireless };
    setAnswers(next);
    finalize(next);
  }

  const stepNum: Partial<Record<Step, number>> = {
    area: 1, slope: 2, smart: 3, wildlife: 4, wireless: 5,
  };
  const currentNum = stepNum[step] ?? null;
  const TOTAL_STEPS = 5;

  return (
    <div className="adv-shell">
      <header className="adv-header">
        <div className="adv-header__logo">
          <img
            src="https://cdn.shopify.com/s/files/1/0790/7636/0505/files/Keizers_logo_scissor_only.pdf.png?v=1773140997"
            alt="Keizers"
            className="adv-header__logo-img"
          />
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
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(n => (
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
            <AdvisorStep title="Hoe groot is uw gazon?" sub={`Stap 1 van ${TOTAL_STEPS}`}>
              <div className="adv-cards adv-cards--2col">
                {AREA_OPTIONS.map(opt => (
                  <AdvCard key={opt.id} label={opt.label} sub={opt.sub} icon={opt.icon}
                    onClick={() => selectArea(opt.id as AreaBucket)} />
                ))}
              </div>
            </AdvisorStep>
          )}

          {step === 'slope' && (
            <AdvisorStep title="Hoe is uw terrein?" sub={`Stap 2 van ${TOTAL_STEPS}`}>
              <div className="adv-cards adv-cards--2col">
                {SLOPE_OPTIONS.map(opt => (
                  <AdvCard key={opt.id} label={opt.label} sub={opt.sub} icon={opt.icon}
                    onClick={() => selectSlope(opt.id as SlopeBucket)} />
                ))}
              </div>
              <BackBtn onClick={() => setStep('area')} />
            </AdvisorStep>
          )}

          {step === 'smart' && (
            <AdvisorStep title="Wilt u app-bediening via WiFi?" sub={`Stap 3 van ${TOTAL_STEPS}`}>
              <p className="adv-step__hint">
                Met WiFi + 4G bedient u uw maaier via de app. Maaiplan instellen, locatie volgen en meldingen ontvangen.
              </p>
              <div className="adv-cards adv-cards--2col">
                <AdvCard label="Ja, met app" sub="WiFi + 4G bediening" icon={<IconWifi />} onClick={() => selectSmart(true)} />
                <AdvCard label="Nee, eenvoudig" sub="Bluetooth volstaat" icon={<IconBluetooth />} onClick={() => selectSmart(false)} />
              </div>
              <BackBtn onClick={() => setStep('slope')} />
            </AdvisorStep>
          )}

          {step === 'wildlife' && (
            <AdvisorStep title="Heeft u dieren in de tuin?" sub={`Stap 4 van ${TOTAL_STEPS}`}>
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

          {step === 'wireless' && (
            <AdvisorStep title="Wilt u een draadloos systeem?" sub={`Stap 5 van ${TOTAL_STEPS}`}>
              <p className="adv-step__hint">
                Een draadloos systeem (zoals Husqvarna NERA) heeft geen begrenzingsdraad nodig.
                Een systeem met draad is ook uitstekend, maar vereist éénmalig installatie van een draad rondom uw gazon.
              </p>
              <div className="adv-cards adv-cards--2col">
                <AdvCard label="Ja, draadloos" sub="Geen begrenzingsdraad" icon={<IconWireless />} onClick={() => selectWireless(true)} />
                <AdvCard label="Maakt niet uit" sub="Draad is ook prima" icon={<IconWired />} onClick={() => selectWireless(false)} />
              </div>
              <BackBtn onClick={() => setStep('wildlife')} />
            </AdvisorStep>
          )}

          {step === 'result' && recs.length > 0 && (
            <ResultScreen
              recs={recs}
              answers={answers}
              onSelectBrand={(productData, brand) => onComplete(productData, brand)}
              onBack={() => setStep('wireless')}
            />
          )}

          {step === 'result' && recs.length === 0 && (
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
              <BackBtn onClick={() => setStep('wireless')} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// ─── Result screen ────────────────────────────────────────────────

function ResultScreen({
  recs, answers, onSelectBrand, onBack,
}: {
  recs: Recommendation[];
  answers: AdvisorAnswers;
  onSelectBrand: (productData: ProductConfigData, brand: BrandDef) => void;
  onBack: () => void;
}) {
  const wantsWireless = answers.wantsWireless === true;

  // Split into wireless (primary) and wired (secondary) recommendations
  const wirelessRecs = recs.filter(r => r.brand.modelSpecs.find(m => m.id === r.modelId)?.wireless);
  const wiredRecs    = recs.filter(r => !r.brand.modelSpecs.find(m => m.id === r.modelId)?.wireless);

  const primaryRecs   = wantsWireless ? wirelessRecs : recs;
  const secondaryRecs = wantsWireless ? wiredRecs    : [];

  // Single primary recommendation — show detailed view
  if (primaryRecs.length === 1 && secondaryRecs.length === 0) {
    const rec = primaryRecs[0];
    const machine = rec.brand.catalog.find(m => m.id === rec.modelId)!;
    const isWired = !rec.brand.modelSpecs.find(m => m.id === rec.modelId)?.wireless;

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
            {rec.tradeoffs.map(t => <p key={t} className="adv-result__tradeoff">{t}</p>)}
          </div>
        )}

        <div className="adv-result__price">
          <span>Vanaf</span>
          <strong>{formatPrice(machine.price)}</strong>
          {machine.subtitle && <span className="adv-result__msrp">{machine.subtitle}</span>}
        </div>

        {isWired && wantsWireless && (
          <div className="adv-result__wire-note">
            <WireIcon /> Werkt met begrenzingsdraad
          </div>
        )}

        <button
          className="adv-result__cta"
          style={{ background: rec.brand.colors.accent, color: '#fff' }}
          onClick={() => onSelectBrand(rec.productData, rec.brand)}
        >
          Configureer mijn maaier →
        </button>

        <BackBtn onClick={onBack} />
      </div>
    );
  }

  // Multiple recommendations — brand cards with optional secondary section
  return (
    <div className="adv-result">
      <p className="adv-result__tag">Ons advies</p>
      <h2 className="adv-result__model" style={{ fontSize: '1.5rem' }}>
        {wantsWireless && primaryRecs.length > 0
          ? 'Draadloze aanbevelingen'
          : 'Passende maaiers voor uw tuin'}
      </h2>
      {wantsWireless && primaryRecs.length > 0 && (
        <p className="adv-result__rationale">
          Op basis van uw wensen adviseren wij de volgende draadloze modellen.
        </p>
      )}

      <div className="adv-brand-recs">
        {primaryRecs.map(rec => (
          <BrandRecCard
            key={rec.brand.id}
            rec={rec}
            onSelect={onSelectBrand}
            wiredNote={false}
          />
        ))}
      </div>

      {secondaryRecs.length > 0 && (
        <>
          <div className="adv-secondary-header">
            <span className="adv-secondary-header__label">Ook mogelijk</span>
            <span className="adv-secondary-header__sub">
              Deze modellen werken met een begrenzingsdraad
            </span>
          </div>
          <div className="adv-brand-recs">
            {secondaryRecs.map(rec => (
              <BrandRecCard
                key={rec.brand.id}
                rec={rec}
                onSelect={onSelectBrand}
                wiredNote
              />
            ))}
          </div>
        </>
      )}

      <BackBtn onClick={onBack} />
    </div>
  );
}

// ─── Brand recommendation card ────────────────────────────────────

function BrandRecCard({
  rec, onSelect, wiredNote,
}: {
  rec: Recommendation;
  onSelect: (productData: ProductConfigData, brand: BrandDef) => void;
  wiredNote: boolean;
}) {
  const machine = rec.brand.catalog.find(m => m.id === rec.modelId)!;
  return (
    <div className={`adv-brand-rec${wiredNote ? ' adv-brand-rec--wired' : ''}`}>
      {wiredNote && (
        <div className="adv-brand-rec__wire-banner">
          <WireIcon /> Werkt met begrenzingsdraad
        </div>
      )}
      <p className="adv-brand-rec__name">{rec.brand.name}</p>
      <p className="adv-brand-rec__model">{machine.title}</p>
      <ul className="adv-brand-rec__highlights">
        {rec.highlights.slice(0, 3).map(h => <li key={h}>{h}</li>)}
      </ul>
      {rec.tradeoffs.length > 0 && (
        <p className="adv-brand-rec__tradeoff">{rec.tradeoffs[0]}</p>
      )}
      <div className="adv-brand-rec__price">
        <strong>{formatPrice(machine.price)}</strong>
      </div>
      <button
        className="adv-brand-rec__cta"
        style={{ background: rec.brand.colors.accent }}
        onClick={() => onSelect(rec.productData, rec.brand)}
      >
        Kies {rec.brand.name} →
      </button>
    </div>
  );
}

// ─── Wire icon ────────────────────────────────────────────────────

function WireIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2"/>
    </svg>
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
