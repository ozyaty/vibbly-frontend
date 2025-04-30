import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    full_name: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://vibbly-backend-production.up.railway.app/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          full_name: formData.full_name
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ Welcome ${data.user.full_name}!`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Request failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
