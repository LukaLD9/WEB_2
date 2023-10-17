import './App.css'
import { useAuth0 } from '@auth0/auth0-react'

function App() {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  return (
    <div className="App">
      <h1>Competition Monitoring App</h1>
      <ul>
        <li><button onClick={() => loginWithRedirect()}>Login</button></li>
        <li>Is authenticated: {isAuthenticated ? 'true' : 'false'}</li>
        {isAuthenticated && (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        )}
        {isAuthenticated && (
          <li><button onClick={() => logout()}>Logout</button></li>
        )}
      </ul>
    </div>
  );
}

export default App
