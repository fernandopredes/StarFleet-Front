import React, { useState } from 'react'
import { Button, Form, Input } from './LoginForm';

interface RegisterProps {
  onToggle: () => void;
  onSubmit: (email: string, password: string, username: string) => void;
}

const Register = ({ onToggle, onSubmit }:RegisterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password, username);
  };

  return (
    <Form onSubmit={handleSubmit} >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Input type="file" />
      <Button type="submit">Register</Button>
      <Button type="button" onClick={onToggle}>Already have an account? Login</Button>
    </Form>
  );
}
export default Register
