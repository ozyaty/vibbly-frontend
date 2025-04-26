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

    const initData = tg.initData;
    console.log("📦 initData:", initData);

    if (!initData) {
      console.error("❌ initData not available");
      return;
    }

    // ✅ Correct fetch: POST request with JSON body
    fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData: initData }),
    })
      .then(res => {
        console.log("Auth response status:", res.status);
        return res.json();
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

    fetch(`${BASE_URL}/feed`)
      .then(res => res.json())
      .then(data => {
        console.log("✅ Feed data:", data);
        setFeed(data.feed);
      })
      .catch(err => {
        console.error("❌ Fetch /feed error:", err);
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
