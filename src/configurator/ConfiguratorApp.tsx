import React from 'react';
import { ConfiguratorProvider } from './ConfiguratorProvider';
import { ConfiguratorShell } from './ConfiguratorShell';
import { sampleProductConfig } from './data/sample-config';

export function ConfiguratorApp() {
  return (
    <ConfiguratorProvider productData={sampleProductConfig}>
      <ConfiguratorShell />
    </ConfiguratorProvider>
  );
}
