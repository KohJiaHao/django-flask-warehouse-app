import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  };

  return (
    <div>
      <h1>Welcome to Artiselite</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
