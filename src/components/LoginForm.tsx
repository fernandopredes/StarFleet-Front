import React, { useState } from 'react';
import styled from 'styled-components';
import Register from './Register';
import Login from './Login';

const FormContainer = styled.div`
  position: relative;
  background: rgba(62, 61, 61, 0.1);
  border: 1px solid #525252;
  border-radius: 15px;
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;

  min-height: 350px;
  backdrop-filter: blur(.8px);
  transition: opacity 0.2s;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  img{
    max-width: 50%;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 2px solid #B0B0B0;
  background-color: rgba(176, 176, 176, 0.1);
  color: #E0E0E0;
  border-radius: 5px;
  transition: all 0.3s;

  &:focus {
    background-color: rgba(176, 176, 176, 0.2);
    box-shadow: 0 0 10px rgba(176, 176, 176, 0.3);
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #C0C0C0;
  background-color: transparent;
  color: #E0E0E0;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #C0C0C0;
    color: #000;
  }
`;

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {

  const [isRegistering, setIsRegistering] = useState(false);
  const handleToggle = () => setIsRegistering(!isRegistering);

  return (
    <FormContainer style={{ opacity: isRegistering ? 0.7 : 1 }}>
      {isRegistering
        ? <Register onToggle={handleToggle} onSubmit={(email, password, username) => {/* handle registration logic */}} />
        : <Login onToggle={handleToggle} onSubmit={onSubmit} />
      }
    </FormContainer>
  );
};

export default LoginForm;
