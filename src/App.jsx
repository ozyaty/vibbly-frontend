const tg = window.Telegram?.WebApp;
console.log("Telegram WebApp object:", tg);
console.log("User data:", tg?.initDataUnsafe?.user);

import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setFirstName(user.first_name);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://vibbly-backend-production.up.railway.app/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    setResponseMsg(data.message || data.error);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Register to Vibbly</h1>
      {firstName && <h2>👋 Welcome, {firstName}!</h2>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
      <p>{responseMsg}</p>
    </div>
  );
}

export default App;
