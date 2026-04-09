import React, { useState } from 'react';

const SignUpPage = ({ onBackClick, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) return setError('Full name is required');
    if (!formData.phoneNumber.trim()) return setError('Phone number is required');
    if (!formData.email.trim()) return setError('Email address is required');
    if (!isValidEmail(formData.email)) return setError('Please enter a valid email address');
    if (!formData.password.trim()) return setError('Password is required');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');

    const users = JSON.parse(localStorage.getItem('popxUsers') || '[]');
    if (users.some(u => u.email === formData.email)) return setError('Email already registered');

    const newUser = {
      id: Date.now(),
      ...formData,
      bio: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam',
    };

    localStorage.setItem('popxUsers', JSON.stringify([...users, newUser]));
    localStorage.setItem('popxUser', JSON.stringify(newUser));
    onSignupSuccess(newUser);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxSizing: 'border-box',
  };

  const labelStyle = (color = '#7c3aed') => ({
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color,
    fontWeight: '600',
  });

  const fields = [
    { label: 'Full Name*', name: 'fullName', type: 'text', placeholder: 'Enter your full name' },
    { label: 'Phone number*', name: 'phoneNumber', type: 'text', placeholder: 'Enter your phone number' },
    { label: 'Email address*', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password*', name: 'password', type: 'password', placeholder: 'Enter your password' },
    { label: 'Company name', name: 'companyName', type: 'text', placeholder: 'Enter company name', optional: true },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>
        Create your PopX account
      </h2>

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
        {fields.map(({ label, name, type, placeholder, optional }) => (
          <div key={name} style={{ marginBottom: '16px' }}>
            <label style={labelStyle(optional ? '#000' : '#7c3aed')}>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '16px', fontWeight: '600' }}>Are you an Agency?*</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[true, false].map(val => (
              <label key={String(val)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="agencyChoice"
                  checked={formData.isAgency === val}
                  onChange={() => setFormData(prev => ({ ...prev, isAgency: val }))}
                  style={{ cursor: 'pointer' }}
                />
                <span>{val ? 'Yes' : 'No'}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '16px',
          fontSize: '18px',
          fontWeight: '600',
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
        }}>
          Create Account
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

export default SignUpPage;