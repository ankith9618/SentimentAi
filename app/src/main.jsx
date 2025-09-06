import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-tzskhzseii6boohd.us.auth0.com"
    clientId="HF9RXpEOtL80RNdrDflkatqkojz35QMK"
    authorizationParams={{
      redirect_uri: window.location.origin  ,
      audience: "https://sentiment-analysis-api"
    }}
    onRedirectCallback={(appState) => {
      
      window.history.replaceState(
        {},
        document.title,
        appState?.returnTo || window.location.pathname
      );
    }}
  >
    <title>Sentiment AI</title>
    <App />
  </Auth0Provider>,
)
