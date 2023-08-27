import React from 'react';
import styled from 'styled-components';
import video from '../assets/video.mp4';
import LoginForm from '../components/LoginForm';

const VideoContainer = styled.div`
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

const LoginContainer = styled.div`
  width: 50vw;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #010101;
  color: #FEF5EF;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage: React.FC = () => {
  return (
    <div>
      <VideoContainer>
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </VideoContainer>
      <LoginContainer>
        <LoginForm onSubmit={(email, password) => {
            console.log(`Trying to login with ${email} and ${password}`);
          }}
        />
      </LoginContainer>
    </div>
  );
};

export default LoginPage;
