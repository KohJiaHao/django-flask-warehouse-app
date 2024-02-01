import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log('Login successful:', response.data);
      const csrftoken = getCookie('csrftoken');
      axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
      navigate('/products')
    } catch (error) {
      setError(error);
    }
  };

  // Function to retrieve CSRF token from cookie
  function getCookie(name) {
    const cookieValue = document.cookie.split(';').find(cookie => cookie.trim().startsWith(name + '='));
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
    return null;
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
