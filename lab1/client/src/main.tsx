import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-gl3jwk8s5jnx4xpd.us.auth0.com'
      clientId='q3HTMEsS5hoTbDPsZL7DAS4wbFUDkh64'
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'competition monitoring api',
       // scope: 'read:current_user update:current_user_metadata'
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
