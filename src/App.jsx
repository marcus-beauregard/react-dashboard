import React, { useState, useEffect } from 'react';

const TILES = [
  { label: 'BTC', value: 41230.5 },
  { label: 'ETH', value: 2875.2 },
  { label: 'SOL', value: 142.8 },
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    navigator.geolocation && navigator.geolocation.getCurrentPosition((p) => {
      setTemp((p.coords.latitude * 0.6 + 15).toFixed(1));
    });
  }, []);
  return (
    <div style={{ background: dark ? '#111' : '#f5f5f5', color: dark ? '#eee' : '#222',
      minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>dashboard</h1>
        <button onClick={() => setDark(!dark)}>{dark ? 'light' : 'dark'}</button>
      </header>
      <p>local temp: {temp ? temp + ' C' : '—'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        {TILES.map((t) => (
          <div key={t.label} style={{ background: dark ? '#222' : '#fff', padding: '1rem', borderRadius: 8 }}>
            <div style={{ opacity: .6 }}>{t.label}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{t.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
