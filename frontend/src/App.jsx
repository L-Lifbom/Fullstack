import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import UserPage from './pages/UserPage';
import { Routes, Route } from 'react-router-dom';
import style from './index.module.css';

function App() {

  return (
    <div className={style.body}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>
  )
}

export default App
