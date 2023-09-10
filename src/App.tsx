import { useEffect, useState } from 'react';
import './App.css'
import SpaceJump from './components/SpaceJump'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [showSpaceJump, setShowSpaceJump] = useState(false);

  const isAuth = !!localStorage.getItem('jwt');

  useEffect(() => {
    if (isAuth) {
      setIsLogged(true);
    }
  }, [isAuth])

  const handleLogin = () => {
    setIsLogged(true);
    setShowSpaceJump(true);

    setTimeout(() => {
      setShowSpaceJump(false);
    }, 8000);
  };

  return (
    <Router>
      <Routes>
        {!isLogged ? (
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          ) : (
            <Navigate to="/news" />
          )}
        {/* Outras rotas protegidas podem ser adicionadas aqui.
          <PrivateRoute path="/news" element={<TenForwardNews />} />
          <PrivateRoute path="/explorations" element={<HolodeckExplorations />} />
          <PrivateRoute path="/quiz" element={<StarfleetAcademyExam />} />
        */}
      </Routes>
      {showSpaceJump && <SpaceJump />}
    </Router>
  )
}

export default App
