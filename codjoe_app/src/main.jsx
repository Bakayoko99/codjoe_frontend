import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx'
import './index.css'
import List from './views/List.jsx';
import { loadAnalytics } from './utils/analytics';

// Ne démarre GA4/GTM que si le consentement a déjà été donné lors d'une visite précédente.
loadAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
