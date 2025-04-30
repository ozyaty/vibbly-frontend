import React, { useEffect, useState } from 'react';
import { BASE_URL } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.error("Telegram WebApp not found");
      return;
    }

    tg.ready();
    tg.expand();
    const initDataUnsafe = tg.initDataUnsafe;
    console.log("📦 initDataUnsafe:", initDataUnsafe);

    if (!initDataUnsafe || !initDataUnsafe.hash) {
      console.error("initDataUnsafe not available or invalid");
      return;
    }

    fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initDataUnsafe),
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Auth response:", data);
        if (data.success) {
          setUser(data.user);
        } else {
          console.error("❌ Auth error:", data.error);
        }
      })
      .catch(err => console.error("❌ Fetch /auth error:", err));
  }, []);

  if (!user) return <p style={{ padding: '2rem' }}>Loading user…</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user.first_name}!</h1>
      <p>Your Telegram ID: {user.id}</p>
    </div>
  );
}

export default App;
