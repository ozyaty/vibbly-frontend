import React, { useState } from 'react';
import { BASE_URL } from './api';

function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        full_name: fullName,
        avatar_url: "https://example.com/avatar.jpg"  // static avatar for now
      }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage(`✅ Registered as ${data.user.full_name}`);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /><br /><br />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      /><br /><br />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}

export default Register;
