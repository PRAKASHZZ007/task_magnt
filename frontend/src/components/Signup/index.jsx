import React, { useState } from 'react';
import axios from 'axios';
import "./index.css"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new attempt

    try {
      // Make sure the fields are valid before sending
      if (!formData.username || !formData.email || !formData.password) {
        setError('All fields are required');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/register', formData);

      if (response.data.success) {
        alert('Registration Successful');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
