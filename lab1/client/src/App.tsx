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

export default App;