import { useEffect, useState } from 'react';
import './App.css';
import SpaceJump from './components/SpaceJump';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import TenForwardNews from './pages/TenForwardNews';
import PrivateRoute from './PrivateRoute';

function App() {
  const [showSpaceJump, setShowSpaceJump] = useState(false);
  const [redirectToNews, setRedirectToNews] = useState(false);
  const isAuth = !!localStorage.getItem('jwt');

  const handleLogin = () => {
    setShowSpaceJump(true);

    setTimeout(() => {
      setShowSpaceJump(false);
      localStorage.setItem('jwt', 'SOME_TOKEN');
      setRedirectToNews(true);
    }, 5000);
  };

  useEffect(() => {
    if (isAuth) {
      setRedirectToNews(true);
    }
  }, [isAuth]);

  return (
    <Router>
      {redirectToNews && <Navigate to="/news" replace />}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/news" element={
          <PrivateRoute>
            <TenForwardNews />
          </PrivateRoute>
        } />
      </Routes>
      {showSpaceJump && <SpaceJump />}
    </Router>
  );
}

export default App;
