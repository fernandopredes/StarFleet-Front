import { useState } from 'react';
import './App.css'
import SpaceJump from './components/SpaceJump'
import LoginPage from './pages/LoginPage'

function App() {

  const [, setIsLogged] = useState(false);
  const [showSpaceJump, setShowSpaceJump] = useState(false);

  const handleLogin = () => {
    setIsLogged(true);
    setShowSpaceJump(true);

    setTimeout(() => {
      setShowSpaceJump(false);
    }, 8000); // Faz o SpaceJump desaparecer depois de 8 segundos
  };

  return (
    <>
      <LoginPage onLogin={handleLogin}/>
      {showSpaceJump && <SpaceJump />}
    </>
  )
}

export default App
