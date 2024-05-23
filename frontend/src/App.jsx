import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import AccountPage from './pages/AccountPage';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <div>
        <h1>Hello World</h1>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  )
}

export default App
