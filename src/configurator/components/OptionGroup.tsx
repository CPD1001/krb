import React from 'react';
import { OptionCard } from './OptionCard';
import type { ConfigOption } from '../types/configurator';
import { useConfigurator } from '../ConfiguratorProvider';

interface OptionGroupProps {
  title: string;
  subtitle?: string;
  options: ConfigOption[];
  selectedId?: string;
  selectedIds?: string[];
  mode: 'radio' | 'checkbox';
  onSelect: (option: ConfigOption) => void;
}

export function OptionGroup({
  title,
  subtitle,
  options,
  selectedId,
  selectedIds = [],
  mode,
  onSelect,
}: OptionGroupProps) {
  const { isOptionDisabled, isOptionRecommended, compatibility } = useConfigurator();

  const visibleOptions = options.filter(opt => !compatibility.hiddenOptions.has(opt.id));

  return (
    <div className="cfg-option-group" role={mode === 'radio' ? 'radiogroup' : 'group'} aria-label={title}>
      <div className="cfg-option-group__header">
        <h3 className="cfg-option-group__title">{title}</h3>
        {subtitle && <p className="cfg-option-group__subtitle">{subtitle}</p>}
      </div>
      <div className="cfg-option-group__list">
        {visibleOptions.map(option => (
          <OptionCard
            key={option.id}
            option={option}
            selected={mode === 'radio' ? selectedId === option.id : selectedIds.includes(option.id)}
            disabled={isOptionDisabled(option.id)}
            recommended={isOptionRecommended(option.id)}
            mode={mode}
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}
