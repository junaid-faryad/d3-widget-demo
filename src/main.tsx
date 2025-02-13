import '@d3-inc/marketplace-widget/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Frame from 'react-frame-component';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Frame>
      <App />
    </Frame>
  </StrictMode>,
);
