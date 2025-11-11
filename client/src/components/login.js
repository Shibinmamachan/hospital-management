import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import   './login.css';

const LoginPage = ({ onLogin }) => {
  // State to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/loginapi", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // Save JWT token

      if (onLogin) onLogin(); // Update authentication status in App
      navigate("/Doctor-details"); // Redirect to the home page
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh
    handleLogin();
  };

  return (
    <div className='log'>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Login</button>
      </form>

      <a href="/Register" className="link">
        Don't have an account? Sign up
      </a>
    </div>
    </div>
  );
};

export default LoginPage;
