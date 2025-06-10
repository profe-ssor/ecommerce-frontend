
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.tsx';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider> {/* <-- wrap App inside this */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

