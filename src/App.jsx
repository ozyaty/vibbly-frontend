import React, { useEffect, useState } from 'react';
import { BASE_URL } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    console.log('Telegram WebApp object:', tg);

    if (!tg) {
      console.log('❌ No Telegram WebApp object found.');
      return;
    }

    tg.ready();
    console.log('✅ Telegram WebApp ready called');

    let initData = window.location.hash.substring(1); // <--- THIS IS THE TRUE SOURCE OF initData
    console.log('📦 initData:', initData);

    if (!initData) {
      console.error('❌ No initData available.');
      return;
    }

    fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tg.initDataUnsafe),
    })
    
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
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        } else {
          console.error("❌ Auth error:", data.error);
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
