import React, { useState } from 'react';

const LoginPage = ({ onBackClick, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.email.trim()) return setError('Email address is required');
    if (!loginData.password.trim()) return setError('Password is required');

    const users = JSON.parse(localStorage.getItem('popxUsers') || '[]');
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);

    if (!user) return setError('Invalid email or password');

    localStorage.setItem('popxUser', JSON.stringify(user));
    onLoginSuccess(user);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#7c3aed',
    fontWeight: '600',
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>
        Signin to your PopX account
      </h2>

      <p style={{ fontSize: '16px', color: '#888', marginBottom: '30px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      </p>

      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          borderRadius: '8px',
          fontSize: '14px',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={inputStyle}
          />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '16px',
          fontSize: '18px',
          fontWeight: '600',
          backgroundColor: '#bfbfbf',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
        }}>
          Login
        </button>
      </form>

      <button onClick={onBackClick} style={{
        width: '100%',
        padding: '12px',
        marginTop: '16px',
        fontSize: '16px',
        backgroundColor: '#f0f0f0',
        color: '#000',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
      }}>
        Back
      </button>
    </div>
  );
};

export default LoginPage;