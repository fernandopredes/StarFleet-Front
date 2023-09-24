import React, { useState } from 'react';
import { Button, Form, Input } from './LoginForm';
import { loginUser, registerUser, uploadUserPic } from '../api';

interface RegisterProps {
  onToggle: () => void;
}

const Register = ({ onToggle }: RegisterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = await registerUser(email, password, username);
      if (data) {
        const loginData = await loginUser(email, password);
        if (loginData.access_token) {
          localStorage.setItem('access_token', loginData.access_token);
        } else {
          throw new Error('Failed to obtain token on login.');
        }
      } else {
        throw new Error('Token not provided after registration.');
      }
      if (file) {
        await uploadUserPic(file);
        setEmail('');
        setPassword('');
        setUsername('');
        setFile(null);
        setSuccessMessage('Registration, login and profile picture upload successful!');

        setTimeout(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_id');
        }, 3000);
        setErrorMessage(null);
      } else {
        setErrorMessage('Please select a file.');
      }
    } catch (error) {
      setSuccessMessage(null);
      if (error instanceof Error) {
        setErrorMessage(`Error: ${error.message}`);
      } else {
        setErrorMessage('Error occurred. Please try again.');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        accept="image/*"
        required
      />
      <Button type="submit">Register</Button>
      <Button type="button" onClick={onToggle}>
        Already have an account? Login
      </Button>
    </Form>
  );
};

export default Register;
