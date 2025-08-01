import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain=""
    clientId=""
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    onRedirectCallback={(appState) => {
      window.history.replaceState({}, document.title, appState?.returnTo || "/");
    }}
  >
    <title>Sentiment AI</title>
    <App />
  </Auth0Provider>,
)
