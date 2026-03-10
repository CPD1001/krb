import type { ServiceOption } from '../types/configurator';

export const sharedServices: ServiceOption[] = [
  // ── Garantie ────────────────────────────────────────────────────
  {
    id: 'warranty-plus',
    title: 'Warranty Plus — 5 jaar garantie',
    description:
      '5 jaar totale garantie inclusief jaarlijks onderhoud door Keizers. Zorgeloos maaien, jaar na jaar.',
    price: 9999,
    category: 'warranty',
    badge: 'recommended',
    duration: '5 jaar',
    billing: 'once',
  },

  // ── Onderhoudscontract ───────────────────────────────────────────
  {
    id: 'service-plus-36m',
    title: 'Service Plus — 36 maanden',
    subtitle: 'Volledig ontzorgd onderhoud',
    description:
      'Compleet onderhoudscontract voor 3 jaar. Inclusief jaarlijkse servicebeurt, onderdelen en prioriteitsservice.',
    price: 51400,
    category: 'service-contract',
    duration: '36 maanden',
    billing: 'once',
    incompatibleWith: ['service-plus-60m'],
  },
  {
    id: 'service-plus-60m',
    title: 'Service Plus — 60 maanden',
    subtitle: 'Onze meest complete bescherming',
    description:
      'Compleet onderhoudscontract voor 5 jaar. Inclusief jaarlijkse servicebeurt, onderdelen en prioriteitsservice.',
    price: 85000,
    category: 'service-contract',
    badge: 'recommended',
    duration: '60 maanden',
    billing: 'once',
    incompatibleWith: ['service-plus-36m'],
  },

  // ── Lease ───────────────────────────────────────────────────────
  {
    id: 'lease-plus-36m',
    title: 'Lease Plus — 36 maanden',
    subtitle: '€77,99 per maand',
    description:
      'Lease uw Automower voor 3 jaar. Inclusief onderhoud en garantie. Geen grote eenmalige investering.',
    price: 7799,
    category: 'lease',
    duration: '36 maanden',
    billing: 'monthly',
    incompatibleWith: ['lease-plus-60m'],
  },
  {
    id: 'lease-plus-60m',
    title: 'Lease Plus — 60 maanden',
    subtitle: '€62,99 per maand',
    description:
      'Lease uw Automower voor 5 jaar tegen de laagste maandelijkse kosten. Inclusief onderhoud en garantie.',
    price: 6299,
    category: 'lease',
    badge: 'popular',
    duration: '60 maanden',
    billing: 'monthly',
    incompatibleWith: ['lease-plus-36m'],
  },

  // ── Installatie ─────────────────────────────────────────────────
  {
    id: 'zelf-installeren',
    title: 'Zelf installeren',
    description:
      "Installeer uw Automower zelf met de meegeleverde handleiding en onze online instructievideo's.",
    price: 0,
    category: 'installation',
    incompatibleWith: ['installatie-level-1', 'installatie-level-2', 'installatie-level-3'],
  },
  {
    id: 'installatie-level-1',
    title: 'Installatie door Keizers — Eenvoudig',
    subtitle: 'Vlak gazon, recht toe recht aan',
    description: 'Eenvoudige installatie voor een vlak gazon zonder noemenswaardige obstakels of hellingen.',
    price: 30000,
    category: 'installation',
    incompatibleWith: ['zelf-installeren', 'installatie-level-2', 'installatie-level-3'],
  },
  {
    id: 'installatie-level-2',
    title: 'Installatie door Keizers — Gemiddeld',
    subtitle: 'Kleine helling, enkele boompjes of obstakels',
    description:
      'Installatie voor tuinen met een lichte helling, wat boompjes of andere obstakels.',
    price: 50000,
    category: 'installation',
    badge: 'popular',
    incompatibleWith: ['zelf-installeren', 'installatie-level-1', 'installatie-level-3'],
  },
  {
    id: 'installatie-level-3',
    title: 'Installatie door Keizers — Complex',
    subtitle: 'Steile helling, veel obstakels of eilanden',
    description:
      'Uitgebreide installatie voor complexe tuinen met steile hellingen, meerdere obstakels of aparte graseilanden.',
    price: 70000,
    category: 'installation',
    incompatibleWith: ['zelf-installeren', 'installatie-level-1', 'installatie-level-2'],
  },
];

/** Return the suggested installation service ID based on slope % */
export function suggestInstallationLevel(slopePercent: number): string {
  if (slopePercent >= 45) return 'installatie-level-3';
  if (slopePercent >= 30) return 'installatie-level-2';
  return 'installatie-level-1';
}
