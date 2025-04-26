import React, { useEffect, useState } from 'react';
import { BASE_URL } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.error("❌ Telegram WebApp not found");
      return;
    }

    tg.ready();
    tg.expand();
    console.log("✅ Telegram WebApp ready");

    const initDataUnsafe = tg.initDataUnsafe;
    console.log("📦 initDataUnsafe:", initDataUnsafe);

    if (!initDataUnsafe || !initDataUnsafe.hash) {
      console.error("❌ initDataUnsafe not available or invalid");
      return;
    }

    fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query_id: initDataUnsafe.query_id,
        user: initDataUnsafe.user,
        auth_date: initDataUnsafe.auth_date,
        hash: initDataUnsafe.hash
      }),
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
      .catch(err => {
        console.error("❌ Fetch /auth error:", err);
      });

  }, []);

  useEffect(() => {
    if (!user) return;

    console.log("📥 Fetching feed for:", user);

    fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData: tg.initData }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("✅ Auth response:", data);
    
        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          console.error("❌ Auth error:", data.error || JSON.stringify(data.detail));
        }
      })
      .catch(err => {
        console.error("❌ Fetch /auth error:", err);
      });
  }, [user]);

  if (!user) {
    return <p style={{ padding: '2rem' }}>Loading user…</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user.first_name}!</h1>
      <h2>Your Vibbly Feed</h2>
      {feed.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {feed.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}

export default App;
