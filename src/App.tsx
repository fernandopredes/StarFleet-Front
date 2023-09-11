import {  useState } from 'react';
import './App.css';
import SpaceJump from './components/SpaceJump';
import LoginPage from './pages/LoginPage';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import logo from './assets/logo.png'

import TenForwardNews from './pages/TenForwardNews';
import HolodeckExplorations from './pages/HolodeckExplorations';
import Menu from './components/Menu';

function App() {
  const [showSpaceJump, setShowSpaceJump] = useState(false);
  const isAuth = !!localStorage.getItem('jwt');

  const handleLogin = () => {
    setShowSpaceJump(true);
    setTimeout(() => {
      setShowSpaceJump(false);
      localStorage.setItem('jwt', 'SOME_TOKEN');
    }, 5000);
  };

  return (
    <Router>
      {isAuth && <Menu logoSrc={logo} />}
      {isAuth ? (
        <Routes>
          <Route path="/explorations" element={<HolodeckExplorations />} />
          <Route path="/news" element={<TenForwardNews />} />
          {/* Pode adicionar mais rotas protegidas aqui */}
          <Route path="*" element={<Navigate to="/news" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
      {showSpaceJump && <SpaceJump />}
    </Router>
  );
}


export default App;
