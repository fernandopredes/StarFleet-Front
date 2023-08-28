import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import video from '../assets/video.mp4';
import LoginForm from '../components/LoginForm';
import { useSpring, animated } from 'react-spring';
import bg from '../assets/full.jpg'

const Container = styled.div`
  background-image: url(${bg});
  background-size:     cover;
  background-repeat:   no-repeat;
  background-position: center center;
  overflow: hidden;
  position: relative;
  height: 100vh;
`;

const VideoContainer = styled(animated.div)`
  width: 50vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoginContainer = styled(animated.div)`
  width: 50vw;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  color: #FEF5EF;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setShowSpaceJump] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      setShowSpaceJump(true); // Iniciar a animação SpaceJump

      // Esconder a animação após 8 segundos
      const timeout = setTimeout(() => {
        setShowSpaceJump(false);
      }, 8000);

      // Limpar o timeout quando o componente for desmontado
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  // Animação para deslizar o vídeo para a esquerda
  const videoAnimationProps = useSpring({
    transform: isLoggedIn ? 'translateX(-100%)' : 'translateX(0%)',
    config: {
      tension: 100,
      friction: 60
    }
  });

  // Animação para deslizar o container de login para a direita
  const loginAnimationProps = useSpring({
    transform: isLoggedIn ? 'translateX(100%)' : 'translateX(0%)',
    config: {
      tension: 100,
      friction: 60
    }
  });

  return (
    <Container>
      <VideoContainer style={videoAnimationProps}>
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </VideoContainer>
      <LoginContainer style={loginAnimationProps}>
        <LoginForm onSubmit={(email, password) => {
            console.log(`Trying to login with ${email} and ${password}`);
            setIsLoggedIn(true); // For demo purposes, setting the state to true here
            onLogin()
          }}
        />
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
