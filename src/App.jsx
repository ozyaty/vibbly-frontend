import React, { useEffect, useState } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Important to initialize

      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserInfo(user);
      }
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Vibbly 🎉</h1>
      {userInfo ? (
        <>
          <p>👋 Hello, <strong>{userInfo.first_name}</strong>!</p>
          <p>Your Telegram ID: {userInfo.id}</p>
        </>
      ) : (
        <p>Loading user info from Telegram...</p>
      )}
    </div>
  );
}

export default App;
