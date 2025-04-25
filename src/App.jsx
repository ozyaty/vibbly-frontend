import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  useEffect(() => {
    // Telegram user data
    const tgUser = WebApp.initDataUnsafe?.user;
    if (tgUser) {
      setUser(tgUser);
    }

    // Open the WebApp interface
    WebApp.ready();
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
      <h1>Welcome to Vibbly</h1>
      {user && <p>Logged in as: {user.first_name}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Create password"
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

