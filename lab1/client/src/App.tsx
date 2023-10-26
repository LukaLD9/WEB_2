import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import CompetitionTable from './pages/CompetitionTable'
import NoPage from './pages/NoPage'
import { Route, Routes } from 'react-router-dom'
import CompetitionSchedule from './pages/CompetitionSchedule'


function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="schedule/:id" element={<CompetitionSchedule />} />
        <Route path="table/:id" element={<CompetitionTable />} />
        <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App




/*

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

*/
