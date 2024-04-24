import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { HotelProvider } from './app/context/HotelProvider';
import { App } from './app/app';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HotelProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </HotelProvider>
);
