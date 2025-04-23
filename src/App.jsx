import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
    console.log("Telegram WebApp initialized");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome to Vibbly</h1>
      <p className="text-center">Your social hub inside Telegram 🚀</p>
    </div>
  );
}

export default App;
