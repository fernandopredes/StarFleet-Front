import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import video from '../assets/video.mp4';
import LoginForm from '../components/LoginForm';
import { useSpring, animated } from 'react-spring';
import bg from '../assets/full.jpg'
import frame from '../assets/frame.png'
import { loginUser } from '../api';

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
  clip-path: circle(25vw at center);

  video {
    width: 25vw;
    height: 25vw;
    max-height: 100vh;
    max-width: 100vh;
    position: absolute;
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
`;

const LoginContainer = styled(animated.div)`
  width: 50vw;
  height: 100vh;
  position: absolute;
  right: 5%;
  top: 0;
  color: #FEF5EF;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircularFrame = styled.div`
  width: 50vw;
  height: 50vw;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
  background: url(${frame}) no-repeat center/cover;
  border-radius: 50%;
  z-index: 1;
`;

const InnerContainer = styled.div`
  display: flex;
  max-width: 1900px;
  margin: 0 auto;
`;
interface LoginPageProps {
  onLogin: (token: string) => void;
}
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setShowSpaceJump] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      setShowSpaceJump(true);

      const timeout = setTimeout(() => {
        setShowSpaceJump(false);
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn]);

  const videoAnimationProps = useSpring({
    transform: isLoggedIn ? 'translateX(-100%)' : 'translateX(0%)',
    config: {
      tension: 100,
      friction: 60
    }
  });

  const loginAnimationProps = useSpring({
    transform: isLoggedIn ? 'translateX(100%)' : 'translateX(0%)',
    config: {
      tension: 100,
      friction: 60
    }
  });

  return (
    <Container>
      <InnerContainer>
        <VideoContainer style={videoAnimationProps}>
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <CircularFrame />
        </VideoContainer>
        <LoginContainer style={loginAnimationProps}>
        <LoginForm onSubmit={async (email, password) => {
            try {
                    const response = await loginUser(email, password);
                    if (response && response.access_token) {
                        setIsLoggedIn(true);
                        onLogin(response.access_token);
                    } else {
                        console.error("Erro durante o login.");
                    }
                } catch (error) {
                    console.error("Erro de login:", error);
                }
            }}
          />
        </LoginContainer>
      </InnerContainer>
    </Container>
  );
};

export default LoginPage;
