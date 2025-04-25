import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    const user = Telegram.WebApp.initDataUnsafe.user;
    setTelegramUser(user);
    console.log(user);  // Log the Telegram user data
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
      {telegramUser && <p>Hello, {telegramUser.first_name}!</p>}  {/* Display the Telegram user's name */}
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
