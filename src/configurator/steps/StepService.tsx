import React, { useState } from 'react';
import { useConfigurator } from '../ConfiguratorProvider';
import { OptionGroup } from '../components/OptionGroup';
import { BundleCard } from '../components/BundleCard';
import type { ServiceOption } from '../types/configurator';

// ─── Service comparison table ─────────────────────────────────────

const COMPARE_ROWS: {
  label: string;
  sub?: string;
  warranty: boolean | 'required';
  service: boolean;
  lease: boolean;
}[] = [
  {
    label: 'Herstellingen onder garantie',
    sub: 'Aangevraagd per fabrieksvoorwaarden gedurende de verlengde garantieperiode',
    warranty: true, service: false, lease: false,
  },
  {
    label: 'Herstellingen',
    sub: 'Conform algemene voorwaarden — slijtageonderdelen, verbruiksartikelen, verkeerd gebruik en verwaarlozing uitgesloten',
    warranty: false, service: true, lease: true,
  },
  {
    label: 'Gepland onderhoud',
    sub: 'Warranty Plus: jaarlijks onderhoud vereist om verlengde garantie te behouden',
    warranty: 'required', service: true, lease: true,
  },
  {
    label: 'Installatie',
    sub: 'Dient uitgevoerd te worden conform algemene voorwaarden',
    warranty: false, service: false, lease: true,
  },
  {
    label: 'Product + verzekering',
    sub: 'Machine inbegrepen in het maandelijkse leasebedrag',
    warranty: false, service: false, lease: true,
  },
];

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Inbegrepen">
      <circle cx="9" cy="9" r="9" fill="var(--cfg-color-accent)"/>
      <path d="M5 9.5L7.5 12L13 6.5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Required() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Vereist">
      <circle cx="9" cy="9" r="8.25" stroke="var(--cfg-color-accent)" strokeWidth="1.5"/>
      <path d="M5 9.5L7.5 12L13 6.5" stroke="var(--cfg-color-accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Dash() {
  return <span className="cfg-svc-compare__dash" aria-label="Niet inbegrepen">—</span>;
}

function ServiceCompare() {
  const [open, setOpen] = useState(false);
  return (
    <div className="cfg-svc-compare">
      <button
        type="button"
        className="cfg-svc-compare__toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>Wat zit er in elk pakket?</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="cfg-svc-compare__body">
          <table className="cfg-svc-compare__table">
            <thead>
              <tr>
                <th></th>
                <th>Warranty<br/>Plus</th>
                <th>Service<br/>Plus</th>
                <th>Lease<br/>Plus</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(row => (
                <tr key={row.label}>
                  <td>
                    <span className="cfg-svc-compare__feat">{row.label}</span>
                    {row.sub && <span className="cfg-svc-compare__sub">{row.sub}</span>}
                  </td>
                  <td>{row.warranty === true ? <Check /> : row.warranty === 'required' ? <Required /> : <Dash />}</td>
                  <td>{row.service ? <Check /> : <Dash />}</td>
                  <td>{row.lease ? <Check /> : <Dash />}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cfg-svc-compare__note">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{flexShrink:0,marginTop:2}}>
              <circle cx="6.5" cy="6.5" r="5.75" stroke="currentColor" strokeWidth="1.25"/>
              <path d="M6.5 5.5V9M6.5 4V4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
            </svg>
            Omlijnd vinkje = inbegrepen maar vereist actie uwerzijds (jaarlijks onderhoud plannen voor Warranty Plus).
          </p>
        </div>
      )}
    </div>
  );
}

export function StepService() {
  const { state, toggleService } = useConfigurator();
  const services = state.productData?.services ?? [];
  const bundleRules = state.productData?.bundleRules ?? [];
  const selectedIds = state.config.services.map(s => s.id);

  const serviceBundles = bundleRules.filter(rule =>
    rule.optionIds.some(id => services.some(s => s.id === id))
  );

  const activateBundle = (bundleRule: typeof bundleRules[0]) => {
    const missingIds = bundleRule.optionIds.filter(id => !selectedIds.includes(id));
    for (const id of missingIds) {
      const svc = services.find(s => s.id === id);
      if (svc) toggleService(svc);
    }
  };

  return (
    <div className="cfg-step cfg-step--service">
      <div className="cfg-step__header">
        <h2 className="cfg-step__title">Service & Installatie</h2>
        <p className="cfg-step__subtitle">
          Professionele service voor een zorgeloos resultaat. Onze specialisten verzorgen alles.
        </p>
      </div>

      <div className="cfg-step__content">
        <ServiceCompare />

        {serviceBundles.length > 0 && (
          <div className="cfg-step__bundles">
            {serviceBundles.map(bundle => (
              <BundleCard
                key={bundle.id}
                bundle={bundle}
                allOptions={services}
                onActivate={() => activateBundle(bundle)}
              />
            ))}
          </div>
        )}

        <OptionGroup
          title="Warranty Plus"
          subtitle="Verlengde garantie met jaarlijks onderhoud"
          options={services.filter(s => s.category === 'warranty')}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => toggleService(opt as ServiceOption)}
        />

        <OptionGroup
          title="Service Plus"
          subtitle="Volledig ontzorgd onderhoudscontract"
          options={services.filter(s => s.category === 'service-contract')}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => toggleService(opt as ServiceOption)}
        />

        <OptionGroup
          title="Lease Plus"
          subtitle="Alles-in-één: machine, onderhoud en verzekering"
          options={services.filter(s => s.category === 'lease')}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => toggleService(opt as ServiceOption)}
        />

        <OptionGroup
          title="Installatie"
          subtitle="Laat het aan onze specialisten over"
          options={services.filter(s => ['delivery', 'installation', 'training'].includes(s.category))}
          selectedIds={selectedIds}
          mode="checkbox"
          onSelect={(opt) => toggleService(opt as ServiceOption)}
        />

        {/* Social proof for services */}
        <div className="cfg-step__social-proof">
          <div className="cfg-social-proof">
            <div className="cfg-social-proof__bar">
              <div className="cfg-social-proof__fill" style={{ width: '92%' }} />
            </div>
            <p className="cfg-social-proof__text">
              <strong>92%</strong> van de professionals kiest voor professionele installatie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
