import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react' 
import { NextUIProvider } from '@nextui-org/react'
import {
  BrowserRouter
} from "react-router-dom";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
    <main className="light text-foreground bg-background">
      <BrowserRouter>
        <Auth0Provider
          domain='dev-gl3jwk8s5jnx4xpd.us.auth0.com'
          clientId='q3HTMEsS5hoTbDPsZL7DAS4wbFUDkh64'
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'competition monitoring api',
          }}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </main>
    </NextUIProvider>
  </React.StrictMode>,
)
