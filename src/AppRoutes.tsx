import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import { useState } from 'react';
/* import TenForwardNews from './pages/TenForwardNews';
import HolodeckExplorations from './pages/HolodeckExplorations';
import StarfleetAcademyExam from './pages/StarfleetAcademyExam';
import { PrivateRoute } from './PrivateRoute'; */

const AppRoutes: React.FC = () => {

  const [, setIsLogged] = useState(false);



  const handleLogin = () => {
    setIsLogged(true);

  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
  {/*       <PrivateRoute path="/news" element={<TenForwardNews />} />
        <PrivateRoute path="/explorations" element={<HolodeckExplorations />} />
        <PrivateRoute path="/quiz" element={<StarfleetAcademyExam />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
