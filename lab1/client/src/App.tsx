import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

function App() {

  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0()

  function callApi() {
    axios.get('http://localhost:5000/')
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get('http://localhost:5000/api/match', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function callAuthorizedApi() {
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get('http://localhost:5000/authorized', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

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

      <ul>
        <li><button onClick={callApi}>Call API</button></li>
        <li><button onClick={callProtectedApi}>Call Protected API</button></li>
        <li><button onClick={callAuthorizedApi}> Call Authorized API</button></li>
      </ul>
    </div>
  );
}

export default App
