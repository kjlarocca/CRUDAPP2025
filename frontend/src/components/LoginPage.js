import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username,
        password,
      });

      // Save the token to localStorage for authenticated requests
      localStorage.setItem('token', response.data.token);

      // Redirect to the inventory page
      navigate('/inventory');
    } catch (err) {
      // Display error message if login fails
      setError('Invalid username or password. Please try again.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
