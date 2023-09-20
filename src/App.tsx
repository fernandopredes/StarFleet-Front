import {  useState } from 'react';
import './App.css';
import SpaceJump from './components/SpaceJump';
import LoginPage from './pages/LoginPage';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import logo from './assets/logo.png'

import TenForwardNews from './pages/TenForwardNews';
import HolodeckExplorations from './pages/HolodeckExplorations';
import Menu from './components/Menu';
import Challenge from './pages/Challenge';

function App() {
  const [showSpaceJump, setShowSpaceJump] = useState(false);
  const isAuth = !!localStorage.getItem('access_token');

  const handleLogin = (token: string, userId: string) => {
    setShowSpaceJump(true);
    setTimeout(() => {
        setShowSpaceJump(false);
        localStorage.setItem('access_token', token)
        localStorage.setItem('user_id', userId)
    }, 5000);
};

  return (
    <Router>
      {isAuth && <Menu logoSrc={logo} />}
      {isAuth ? (
        <Routes>
          <Route path="/explorations" element={<HolodeckExplorations />} />
          <Route path="/news" element={<TenForwardNews />} />
          <Route path="/quiz" element={<Challenge />} />
          <Route path="*" element={<Navigate to="/news" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={(token, userId) => handleLogin(token, userId)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
      {showSpaceJump && <SpaceJump />}
    </Router>
  );
}


export default App;
