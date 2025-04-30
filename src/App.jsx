import React, { useEffect, useState } from 'react';
import { BASE_URL } from './api';
import Profile from './Profile';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();

    const initDataUnsafe = tg?.initDataUnsafe;

    if (!initDataUnsafe?.hash) return;

    fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initDataUnsafe),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        } else {
          console.error("❌ Auth error:", data.error);
        }
      })
      .catch(err => console.error("Auth fetch error:", err));
  }, []);

  if (!user) return <p>Loading user…</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user.first_name}!</h1>
      <Profile userId={user.id} />
    </div>
  );
}

export default App;
