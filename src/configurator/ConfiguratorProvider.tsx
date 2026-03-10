import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import type {
  ConfiguratorState,
  ConfiguratorAction,
  ConfigStep,
  MachineConfig,
  ProductConfigData,
  PriceBreakdown,
  MachineOption,
  PowerSystemOption,
  DeckOption,
  AccessoryOption,
  UpgradeOption,
  ServiceOption,
} from './types/configurator';
import { calculatePrice } from './engine/pricing';
import { resolveCompatibility } from './engine/compatibility';
import { getActiveSteps } from './utils/get-active-steps';

// ─── Initial State ───────────────────────────────────────────────

const initialConfig: MachineConfig = {
  machine: null,
  powerSystem: null,
  deckSize: null,
  accessories: [],
  proUpgrades: [],
  services: [],
};

const initialState: ConfiguratorState = {
  currentStep: 'machine',
  config: initialConfig,
  productData: null,
  isLoading: true,
  disabledOptions: new Set(),
  recommendedOptions: new Set(),
  requiredOptions: new Set(),
};

// ─── Reducer ─────────────────────────────────────────────────────

function configuratorReducer(state: ConfiguratorState, action: ConfiguratorAction): ConfiguratorState {
  switch (action.type) {
    case 'SET_PRODUCT_DATA': {
      const dc = action.payload.defaultConfig ?? {};
      return {
        ...state,
        productData: action.payload,
        isLoading: false,
        // Auto-advance past 'machine' step if only one machine and it's pre-selected
        currentStep: action.payload.machines.length === 1
          ? getActiveSteps(action.payload)[1] ?? 'summary'
          : 'machine',
        config: {
          ...initialConfig,
          machine:      dc.machine      ?? (action.payload.machines.length === 1 ? action.payload.machines[0] : null),
          powerSystem:  dc.powerSystem  ?? null,
          deckSize:     dc.deckSize     ?? null,
          accessories:  dc.accessories  ?? [],
          proUpgrades:  dc.proUpgrades  ?? [],
          services:     dc.services     ?? [],
        },
      };
    }

    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'NEXT_STEP': {
      const active = getActiveSteps(state.productData);
      const idx = active.indexOf(state.currentStep);
      const next = active[idx + 1];
      return next ? { ...state, currentStep: next } : state;
    }

    case 'PREV_STEP': {
      const active = getActiveSteps(state.productData);
      const idx = active.indexOf(state.currentStep);
      const prev = active[idx - 1];
      return prev ? { ...state, currentStep: prev } : state;
    }

    case 'SELECT_MACHINE':
      return { ...state, config: { ...state.config, machine: action.payload } };

    case 'SELECT_POWER_SYSTEM':
      return { ...state, config: { ...state.config, powerSystem: action.payload } };

    case 'SELECT_DECK':
      return { ...state, config: { ...state.config, deckSize: action.payload } };

    case 'TOGGLE_ACCESSORY': {
      const exists = state.config.accessories.some(a => a.id === action.payload.id);
      return {
        ...state,
        config: {
          ...state.config,
          accessories: exists
            ? state.config.accessories.filter(a => a.id !== action.payload.id)
            : [...state.config.accessories, action.payload],
        },
      };
    }

    case 'TOGGLE_UPGRADE': {
      const exists = state.config.proUpgrades.some(u => u.id === action.payload.id);
      return {
        ...state,
        config: {
          ...state.config,
          proUpgrades: exists
            ? state.config.proUpgrades.filter(u => u.id !== action.payload.id)
            : [...state.config.proUpgrades, action.payload],
        },
      };
    }

    case 'TOGGLE_SERVICE': {
      const exists = state.config.services.some(s => s.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          config: {
            ...state.config,
            services: state.config.services.filter(s => s.id !== action.payload.id),
          },
        };
      }
      // Select: remove incompatible AND removesOnSelect services
      const toRemove = new Set([
        ...(action.payload.incompatibleWith ?? []),
        ...(action.payload.removesOnSelect   ?? []),
      ]);
      return {
        ...state,
        config: {
          ...state.config,
          services: [
            ...state.config.services.filter(s => !toRemove.has(s.id)),
            action.payload,
          ],
        },
      };
    }

    case 'RESET':
      return { ...initialState, productData: state.productData, isLoading: false };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────

interface ConfiguratorContextValue {
  state: ConfiguratorState;
  dispatch: React.Dispatch<ConfiguratorAction>;
  priceBreakdown: PriceBreakdown;
  compatibility: {
    disabledOptions: Set<string>;
    recommendedOptions: Set<string>;
    requiredOptions: Set<string>;
    hiddenOptions: Set<string>;
  };
  activeSteps: ConfigStep[];
  currentStepIndex: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoBack: boolean;
  selectMachine: (m: MachineOption) => void;
  selectPowerSystem: (p: PowerSystemOption) => void;
  selectDeck: (d: DeckOption) => void;
  toggleAccessory: (a: AccessoryOption) => void;
  toggleUpgrade: (u: UpgradeOption) => void;
  toggleService: (s: ServiceOption) => void;
  goNext: () => void;
  goBack: () => void;
  goToStep: (step: ConfigStep) => void;
  isOptionSelected: (id: string) => boolean;
  isOptionDisabled: (id: string) => boolean;
  isOptionRecommended: (id: string) => boolean;
}

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────

export function ConfiguratorProvider({
  children,
  productData,
}: {
  children: React.ReactNode;
  productData?: ProductConfigData;
}) {
  const [state, dispatch] = useReducer(configuratorReducer, initialState);

  React.useEffect(() => {
    if (productData) {
      dispatch({ type: 'SET_PRODUCT_DATA', payload: productData });
    }
  }, [productData]);

  const priceBreakdown = useMemo(
    () => calculatePrice(state.config, state.productData?.bundleRules ?? []),
    [state.config, state.productData?.bundleRules]
  );

  const compatibility = useMemo(() => {
    const result = resolveCompatibility(state.config, state.productData?.compatibilityRules ?? []);
    return {
      disabledOptions:    result.disabledOptions,
      recommendedOptions: result.recommendedOptions,
      requiredOptions:    result.requiredOptions,
      hiddenOptions:      result.hiddenOptions,
    };
  }, [state.config, state.productData?.compatibilityRules]);

  const activeSteps      = useMemo(() => getActiveSteps(state.productData), [state.productData]);
  const currentStepIndex = activeSteps.indexOf(state.currentStep);
  const totalSteps       = activeSteps.length;
  const canGoNext        = currentStepIndex < totalSteps - 1;
  const canGoBack        = currentStepIndex > 0;

  const selectMachine     = useCallback((m: MachineOption)     => dispatch({ type: 'SELECT_MACHINE',      payload: m }), []);
  const selectPowerSystem = useCallback((p: PowerSystemOption) => dispatch({ type: 'SELECT_POWER_SYSTEM', payload: p }), []);
  const selectDeck        = useCallback((d: DeckOption)        => dispatch({ type: 'SELECT_DECK',         payload: d }), []);
  const toggleAccessory   = useCallback((a: AccessoryOption)   => dispatch({ type: 'TOGGLE_ACCESSORY',    payload: a }), []);
  const toggleUpgrade     = useCallback((u: UpgradeOption)     => dispatch({ type: 'TOGGLE_UPGRADE',      payload: u }), []);
  const toggleService     = useCallback((s: ServiceOption)     => dispatch({ type: 'TOGGLE_SERVICE',      payload: s }), []);
  const goNext            = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const goBack            = useCallback(() => dispatch({ type: 'PREV_STEP' }), []);
  const goToStep          = useCallback((step: ConfigStep) => dispatch({ type: 'SET_STEP', payload: step }), []);

  const isOptionSelected = useCallback((id: string): boolean => {
    const { config } = state;
    return (
      config.machine?.id === id ||
      config.powerSystem?.id === id ||
      config.deckSize?.id === id ||
      config.accessories.some(a => a.id === id) ||
      config.proUpgrades.some(u => u.id === id) ||
      config.services.some(s => s.id === id)
    );
  }, [state.config]);

  const isOptionDisabled    = useCallback((id: string) => compatibility.disabledOptions.has(id),    [compatibility.disabledOptions]);
  const isOptionRecommended = useCallback((id: string) => compatibility.recommendedOptions.has(id), [compatibility.recommendedOptions]);

  const value = useMemo(() => ({
    state, dispatch, priceBreakdown, compatibility,
    activeSteps, currentStepIndex, totalSteps, canGoNext, canGoBack,
    selectMachine, selectPowerSystem, selectDeck,
    toggleAccessory, toggleUpgrade, toggleService,
    goNext, goBack, goToStep,
    isOptionSelected, isOptionDisabled, isOptionRecommended,
  }), [
    state, priceBreakdown, compatibility,
    activeSteps, currentStepIndex, canGoNext, canGoBack,
    selectMachine, selectPowerSystem, selectDeck,
    toggleAccessory, toggleUpgrade, toggleService,
    goNext, goBack, goToStep,
    isOptionSelected, isOptionDisabled, isOptionRecommended,
  ]);

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────

export function useConfigurator(): ConfiguratorContextValue {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx) throw new Error('useConfigurator must be used within ConfiguratorProvider');
  return ctx;
}
