import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { isElectron } from '@renderer/utils/environment';

if (!isElectron()) {
  document.body.classList.add('web-version');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);