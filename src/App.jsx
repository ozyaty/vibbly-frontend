import React, { useEffect, useState } from 'react';
import { BASE_URL } from './api';  // ensure api.js exports your backend URL

function App() {
  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);

  // 1) Authenticate & auto-register on load
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    const initData = tg.initData; 
    fetch(`${BASE_URL}/auth?initData=${encodeURIComponent(initData)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setUser(data.user);
      })
      .catch(console.error);
  }, []);

  // 2) Fetch feed once user is set
  useEffect(() => {
    if (!user) return;
    fetch(`${BASE_URL}/feed`)
      .then(res => res.json())
      .then(data => setFeed(data.feed))
      .catch(console.error);
  }, [user]);

  // 3) Loading state
  if (!user) {
    return <p style={{ padding: '2rem' }}>Loading user…</p>;
  }

  // 4) Render feed
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
