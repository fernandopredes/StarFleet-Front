import React, { useState } from 'react'
import { Button, Form, Input } from './LoginForm';

interface LoginProps {
  onToggle: () => void;
  onSubmit: (email: string, password: string) => void;
}

const Login = ({ onToggle, onSubmit }:LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <Button type="button" onClick={onToggle}>Don't have an account? Register</Button>
      </Form>
    </div>
  );
  }
export default Login
