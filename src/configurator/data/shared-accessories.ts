import type { AccessoryOption } from '../types/configurator';

// Models that cannot use the Rough Terrain Kit (435X AWD has built-in AWD)
const NO_ROUGH_TERRAIN = ['435x-awd-nera'];

export const sharedAccessories: AccessoryOption[] = [
  {
    id: 'opberghaak',
    title: 'Automower Opberghaak',
    description: 'Handige wandhaak om uw Automower netjes op te bergen wanneer niet in gebruik.',
    price: 3300,
    category: 'other',
  },
  {
    id: 'automower-house',
    title: 'Automower House',
    description:
      'Beschermt het laadstation en uw robotmaaier tegen zon en regen. Verlengt de levensduur van accu en elektronica.',
    price: 21900,
    category: 'protection',
    badge: 'popular',
  },
  {
    id: 'endurance-messen',
    title: 'Endurance Messen',
    description: 'Gaan twee keer zo lang mee als standaard messen. Minder vervangbeurten, meer maaiplezier.',
    price: 3099,
    category: 'cutting',
    badge: 'popular',
  },
  {
    id: 'reinigingskit',
    title: 'Reinigings- en Onderhoudskit',
    description:
      'Alles wat u nodig heeft voor het onderhoud van uw Automower. Houdt uw maaier in topconditie.',
    price: 4300,
    category: 'other',
  },
  {
    id: 'rough-terrain-kit',
    title: 'Rough Terrain Kit',
    description:
      'Verbeterde tractie voor ruwe en hellende gazons. Ideaal voor terreinen met hoogteverschillen.',
    price: 9600,
    category: 'other',
  },
];

/** Return accessories applicable to a given model ID */
export function getAccessoriesForModel(modelId: string): AccessoryOption[] {
  if (NO_ROUGH_TERRAIN.includes(modelId)) {
    return sharedAccessories.filter(a => a.id !== 'rough-terrain-kit');
  }
  return sharedAccessories;
}
