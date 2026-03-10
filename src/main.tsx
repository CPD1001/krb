import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfiguratorApp } from './configurator/ConfiguratorApp';
import './configurator/styles/configurator.css';
import './advisor/advisor.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfiguratorApp />
  </React.StrictMode>
);
