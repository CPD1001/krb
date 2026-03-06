import React, { useState } from 'react';
import { useConfigurator } from '../ConfiguratorProvider';

export function ProductVisual() {
  const { state } = useConfigurator();
  const machine = state.config.machine;
  const [activeAngle, setActiveAngle] = useState(0);
  const [imageError, setImageError] = useState(false);

  if (!machine) {
    return (
      <div className="cfg-visual">
        <div className="cfg-visual__placeholder">
          <div className="cfg-visual__placeholder-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="8" y="16" width="64" height="48" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <circle cx="28" cy="36" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <path d="M8 52L24 40L40 48L56 32L72 44" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            </svg>
          </div>
          <p className="cfg-visual__placeholder-text">Selecteer een machine om te beginnen</p>
        </div>
      </div>
    );
  }

  const images = [machine.heroImage, ...machine.galleryImages];

  return (
    <div className="cfg-visual">
      <div className="cfg-visual__hero">
        {!imageError ? (
          <img
            src={images[activeAngle] ?? machine.heroImage}
            alt={machine.title}
            className="cfg-visual__image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="cfg-visual__fallback">
            <div className="cfg-visual__fallback-machine">
              <div className="cfg-visual__fallback-body" />
              <div className="cfg-visual__fallback-label">{machine.title}</div>
            </div>
          </div>
        )}
      </div>

      {/* Angle selector dots */}
      {images.length > 1 && (
        <div className="cfg-visual__angles">
          {images.map((_, i) => (
            <button
              key={i}
              className={`cfg-visual__angle-dot ${i === activeAngle ? 'cfg-visual__angle-dot--active' : ''}`}
              onClick={() => { setActiveAngle(i); setImageError(false); }}
              aria-label={`Hoek ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Key specs */}
      {machine.keySpecs && machine.keySpecs.length > 0 && (
        <div className="cfg-visual__specs">
          {machine.keySpecs.map(spec => (
            <div key={spec.label} className="cfg-visual__spec">
              <span className="cfg-visual__spec-value">{spec.value}</span>
              <span className="cfg-visual__spec-label">{spec.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
