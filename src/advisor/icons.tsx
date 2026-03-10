import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const defaults = { size: 40, strokeWidth: 1.75 };

// ─── Garden area (top-down view, field grows per size) ────────────

export function IconGardenXS({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="13" y="11" width="14" height="18" rx="2" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      {/* grass tufts */}
      <path d="M16 29 Q16 32 16 29 M20 29 Q20 33 20 29 M24 29 Q24 32 24 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* house dot */}
      <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

export function IconGardenSM({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="8" y="9" width="24" height="22" rx="2" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      <path d="M12 31 Q12 34 12 31 M17 31 Q17 35 17 31 M22 31 Q22 34 22 31 M27 31 Q27 35 27 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="19" r="2.5" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

export function IconGardenMD({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="32" height="26" rx="2" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      <path d="M7 33 Q7 36 7 33 M13 33 Q13 36 13 33 M19 33 Q19 36 19 33 M25 33 Q25 36 25 33 M31 33 Q31 36 31 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="16" y="14" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.25" opacity="0.5"/>
      <path d="M16 14 L20 10 L24 14" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  );
}

export function IconGardenLG({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="36" height="30" rx="2" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      {/* inner path / driveway */}
      <path d="M20 35 L20 26 M17 26 L23 26" stroke="currentColor" strokeWidth="1.25" opacity="0.35" strokeLinecap="round"/>
      <rect x="15" y="13" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.25" opacity="0.5"/>
      <path d="M15 13 L20 8 L25 13" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" opacity="0.5"/>
      {/* trees */}
      <circle cx="8"  cy="22" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
      <circle cx="32" cy="22" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
    </svg>
  );
}

export function IconGardenXL({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="38" height="34" rx="2" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      {/* fields subdivided */}
      <line x1="20" y1="3" x2="20" y2="37" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 2"/>
      <line x1="1" y1="20" x2="39" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 2"/>
      <rect x="14" y="13" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.25" opacity="0.5"/>
      <path d="M14 13 L20 8 L26 13" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" opacity="0.5"/>
      <circle cx="8"  cy="28" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
      <circle cx="32" cy="28" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
      <circle cx="8"  cy="10" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
      <circle cx="32" cy="10" r="3" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
    </svg>
  );
}

export function IconGardenXXL({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="38" height="34" rx="2" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      {/* 2x3 field grid */}
      <line x1="20" y1="3" x2="20" y2="37" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 2"/>
      <line x1="1" y1="16" x2="39" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 2"/>
      <line x1="1" y1="27" x2="39" y2="27" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 2"/>
      {/* house + barn */}
      <rect x="14" y="7" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.1" opacity="0.5"/>
      <path d="M14 7 L18 4 L22 7" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" opacity="0.5"/>
      <rect x="23" y="7" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.1" opacity="0.4"/>
      {/* trees in corners */}
      <circle cx="7"  cy="10" r="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.35"/>
      <circle cx="33" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.35"/>
      <circle cx="7"  cy="22" r="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.35"/>
      <circle cx="33" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.35"/>
      <circle cx="7"  cy="32" r="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.35"/>
      <circle cx="33" cy="32" r="2.5" stroke="currentColor" strokeWidth="1.1" opacity="0.35"/>
    </svg>
  );
}

// ─── Slope / terrain profile (side view) ─────────────────────────

export function IconSlopeFlat({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* ground */}
      <path d="M4 28 L36 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* grass tufts */}
      <path d="M8 28 L7 24 M8 28 L9 24 M16 28 L15 24 M16 28 L17 24 M24 28 L23 24 M24 28 L25 24 M32 28 L31 24 M32 28 L33 24"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.6"/>
      {/* robot */}
      <rect x="17" y="21" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.25" opacity="0.6"/>
      <circle cx="19" cy="25" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="21" cy="25" r="1" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

export function IconSlopeMild({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* terrain profile: flat then mild rise */}
      <path d="M4 32 L18 32 L36 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* grass on slope */}
      <path d="M9 32 L8 28 M9 32 L10 28 M22 27 L21 23 M22 27 L23 23 M30 23 L29 19 M30 23 L31 19"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.6"/>
      {/* angle indicator */}
      <path d="M18 32 A8 8 0 0 0 23.7 28" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
    </svg>
  );
}

export function IconSlopeModerate({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* steeper slope */}
      <path d="M4 34 L14 34 L36 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 34 L7 30 M8 34 L9 30 M19 26 L18 22 M19 26 L20 22 M28 18 L27 14 M28 18 L29 14"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.6"/>
      <path d="M14 34 A10 10 0 0 0 20.5 28" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
    </svg>
  );
}

export function IconSlopeSteep({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* very steep / cliff-like */}
      <path d="M4 36 L12 36 L28 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* rocks */}
      <path d="M8 36 L7 32 M8 36 L9 32 M17 24 L16 20 M17 24 L18 20 M23 14 L22 10 M23 14 L24 10"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.6"/>
      {/* angle indicator */}
      <path d="M12 36 A12 12 0 0 0 16 26" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
      {/* warning dots at top */}
      <circle cx="30" cy="9" r="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="34" cy="6" r="1.5" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

// ─── Connectivity ──────────────────────────────────────────────────

export function IconWifi({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* phone */}
      <rect x="15" y="16" width="10" height="16" rx="2" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      <line x1="19" y1="29" x2="21" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* wifi arcs above */}
      <path d="M12 13 Q20 6 28 13" stroke="currentColor" strokeWidth={defaults.strokeWidth} strokeLinecap="round" fill="none"/>
      <path d="M15 16.5 Q20 11 25 16.5" stroke="currentColor" strokeWidth={defaults.strokeWidth} strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}

export function IconBluetooth({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* Bluetooth B shape */}
      <path d="M17 10 L17 30 L24 24 L18 20 L24 16 L17 10Z"
        stroke="currentColor" strokeWidth={defaults.strokeWidth} strokeLinejoin="round" fill="none"/>
      {/* corner ticks */}
      <path d="M13 14 L17 10 M13 26 L17 30"
        stroke="currentColor" strokeWidth={defaults.strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

// ─── Wildlife ──────────────────────────────────────────────────────

export function IconHedgehog({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* body */}
      <ellipse cx="20" cy="26" rx="13" ry="8" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      {/* snout / head */}
      <circle cx="31" cy="25" r="4" stroke="currentColor" strokeWidth={defaults.strokeWidth}/>
      {/* nose */}
      <circle cx="34" cy="24" r="1" fill="currentColor"/>
      {/* eye */}
      <circle cx="32" cy="22" r="0.8" fill="currentColor"/>
      {/* spines */}
      <path d="M12 22 L8 16 M15 20 L12 13 M19 19 L18 11 M23 19 L24 12 M27 20 L29 14"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      {/* feet */}
      <path d="M14 33 L14 36 M19 34 L19 37 M24 34 L24 37"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconLeaf({ size = defaults.size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* leaf shape */}
      <path d="M20 34 C20 34 8 28 8 16 C8 8 14 6 20 6 C26 6 32 8 32 16 C32 28 20 34 20 34Z"
        stroke="currentColor" strokeWidth={defaults.strokeWidth} fill="none"/>
      {/* midrib */}
      <path d="M20 34 L20 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.5"/>
      {/* veins */}
      <path d="M20 18 L14 13 M20 22 L13 19 M20 26 L15 24 M20 18 L26 13 M20 22 L27 19 M20 26 L25 24"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
    </svg>
  );
}
